// Booking Management System

// Sample data for demonstration
const sampleRooms = [
  { number: '101', type: 'Single', price: 2500, status: 'available' },
  { number: '102', type: 'Single', price: 2500, status: 'available' },
  { number: '201', type: 'Double', price: 4500, status: 'occupied' },
  { number: '202', type: 'Double', price: 4500, status: 'available' },
  { number: '301', type: 'Suite', price: 7500, status: 'reserved' },
  { number: '302', type: 'Suite', price: 7500, status: 'maintenance' },
  { number: '401', type: 'Family', price: 8500, status: 'available' },
  { number: '402', type: 'Family', price: 8500, status: 'occupied' }
];

const sampleBookings = [
  {
    id: 'BKG001',
    guestName: 'Ali Ahmed',
    guestPhone: '0300-1234567',
    checkIn: '2023-06-15',
    checkOut: '2023-06-18',
    roomType: 'Double',
    roomNumber: '201',
    specialRequests: 'Non-smoking room',
    status: 'checked-in'
  },
  {
    id: 'BKG002',
    guestName: 'Fatima Khan',
    guestPhone: '0312-9876543',
    checkIn: '2023-06-20',
    checkOut: '2023-06-25',
    roomType: 'Suite',
    roomNumber: '301',
    specialRequests: 'Early check-in requested',
    status: 'confirmed'
  },
  {
    id: 'BKG003',
    guestName: 'Usman Malik',
    guestPhone: '0321-1234567',
    checkIn: '2023-07-01',
    checkOut: '2023-07-05',
    roomType: 'Family',
    roomNumber: '402',
    specialRequests: '',
    status: 'confirmed'
  }
];

// Initialize with sample data
function initializeSampleData() {
  const bookingsTable = document.getElementById('bookingsTable').querySelector('tbody');
  
  if (bookingsTable.querySelector('.empty-state')) {
    bookingsTable.innerHTML = '';
  }
  
  sampleBookings.forEach(booking => {
    addBookingToTable(booking);
  });
  
  // Populate room number dropdown
  updateAvailableRooms();
}

// Tab functionality
function setupTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all tab content
      document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
      // Show the corresponding tab content
      const tabName = tab.getAttribute('data-tab');
      document.getElementById(`${tabName}-content`).classList.add('active');
    });
  });
}

// Show notification
function showNotification(message) {
  const notification = document.getElementById('notification');
  notification.textContent = message;
  notification.classList.add('show');
  
  setTimeout(() => {
    notification.classList.remove('show');
  }, 3000);
}

// Update available rooms based on selected room type
function updateAvailableRooms() {
  const roomType = document.getElementById('booking-room-type').value;
  const roomNumberSelect = document.getElementById('room-number');
  
  // Clear existing options
  roomNumberSelect.innerHTML = '<option value="">Select room</option>';
  
  if (!roomType) return;
  
  // Filter available rooms by type
  const availableRooms = sampleRooms.filter(room => 
    room.type === roomType && room.status === 'available'
  );
  
  // Add available rooms to dropdown
  availableRooms.forEach(room => {
    const option = document.createElement('option');
    option.value = room.number;
    option.textContent = `${room.number} (Rs ${room.price}/night)`;
    roomNumberSelect.appendChild(option);
  });
  
  if (availableRooms.length === 0) {
    const option = document.createElement('option');
    option.value = '';
    option.textContent = 'No available rooms of this type';
    roomNumberSelect.appendChild(option);
    roomNumberSelect.disabled = true;
  } else {
    roomNumberSelect.disabled = false;
  }
}

