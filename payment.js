// Payment Management System

// Sample data for demonstration
const sampleBookings = [
  {
    id: 'BKG001',
    guestName: 'Ali Ahmed',
    guestPhone: '0300-1234567',
    checkIn: '2023-06-15',
    checkOut: '2023-06-18',
    roomType: 'Double',
    roomNumber: '201',
    roomRate: 4500,
    specialRequests: 'Non-smoking room',
    status: 'checked-out'
  },
  {
    id: 'BKG002',
    guestName: 'Fatima Khan',
    guestPhone: '0312-9876543',
    checkIn: '2023-06-20',
    checkOut: '2023-06-25',
    roomType: 'Suite',
    roomNumber: '301',
    roomRate: 7500,
    specialRequests: 'Early check-in requested',
    status: 'checked-out'
  },
  {
    id: 'BKG003',
    guestName: 'Usman Malik',
    guestPhone: '0321-1234567',
    checkIn: '2023-07-01',
    checkOut: '2023-07-05',
    roomType: 'Family',
    roomNumber: '401',
    roomRate: 8500,
    specialRequests: '',
    status: 'checked-in'
  }
];

const sampleBills = [
  {
    id: 'BIL001',
    bookingId: 'BKG001',
    guestName: 'Ali Ahmed',
    roomNumber: '201',
    roomType: 'Double',
    checkIn: '2023-06-15',
    checkOut: '2023-06-18',
    nights: 3,
    roomRate: 4500,
    roomCharges: 13500,
    services: [
      { name: 'Laundry Service', price: 1200 },
      { name: 'Airport Transfer', price: 1500 }
    ],
    serviceCharges: 2700,
    subtotal: 16200,
    taxRate: 13,
    taxAmount: 2106,
    discount: 0,
    totalAmount: 18306,
    amountPaid: 18306,
    balanceDue: 0,
    status: 'paid',
    issueDate: '2023-06-18',
    payments: [
      {
        date: '2023-06-18',
        amount: 18306,
        method: 'card',
        notes: 'Full payment upon checkout'
      }
    ]
  },
  {
    id: 'BIL002',
    bookingId: 'BKG002',
    guestName: 'Fatima Khan',
    roomNumber: '301',
    roomType: 'Suite',
    checkIn: '2023-06-20',
    checkOut: '2023-06-25',
    nights: 5,
    roomRate: 7500,
    roomCharges: 37500,
    services: [
      { name: 'Spa Service', price: 5000 },
      { name: 'Additional Meals', price: 3500 }
    ],
    serviceCharges: 8500,
    subtotal: 46000,
    taxRate: 13,
    taxAmount: 5980,
    discount: 1000,
    totalAmount: 50980,
    amountPaid: 25000,
    balanceDue: 25980,
    status: 'partial',
    issueDate: '2023-06-25',
    payments: [
      {
        date: '2023-06-20',
        amount: 15000,
        method: 'cash',
        notes: 'Advance payment at check-in'
      },
      {
        date: '2023-06-25',
        amount: 10000,
        method: 'bank',
        notes: 'Partial payment at checkout'
      }
    ]
  }
];

