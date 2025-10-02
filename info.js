// healthTrackerInput.js

const readline = require("readline");

let healthData = {
  weight: null,
  calories: [],
  macros: [],
  workoutMinutes: []
};

// Functions to update health data
function logWeight(newWeight) {
  healthData.weight = newWeight;
  console.log(`Weight updated to ${newWeight} lbs`);
}

function logCalories(amount) {
  healthData.calories.push(amount);
  console.log(`Logged ${amount} calories`);
}

function logMacros(protein, carbs, fat) {
  healthData.macros.push({ protein, carbs, fat });
  console.log(`Logged macros - Protein: ${protein}g, Carbs: ${carbs}g, Fat: ${fat}g`);
}

function logWorkout(minutes) {
  healthData.workoutMinutes.push(minutes);
  console.log(`Logged workout of ${minutes} minutes`);
}

// Setup readline for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask user for data step by step
rl.question("Enter your weight (lbs): ", (weightInput) => {
  logWeight(parseFloat(weightInput));

  rl.question("Enter calories consumed today: ", (calInput) => {
    logCalories(parseInt(calInput));

    rl.question("Enter macros (protein carbs fat, separated by spaces): ", (macroInput) => {
      const [protein, carbs, fat] = macroInput.split(" ").map(Number);
      logMacros(protein, carbs, fat);

      rl.question("Enter workout time in minutes: ", (workoutInput) => {
        logWorkout(parseInt(workoutInput));

        console.log("\nFinal health data:", healthData);
        rl.close();
      });
    });
  });
});