// Check room availability
function checkAvailability() {
  const date = document.getElementById('check-date').value;
  const roomType = document.getElementById('room-type-filter').value;
  
  if (!date) {
    alert('Please select a date to check availability');
    return;
  }
  
  const resultsContainer = document.getElementById('availability-results');
  resultsContainer.innerHTML = '';
  
  // Filter rooms based on type
  let filteredRooms = sampleRooms;
  if (roomType) {
    filteredRooms = sampleRooms.filter(room => room.type === roomType);
  }
  
  // Display room availability
  filteredRooms.forEach(room => {
    const roomCard = document.createElement('div');
    roomCard.className = `room-card ${room.status}`;
    
    let statusClass = '';
    let statusText = '';
    
    switch(room.status) {
      case 'available':
        statusClass = 'status-available';
        statusText = 'Available';
        break;
      case 'occupied':
        statusClass = 'status-occupied';
        statusText = 'Occupied';
        break;
      case 'reserved':
        statusClass = 'status-reserved';
        statusText = 'Reserved';
        break;
      case 'maintenance':
        statusClass = 'status-maintenance';
        statusText = 'Maintenance';
        break;
    }
    
    roomCard.innerHTML = `
      <div class="room-number">${room.number}</div>
      <div class="room-type">${room.type}</div>
      <div class="room-status ${statusClass}">${statusText}</div>
      <div class="room-price">Rs ${room.price}/night</div>
    `;
    
    resultsContainer.appendChild(roomCard);
  });
  
  if (filteredRooms.length === 0) {
    resultsContainer.innerHTML = '<div class="empty-state">No rooms found with the selected criteria</div>';
  }
}

// Add booking to table
function addBookingToTable(booking) {
  const bookingsTable = document.getElementById('bookingsTable').querySelector('tbody');
  
  if (bookingsTable.querySelector('.empty-state')) {
    bookingsTable.innerHTML = '';
  }
  
  let statusClass = '';
  switch(booking.status) {
    case 'confirmed':
      statusClass = 'confirmed';
      break;
    case 'checked-in':
      statusClass = 'checked-in';
      break;
    case 'checked-out':
      statusClass = 'checked-out';
      break;
    case 'cancelled':
      statusClass = 'cancelled';
      break;
  }
  
  const row = bookingsTable.insertRow();
  row.innerHTML = `
    <td>${booking.id}</td>
    <td>${booking.guestName}</td>
    <td>${booking.roomNumber}</td>
    <td>${booking.roomType}</td>
    <td>${booking.checkIn}</td>
    <td>${booking.checkOut}</td>
    <td><span class="badge ${statusClass}">${booking.status}</span></td>
    <td class="actions">
      <button class="action-btn" onclick="editBooking('${booking.id}')">Edit</button>
      <button class="action-btn" onclick="deleteBooking('${booking.id}')">Delete</button>
    </td>
  `;
}

// Form submission
function setupFormHandlers() {
  document.getElementById('bookingForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get selected room number
    const roomNumber = document.getElementById('room-number').value;
    if (!roomNumber) {
      alert('Please select a room number');
      return;
    }
    
    // Create a new booking
    const newBooking = {
      id: 'BKG' + Math.floor(1000 + Math.random() * 9000),
      guestName: document.getElementById('guest-name').value,
      guestPhone: document.getElementById('guest-phone').value,
      checkIn: document.getElementById('check-in').value,
      checkOut: document.getElementById('check-out').value,
      roomType: document.getElementById('booking-room-type').value,
      roomNumber: roomNumber,
      specialRequests: document.getElementById('special-requests').value,
      status: 'confirmed'
    };
    
    addBookingToTable(newBooking);
    showNotification('Booking created successfully');
    
    // Update room status to reserved
    const room = sampleRooms.find(r => r.number === roomNumber);
    if (room) {
      room.status = 'reserved';
    }
    
    this.reset();
    updateAvailableRooms();
  });
}

