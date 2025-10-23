// Browser-based health tracker
let healthData = {
  weight: null,
  calories: [],
  macros: [],
  workoutMinutes: []
};

function logCalories(amount) {
  healthData.calories.push(amount);
  alert(`Logged ${amount} calories`);
}

document.addEventListener('DOMContentLoaded', function() {
  const trackFoodBtn = document.getElementById('trackFoodBtn');
  if (trackFoodBtn) {
    trackFoodBtn.addEventListener('click', function(e) {
      e.preventDefault();
      const calories = prompt('Enter calories consumed:');
      if (calories && !isNaN(calories)) {
        logCalories(parseInt(calories));
      } else {
        alert('Please enter a valid number.');
      }
    });
  }
});
        logWorkout(parseInt(workoutInput));

        console.log("\nFinal health data:", healthData);
        rl.close();

