// Room Management System
const roomForm = document.getElementById("roomForm");
const roomTable = document.getElementById("roomTable").querySelector("tbody");
const notification = document.getElementById("notification");

// Sample data for demonstration
const sampleRooms = [
  {
    roomNo: "101",
    roomType: "Single",
    beds: "1",
    price: "2500",
    status: "Available",
    maintenance: "-",
    facilities: "AC, TV"
  },
  {
    roomNo: "202",
    roomType: "Double",
    beds: "2",
    price: "4500",
    status: "Occupied",
    maintenance: "-",
    facilities: "AC, WiFi, TV"
  },
  {
    roomNo: "305",
    roomType: "Suite",
    beds: "3",
    price: "7500",
    status: "Under Maintenance",
    maintenance: "Plumbing issues",
    facilities: "AC, WiFi, TV, Mini-bar"
  }
];

// Initialize with sample data
function initializeSampleData() {
  if (roomTable.querySelector('.empty-state')) {
    roomTable.innerHTML = '';
  }
  
  sampleRooms.forEach(room => {
    addRoomToTable(room);
  });
  updateRoomNumbers();
}

// Show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Add room to table
function addRoomToTable(room) {
  // Create status badge class based on status
  let statusClass = "";
  switch(room.status.toLowerCase()) {
    case "available":
      statusClass = "available";
      break;
    case "occupied":
      statusClass = "occupied";
      break;
    case "reserved":
      statusClass = "reserved";
      break;
    case "under maintenance":
      statusClass = "under-maintenance";
      break;
  }

  // Add row
  const row = roomTable.insertRow();
  row.innerHTML = `
    <td></td>
    <td>${room.roomNo}</td>
    <td>${room.roomType}</td>
    <td>${room.beds}</td>
    <td>${room.price}</td>
    <td><span class="badge ${statusClass}">${room.status}</span></td>
    <td>${room.maintenance}</td>
    <td>${room.facilities}</td>
    <td class="actions">
      <button class="action-btn" onclick="editRoom(this)">Edit</button>
      <button class="action-btn" onclick="deleteRoom(this)">Delete</button>
    </td>
  `;
}

// Form submit handler
roomForm.addEventListener("submit", function (event) {
  event.preventDefault();

  // Input fields values
  const roomNo = document.getElementById("roomNo").value;
  const roomType = document.getElementById("roomType").value;
  const beds = document.getElementById("beds").value;
  const price = document.getElementById("price").value;
  const status = document.getElementById("status").value;
  const maintenance = document.getElementById("maintenance").value || "-";
  const facilities = document.getElementById("facilities").value || "-";

  // Remove empty state if it exists
  if (roomTable.querySelector('.empty-state')) {
    roomTable.innerHTML = '';
  }

  // Add room to table
  addRoomToTable({
    roomNo, roomType, beds, price, status, maintenance, facilities
  });

  // Reset numbering
  updateRoomNumbers();

  // Show notification
  showNotification("Room added successfully!");

  // Clear form
  roomForm.reset();
});

// Numbering update function
function updateRoomNumbers() {
  const rows = roomTable.querySelectorAll("tr");
  rows.forEach((row, index) => {
    row.cells[0].textContent = index + 1;
  });
}

// Delete row
function deleteRoom(el) {
  const row = el.closest("tr");
  row.remove();
  
  // Show empty state if no rooms left
  if (roomTable.querySelectorAll("tr").length === 0) {
    roomTable.innerHTML = '<tr><td colspan="9" class="empty-state">No rooms added yet. Please add rooms using the form above.</td></tr>';
  } else {
    updateRoomNumbers();
  }
  
  showNotification("Room deleted successfully!");
}

// Edit row
function editRoom(el) {
  const row = el.closest("tr");
  const statusSpan = row.cells[5].querySelector('.badge');
  
  // Extract values from table
  const roomNo = row.cells[1].textContent;
  const roomType = row.cells[2].textContent;
  const beds = row.cells[3].textContent;
  const price = row.cells[4].textContent;
  const status = statusSpan ? statusSpan.textContent : row.cells[5].textContent;
  const maintenance = row.cells[6].textContent;
  const facilities = row.cells[7].textContent;

  // Populate form with values
  document.getElementById("roomNo").value = roomNo;
  document.getElementById("roomType").value = roomType;
  document.getElementById("beds").value = beds;
  document.getElementById("price").value = price;
  document.getElementById("status").value = status;
  document.getElementById("maintenance").value = maintenance === "-" ? "" : maintenance;
  document.getElementById("facilities").value = facilities === "-" ? "" : facilities;

  // Remove the old row
  row.remove();
  
  // Show empty state if no rooms left
  if (roomTable.querySelectorAll("tr").length === 0) {
    roomTable.innerHTML = '<tr><td colspan="9" class="empty-state">No rooms added yet. Please add rooms using the form above.</td></tr>';
  } else {
    updateRoomNumbers();
  }
  
  showNotification("Room ready for editing!");
}

// Initialize with sample data on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeSampleData();
});