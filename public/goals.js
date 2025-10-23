// healthNotifications.js

// Example user data
const user = {
    name: "Alice",
    waterIntake: 1.5, // in liters
    stepsToday: 3000,
    sleepHours: 5
};

// Function to provide notifications
function sendNotifications(user) {
    // Hydration reminder
    if (user.waterIntake < 2) {
        console.log(`💧 Reminder: ${user.name}, drink more water! You've had ${user.waterIntake}L today.`);
    }

    // Step goal reminder
    if (user.stepsToday < 10000) {
        console.log(`🚶 Reminder: ${user.name}, you have taken ${user.stepsToday} steps. Aim for 10,000!`);
    }

    // Sleep reminder
    if (user.sleepHours < 7) {
        console.log(`😴 Reminder: ${user.name}, you only slept ${user.sleepHours} hours. Try to get 7+ hours!`);
    }

    // General congratulation if all goals met
    if (user.waterIntake >= 2 && user.stepsToday >= 10000 && user.sleepHours >= 7) {
        console.log(`🎉 Great job, ${user.name}! You met all your health goals today!`);
    }
}


goalForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const type = document.getElementById('goalType').value;

    // Sanitize the numeric input
    let value = document.getElementById('goalValue').value;
    value = Number(value); // Convert to number
    if (isNaN(value) || value < 0 || value > 10000) { // Example limits
        alert('Please enter a valid positive number for your goal.');
        return;
    }

    // Create list item safely
    const li = document.createElement('li');
    li.textContent = `${type.charAt(0).toUpperCase() + type.slice(1)} Goal: ${value}`;
    goalsList.appendChild(li);

    // Add to chart data
    goalsData.labels.push(type.charAt(0).toUpperCase() + type.slice(1));
    goalsData.values.push(value);
    chart.update();

    goalForm.reset();
});


// Call the function
sendNotifications(user);