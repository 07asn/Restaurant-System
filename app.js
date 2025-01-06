// Customer Constructor
function Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl) {
  this.fullName = fullName;
  this.password = password;
  this.dob = dob;
  this.gender = gender;
  this.phone = phone;
  this.orderType = orderType;
  this.orderOption = orderOption;
  this.imageUrl = imageUrl;
}

//Customer Order Information
let orders = [];


//Displaying Customers Orders
function renderOrders() {
  const ordersList = document.getElementById('orders-list');
  ordersList.innerHTML = ''; // Clear current list

  orders.forEach(customer => {
      const orderCard = document.createElement('div');
      orderCard.classList.add('col-md-4', 'mb-4');

      orderCard.innerHTML = `
          <div class="card">
              <img src="${customer.imageUrl}" class="card-img-top" alt="Customer Image">
              <div class="card-body">
                  <h5 class="card-title">${customer.fullName}</h5>
                  <p><strong>Order Type:</strong> ${customer.orderType.join(', ')}</p>
                  <p><strong>Order Option:</strong> ${customer.orderOption}</p>
                  <p><strong>Phone:</strong> ${customer.phone}</p>
                  <p><strong>Gender:</strong> ${customer.gender}</p>
                  <p><strong>Date of Birth:</strong> ${customer.dob}</p>
              </div>
          </div>
      `;

      ordersList.appendChild(orderCard);
  });
}

// Function to handle form submission
document.getElementById('order-form').addEventListener('submit', function(e) {
  e.preventDefault();

  const fullName = document.getElementById('fullName').value;
  const password = document.getElementById('password').value;
  const dob = document.getElementById('dob').value;
  const gender = document.getElementById('gender').value;
  const phone = document.getElementById('phone').value;

  const orderType = [];
  if (document.getElementById('shawarma').checked) orderType.push('Shawarma');
  if (document.getElementById('zinger').checked) orderType.push('Zinger');
  if (document.getElementById('burger').checked) orderType.push('Burger');

  const orderOption = document.querySelector('input[name="orderOption"]:checked').value;

  const imageUrl = "customer.png.png";
  // Create customer object
  const customer = new Customer(fullName, password, dob, gender, phone, orderType, orderOption, imageUrl);

  // Save to array and localStorage
  orders.push(customer);
  localStorage.setItem('orders', JSON.stringify(orders));

  // Render the orders
  renderOrders();

  // Clear the form
  document.getElementById('order-form').reset();
});

// Load orders from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
  const storedOrders = JSON.parse(localStorage.getItem('orders'));
  if (storedOrders) {
      orders = storedOrders;
      renderOrders();
  }
});
