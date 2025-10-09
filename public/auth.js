// auth.js - Nate Creer: Simple User Authentication
import express from "express";
import session from "express-session";
import passport from "passport";
import LocalStrategy from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;

// Simulated user database (replace with real DB later)
let users = [];

// Middleware
app.use(express.json());
app.use(session({ secret: "supersecret", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// ----- LOCAL STRATEGY (email + password) -----
passport.use(new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
  const user = users.find(u => u.email === email);
  if (!user) return done(null, false, { message: "User not found" });
  bcrypt.compare(password, user.password, (err, match) => {
    if (err) return done(err);
    if (!match) return done(null, false, { message: "Invalid password" });
    return done(null, user);
  });
}));

// ----- GOOGLE STRATEGY (OAuth) -----
passport.use(new GoogleStrategy({
  clientID: "YOUR_GOOGLE_CLIENT_ID",
  clientSecret: "YOUR_GOOGLE_CLIENT_SECRET",
  callbackURL: "/auth/google/callback"
}, (accessToken, refreshToken, profile, done) => {
  let user = users.find(u => u.googleId === profile.id);
  if (!user) {
    user = { id: users.length + 1, googleId: profile.id, email: profile.emails[0].value };
    users.push(user);
  }
  return done(null, user);
}));

// ----- SESSION HANDLING -----
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser((id, done) => {
  const user = users.find(u => u.id === id);
  done(null, user);
});

// ----- ROUTES -----
app.post("/register", async (req, res) => {
  const { email, password } = req.body;
  if (users.find(u => u.email === email)) return res.status(400).json({ msg: "User already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const user = { id: users.length + 1, email, password: hashed };
  users.push(user);
  res.json({ msg: "User registered successfully" });
});

app.post("/login", passport.authenticate("local"), (req, res) => {
  res.json({ msg: "Login successful", user: req.user });
});

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));
app.get("/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  (req, res) => res.json({ msg: "Google login successful", user: req.user })
);

app.get("/logout", (req, res) => {
  req.logout(() => res.json({ msg: "Logged out" }));
});

app.listen(PORT, () => console.log(`✅ Auth service running on http://localhost:${PORT}`));
