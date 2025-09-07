function openModule(page) {
  window.location.href = page;
}
// Guest Management System
const guestForm = document.getElementById('guestForm');
const guestTable = document.getElementById('guestTable').querySelector('tbody');
const notification = document.getElementById('notification');

// Sample data for demonstration
const sampleGuests = [
  {
    name: "Ali Ahmed",
    cnic: "12345-1234567-1",
    email: "ali.ahmed@example.com",
    phone: "0300-1234567",
    address: "House #123, Street #45, Islamabad"
  },
  {
    name: "Fatima Khan",
    cnic: "34567-3456789-2",
    email: "fatima.khan@example.com",
    phone: "0312-9876543",
    address: "Apartment #45, Block C, Lahore"
  },
  {
    name: "Usman Malik",
    cnic: "56789-5678912-3",
    email: "usman.malik@example.com",
    phone: "0321-1234567",
    address: "Plot #67, Phase 2, Karachi"
  }
];

// Initialize with sample data
function initializeSampleData() {
  if (guestTable.querySelector('.empty-state')) {
    guestTable.innerHTML = '';
  }
  
  sampleGuests.forEach(guest => {
    addGuestToTable(guest);
  });
  updateGuestNumbers();
}

// Show notification
function showNotification(message) {
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Add guest to table
function addGuestToTable(guest) {
  // Add row
  const row = guestTable.insertRow();
  row.innerHTML = `
    <td></td>
    <td>${guest.name}</td>
    <td>${guest.cnic}</td>
    <td>${guest.email}</td>
    <td>${guest.phone}</td>
    <td>${guest.address}</td>
    <td class="actions">
      <button class="action-btn" onclick="editGuest(this)">Edit</button>
      <button class="action-btn" onclick="deleteGuest(this)">Delete</button>
    </td>
  `;
}

// Listen to form submit
guestForm.addEventListener('submit', function(e) {
  e.preventDefault();
  addGuest();
});

// Function to re-number table rows
function updateGuestNumbers() {
  const rows = guestTable.getElementsByTagName('tr');
  for (let i = 0; i < rows.length; i++) {
    rows[i].cells[0].innerText = i + 1;
  }
}

function addGuest() {
  const name = document.getElementById('name').value;

  // CNIC Validation
  let cnic = document.getElementById('cnic').value;
  cnic = cnic.replace(/[^0-9]/g, '');
  if (cnic.length !== 13) {
    alert("Invalid CNIC! Must be 13 digits without dashes");
    return;
  }
  const formattedCNIC = cnic.slice(0,5) + '-' + cnic.slice(5,12) + '-' + cnic.slice(12);

  // Email Validation
  const email = document.getElementById('email').value;
  if (!email.includes("@") || !email.includes(".")) {
    alert("Invalid email!");
    return;
  }

  // Phone Validation
  let phoneInput = document.getElementById('phone').value;
  let phone = phoneInput.replace(/\D/g, '');
  if (phone.length !== 11 || !phone.startsWith('03')) {
    alert("Invalid Phone no! Must be 11 digits and start with 03");
    return;
  }
  const formattedPhone = phone.slice(0,4) + '-' + phone.slice(4,7) + '-' + phone.slice(7);

  const address = document.getElementById('address').value;

  // Remove empty state if it exists
  if (guestTable.querySelector('.empty-state')) {
    guestTable.innerHTML = '';
  }

  // Add guest to table
  addGuestToTable({
    name,
    cnic: formattedCNIC,
    email,
    phone: formattedPhone,
    address
  });

  // Reset numbering
  updateGuestNumbers();

  // Show notification
  showNotification("Guest added successfully!");

  // Clear form
  guestForm.reset();
}

function editGuest(el) {
  const row = el.closest("tr");

  // Extract values from table
  const name = row.cells[1].innerText;
  const cnic = row.cells[2].innerText.replace(/-/g, '');
  const email = row.cells[3].innerText;
  const phone = row.cells[4].innerText.replace(/-/g, '');
  const address = row.cells[5].innerText;

  // Populate form with values
  document.getElementById('name').value = name;
  document.getElementById('cnic').value = cnic;
  document.getElementById('email').value = email;
  document.getElementById('phone').value = phone;
  document.getElementById('address').value = address;

  // Remove the old row
  row.remove();
  
  // Show empty state if no guests left
  if (guestTable.querySelectorAll("tr").length === 0) {
    guestTable.innerHTML = '<tr><td colspan="7" class="empty-state">No guests added yet. Please add guests using the form above.</td></tr>';
  } else {
    updateGuestNumbers();
  }
  
  showNotification("Guest ready for editing!");
}

function deleteGuest(el){
  const row = el.closest("tr");
  row.remove();
  
  // Show empty state if no guests left
  if (guestTable.querySelectorAll("tr").length === 0) {
    guestTable.innerHTML = '<tr><td colspan="7" class="empty-state">No guests added yet. Please add guests using the form above.</td></tr>';
  } else {
    updateGuestNumbers();
  }
  
  showNotification("Guest deleted successfully!");
}

// Initialize with sample data on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeSampleData();
});