// Initialize with sample data
function initializeSampleData() {
  // Populate booking dropdown
  const bookingSelect = document.getElementById('booking-id');
  sampleBookings.forEach(booking => {
    if (booking.status === 'checked-out' || booking.status === 'checked-in') {
      const option = document.createElement('option');
      option.value = booking.id;
      option.textContent = `${booking.id} - ${booking.guestName} (Room ${booking.roomNumber})`;
      option.setAttribute('data-booking', JSON.stringify(booking));
      bookingSelect.appendChild(option);
    }
  });

  // Display sample bills
  displayBills(sampleBills);
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

// Calculate bill
function calculateBill() {
  const nights = parseInt(document.getElementById('nights').value) || 0;
  const roomRate = parseInt(document.getElementById('room-rate').value) || 0;
  const roomCharges = nights * roomRate;
  
  // Calculate service charges
  let serviceCharges = 0;
  const serviceItems = document.querySelectorAll('.service-list-item');
  serviceItems.forEach(item => {
    const price = parseInt(item.querySelector('.service-price').textContent);
    serviceCharges += price;
  });
  
  const subtotal = roomCharges + serviceCharges;
  const taxRate = parseInt(document.getElementById('tax-rate').value) || 0;
  const taxAmount = subtotal * (taxRate / 100);
  const discount = parseInt(document.getElementById('discount').value) || 0;
  const totalAmount = subtotal + taxAmount - discount;
  
  // Update summary
  document.getElementById('room-charges').textContent = `${roomCharges} PKR`;
  document.getElementById('service-charges').textContent = `${serviceCharges} PKR`;
  document.getElementById('subtotal').textContent = `${subtotal} PKR`;
  document.getElementById('tax-amount').textContent = `${taxAmount.toFixed(2)} PKR`;
  document.getElementById('discount-amount').textContent = `${discount} PKR`;
  document.getElementById('total-amount').textContent = `${totalAmount.toFixed(2)} PKR`;
}

// Display bills in table
function displayBills(bills) {
  const billsTable = document.getElementById('billsTable').querySelector('tbody');
  billsTable.innerHTML = '';
  
  if (bills.length === 0) {
    billsTable.innerHTML = '<tr><td colspan="7" class="empty-state">No bills found. Generate a bill or adjust your search criteria.</td></tr>';
    return;
  }
  
  bills.forEach(bill => {
    let statusClass = '';
    let statusText = '';
    
    switch(bill.status) {
      case 'paid':
        statusClass = 'paid';
        statusText = 'Paid';
        break;
      case 'pending':
        statusClass = 'pending';
        statusText = 'Pending';
        break;
      case 'partial':
        statusClass = 'partial';
        statusText = 'Partial';
        break;
    }
    
    const row = billsTable.insertRow();
    row.innerHTML = `
      <td>${bill.id}</td>
      <td>${bill.guestName}</td>
      <td>${bill.roomNumber}</td>
      <td>${bill.issueDate}</td>
      <td>${bill.totalAmount.toFixed(2)} PKR</td>
      <td><span class="badge ${statusClass}">${statusText}</span></td>
      <td class="actions">
        <button class="action-btn" onclick="viewBill('${bill.id}')">View</button>
        <button class="action-btn" onclick="editBill('${bill.id}')">Edit</button>
        <button class="action-btn" onclick="deleteBill('${bill.id}')">Delete</button>
      </td>
    `;
  });
}

// Setup event listeners
function setupEventListeners() {
  // Booking selection change
  document.getElementById('booking-id').addEventListener('change', function() {
    const selectedOption = this.options[this.selectedIndex];
    if (selectedOption.value) {
      const booking = JSON.parse(selectedOption.getAttribute('data-booking'));
      
      // Calculate number of nights
      const checkIn = new Date(booking.checkIn);
      const checkOut = new Date(booking.checkOut);
      const nights = Math.ceil((checkOut - checkIn) / (1000 * 60 * 60 * 24));
      
      // Populate form fields
      document.getElementById('guest-name-bill').value = booking.guestName;
      document.getElementById('room-number-bill').value = booking.roomNumber;
      document.getElementById('room-type-bill').value = booking.roomType;
      document.getElementById('check-in-bill').value = booking.checkIn;
      document.getElementById('check-out-bill').value = booking.checkOut;
      document.getElementById('nights').value = nights;
      document.getElementById('room-rate').value = booking.roomRate;
      
      // Calculate initial bill
      calculateBill();
    }
  });
  
  // Add service button
  document.querySelector('.add-service-btn').addEventListener('click', function() {
    const serviceName = document.getElementById('service-name').value;
    const servicePrice = parseInt(document.getElementById('service-price').value) || 0;
    
    if (!serviceName || servicePrice <= 0) {
      alert('Please enter a valid service name and price');
      return;
    }
    
    const servicesList = document.getElementById('services-list');
    const serviceId = Date.now(); // Unique ID
    
    const serviceItem = document.createElement('div');
    serviceItem.className = 'service-list-item';
    serviceItem.innerHTML = `
      <div>
        <strong>${document.getElementById('service-name').options[document.getElementById('service-name').selectedIndex].text}</strong>
        <span class="service-price" style="display: none;">${servicePrice}</span>
      </div>
      <div>
        <span>${servicePrice} PKR</span>
        <button type="button" class="remove-service" data-id="${serviceId}">×</button>
      </div>
    `;
    
    servicesList.appendChild(serviceItem);
    
    // Add remove event listener
    serviceItem.querySelector('.remove-service').addEventListener('click', function() {
      serviceItem.remove();
      calculateBill();
    });
    
    // Reset service form
    document.getElementById('service-name').value = '';
    document.getElementById('service-price').value = '0';
    
    // Recalculate bill
    calculateBill();
  });
  
  // Form inputs change listeners
  document.getElementById('tax-rate').addEventListener('input', calculateBill);
  document.getElementById('discount').addEventListener('input', calculateBill);
  
  // Bill form submission
  document.getElementById('billForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const bookingId = document.getElementById('booking-id').value;
    if (!bookingId) {
      alert('Please select a booking');
      return;
    }
    
    // Create new bill
    const newBill = {
      id: 'BIL' + Math.floor(1000 + Math.random() * 9000),
      bookingId: bookingId,
      guestName: document.getElementById('guest-name-bill').value,
      roomNumber: document.getElementById('room-number-bill').value,
      roomType: document.getElementById('room-type-bill').value,
      checkIn: document.getElementById('check-in-bill').value,
      checkOut: document.getElementById('check-out-bill').value,
      nights: parseInt(document.getElementById('nights').value),
      roomRate: parseInt(document.getElementById('room-rate').value),
      roomCharges: parseInt(document.getElementById('room-charges').textContent),
      services: [],
      serviceCharges: parseInt(document.getElementById('service-charges').textContent),
      subtotal: parseInt(document.getElementById('subtotal').textContent),
      taxRate: parseInt(document.getElementById('tax-rate').value),
      taxAmount: parseFloat(document.getElementById('tax-amount').textContent),
      discount: parseInt(document.getElementById('discount').value),
      totalAmount: parseFloat(document.getElementById('total-amount').textContent),
      amountPaid: 0,
      balanceDue: parseFloat(document.getElementById('total-amount').textContent),
      status: 'pending',
      issueDate: new Date().toISOString().split('T')[0],
      payments: []
    };
    
    // Add services
    const serviceItems = document.querySelectorAll('.service-list-item');
    serviceItems.forEach(item => {
      const name = item.querySelector('strong').textContent;
      const price = parseInt(item.querySelector('.service-price').textContent);
      newBill.services.push({ name, price });
    });
    
    // Add to sample bills
    sampleBills.push(newBill);
    
    // Update UI
    displayBills(sampleBills);
    showNotification('Bill generated successfully');
    
    // Reset form
    this.reset();
    document.getElementById('services-list').innerHTML = '';
    calculateBill();
  });
  
  // Search bills button
  document.getElementById('search-bills-btn').addEventListener('click', function() {
    const guestName = document.getElementById('search-guest').value.toLowerCase();
    const roomNumber = document.getElementById('search-room').value;
    const dateFrom = document.getElementById('search-date-from').value;
    const dateTo = document.getElementById('search-date-to').value;
    
    let filteredBills = sampleBills;
    
    if (guestName) {
      filteredBills = filteredBills.filter(bill => 
        bill.guestName.toLowerCase().includes(guestName)
      );
    }
    
    if (roomNumber) {
      filteredBills = filteredBills.filter(bill => 
        bill.roomNumber.includes(roomNumber)
      );
    }
    
    if (dateFrom) {
      filteredBills = filteredBills.filter(bill => 
        bill.issueDate >= dateFrom
      );
    }
    
    if (dateTo) {
      filteredBills = filteredBills.filter(bill => 
        bill.issueDate <= dateTo
      );
    }
    
    displayBills(filteredBills);
  });
  
  // Additional event listeners would be added for other functionalities
  // such as update bill, payment status, etc.
}

// Initialize with sample data on page load
document.addEventListener('DOMContentLoaded', function() {
  initializeSampleData();
  setupTabs();
  setupEventListeners();
  
  // Set today's date as default for payment date
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('payment-date').value = today;
});

// These functions would be implemented for the complete functionality
function viewBill(billId) {
  alert(`View bill ${billId} functionality would be implemented here`);
}

function editBill(billId) {
  alert(`Edit bill ${billId} functionality would be implemented here`);
}

function deleteBill(billId) {
  if (confirm('Are you sure you want to delete this bill?')) {
    const index = sampleBills.findIndex(bill => bill.id === billId);
    if (index !== -1) {
      sampleBills.splice(index, 1);
      displayBills(sampleBills);
      showNotification('Bill deleted successfully');
    }
  }
}