// Setup event listeners
function setupEventListeners() {
  // Room type change listener
  document.getElementById('booking-room-type').addEventListener('change', updateAvailableRooms);
  
  // Check availability button
  document.getElementById('check-availability-btn').addEventListener('click', checkAvailability);
  
  // Search booking button
  document.getElementById('search-booking-btn').addEventListener('click', searchBooking);
  
  // Update booking button
  document.getElementById('update-booking-btn').addEventListener('click', updateBooking);
  
  // Search cancel button
  document.getElementById('search-cancel-btn').addEventListener('click', searchCancelBooking);
  
  // Cancel booking button
  document.getElementById('cancel-booking-btn').addEventListener('click', cancelBooking);
}

// Initialize with sample data on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeSampleData();
  setupTabs();
  setupFormHandlers();
  setupEventListeners();
  
  // Set today's date as default for availability check
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('check-date').value = today;
  
  // Set minimum dates for booking forms
  document.getElementById('check-in').min = today;
  document.getElementById('check-out').min = today;
  document.getElementById('edit-check-in').min = today;
  document.getElementById('edit-check-out').min = today;
});

// These functions would be implemented similarly to the guest management system
function searchBooking() {
  document.getElementById('modify-booking-form').style.display = 'block';
  showNotification('Booking found and loaded for editing');
}

function updateBooking() {
  showNotification('Booking updated successfully');
}

function searchCancelBooking() {
  document.getElementById('cancel-booking-details').style.display = 'block';
  
  // Sample data for demonstration
  document.getElementById('cancel-booking-id').textContent = 'BKG001';
  document.getElementById('cancel-guest-name').textContent = 'Ali Ahmed';
  document.getElementById('cancel-check-in').textContent = '2023-06-15';
  document.getElementById('cancel-check-out').textContent = '2023-06-18';
  document.getElementById('cancel-room-type').textContent = 'Double';
  document.getElementById('cancel-room-number').textContent = '201';
  
  showNotification('Booking found');
}

function cancelBooking() {
  showNotification('Booking cancelled successfully');
}

function editBooking(bookingId) {
  // Find the booking
  const booking = sampleBookings.find(b => b.id === bookingId);
  if (!booking) return;
  
  // Switch to modify tab
  document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
  document.querySelector('[data-tab="modify-booking"]').classList.add('active');
  
  document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
  document.getElementById('modify-booking-content').classList.add('active');
  
  // Populate form
  document.getElementById('search-booking').value = bookingId;
  document.getElementById('edit-guest-name').value = booking.guestName;
  document.getElementById('edit-guest-phone').value = booking.guestPhone;
  document.getElementById('edit-check-in').value = booking.checkIn;
  document.getElementById('edit-check-out').value = booking.checkOut;
  document.getElementById('edit-room-type').value = booking.roomType;
  document.getElementById('edit-room-number').value = booking.roomNumber;
  document.getElementById('edit-special-requests').value = booking.specialRequests || '';
  document.getElementById('edit-booking-status').value = booking.status;
  
  document.getElementById('modify-booking-form').style.display = 'block';
}

function deleteBooking(bookingId) {
  if (confirm('Are you sure you want to delete this booking?')) {
    // Find booking index
    const bookingIndex = sampleBookings.findIndex(b => b.id === bookingId);
    if (bookingIndex !== -1) {
      // Free up the room
      const roomNumber = sampleBookings[bookingIndex].roomNumber;
      const room = sampleRooms.find(r => r.number === roomNumber);
      if (room) {
        room.status = 'available';
      }
      
      // Remove booking
      sampleBookings.splice(bookingIndex, 1);
      
      // Refresh table
      const bookingsTable = document.getElementById('bookingsTable').querySelector('tbody');
      bookingsTable.innerHTML = '';
      
      if (sampleBookings.length === 0) {
        bookingsTable.innerHTML = '<tr><td colspan="8" class="empty-state">No bookings found. Create a new booking to get started.</td></tr>';
      } else {
        sampleBookings.forEach(booking => {
          addBookingToTable(booking);
        });
      }
      
      showNotification('Booking deleted successfully');
      updateAvailableRooms();
    }
  }
}