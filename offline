// Simulated local storage (works offline)
let localData = [];

// Function to add data (works offline)
function addData(item) {
  localData.push({
    ...item,
    synced: false,
    timestamp: Date.now()
  });
  console.log("Data saved locally:", item);
}

// Function to simulate syncing with server
async function syncData() {
  if (!navigator.onLine) {
    console.log("No internet connection. Sync postponed.");
    return;
  }

  const unsyncedData = localData.filter(d => !d.synced);

  if (unsyncedData.length === 0) {
    console.log("All data already synced.");
    return;
  }

  try {
    // Example: send data to server
    const response = await fakeServerUpload(unsyncedData);
    if (response.success) {
      // Mark data as synced
      localData = localData.map(d => ({
        ...d,
        synced: true
      }));
      console.log("Data synced successfully!");
    }
  } catch (err) {
    console.error("Sync failed, will retry later:", err.message);
  }
}

// Simulated server upload function
function fakeServerUpload(data) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.2) { // 80% chance of success
        resolve({ success: true });
      } else {
        reject(new Error("Server error"));
      }
    }, 1000);
  });
}

// Example usage:
addData({ task: "Do homework" });
addData({ task: "Buy groceries" });

// Try syncing (only works if online)
syncData();
