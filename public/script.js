// --- Progress Tracking ---
let calories = 0;
const calorieDisplay = document.getElementById("calories");
const progressBar = document.getElementById("calProgress");
const logBtn = document.getElementById("logBtn");

logBtn.addEventListener("click", () => {
  calories += 500;
  calorieDisplay.textContent = calories;
  let percent = Math.min((calories / 2000) * 100, 100);
  progressBar.style.width = percent + "%";
});

// --- Dark Mode Toggle ---
const darkToggle = document.getElementById("darkToggle");
darkToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const enabled = document.body.classList.contains("dark-mode");
  localStorage.setItem("darkMode", enabled);
  darkToggle.textContent = enabled ? "Disable Dark Mode" : "Enable Dark Mode";
});

// Apply saved dark mode setting on page load
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
  darkToggle.textContent = "Disable Dark Mode";
}

// --- Notifications ---
const notifyBtn = document.getElementById("notifyBtn");
notifyBtn.addEventListener("click", () => {
  if (Notification.permission === "granted") {
    new Notification("Health Assistant", { body: "Don't forget to log your meals today!" });
  } else if (Notification.permission !== "denied") {
    Notification.requestPermission().then(permission => {
      if (permission === "granted") {
        new Notification("Health Assistant", { body: "Notifications enabled." });
      }
    });
  }
});
