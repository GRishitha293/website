const products = [
  { name: "Bisleri 2L", price: 200 },
  { name: "Bisleri 1L", price: 140 },
  { name: "Bisleri 500ml", price: 175 },
  { name: "Bindu Jeera Masala Soda", price: 240 },
  { name: "Tata Gluco", price: 180 },
  { name: "Sprite 2.25L", price: 750 },
  { name: "Thumbs Up 2.25L", price: 750 },
  { name: "Appy Fizz 1L", price: 330 },
  { name: "Sprite 250ml", price: 460 },
  { name: "Mountain Dew", price: 500 },
  { name: "Sting", price: 500 },
  { name: "Sprite 1L", price: 650 },
  { name: "Thumbs Up 1L", price: 650 },
  { name: "Campa Orange", price: 215 },
  { name: "Campa Black", price: 215 },
  { name: "Fanta 250ml", price: 460 },
  { name: "Maaza", price: 500 },
  { name: "Frooti", price: 400 },
  { name: "Frooti Bottle", price: 330 },
  { name: "Redbull", price: 2270 },
  { name: "Hell", price: 1200 },
  { name: "Jersey Badam Milk", price: 700 },
  { name: "Jersey Paneer 200gms", price: 100 },
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const whatsappBtn = document.getElementById("whatsapp-btn");
const phoneNumber = "9392829603";

// Display products
products.forEach((p, i) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <div id="controls-${i}" class="card-controls" style="display:none;">
      <button onclick="changeProductQuantity(${i}, -1)">-</button>
      <span id="qty-${i}">0</span>
      <button onclick="changeProductQuantity(${i}, 1)">+</button>
    </div>
    <button id="add-${i}" class="add-btn" onclick="addToCart(${i})">Add</button>
  `;
  productList.appendChild(div);
});

function addToCart(i) {
  changeProductQuantity(i, 1);
}

function changeProductQuantity(i, delta) {
  const existing = cart.find(c => c.item.name === products[i].name);
  if (existing) {
    existing.quantity += delta;
    if (existing.quantity <= 0) cart = cart.filter(c => c.item.name !== products[i].name);
  } else if (delta > 0) {
    cart.push({ item: products[i], quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;
  let qty = 0;

  cart.forEach((c, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${c.item.name} - ₹${c.item.price} 
      <div class="quantity-controls">
        <button onclick="changeQuantity(${index}, -1)">-</button>
        <span class="quantity">${c.quantity}</span>
        <button onclick="changeQuantity(${index}, 1)">+</button>
      </div>
    `;
    cartItems.appendChild(li);
    sum += c.item.price * c.quantity;
    qty += c.quantity;
  });

  total.textContent = sum;
  cartCount.textContent = qty;
  document.getElementById("cart-summary").textContent = `${qty} items | ₹${sum}`;

  // Update product cards
  products.forEach((p, i) => {
    const qtySpan = document.getElementById(`qty-${i}`);
    const controls = document.getElementById(`controls-${i}`);
    const addButton = document.getElementById(`add-${i}`);
    const existing = cart.find(c => c.item.name === p.name);

    if (qtySpan) qtySpan.textContent = existing ? existing.quantity : 0;
    if (controls && addButton) {
      if (existing && existing.quantity > 0) {
        controls.style.display = "flex";
        addButton.style.display = "none";
      } else {
        controls.style.display = "none";
        addButton.style.display = "inline-block";
      }
    }
  });

  updateWhatsApp();

  // Show/hide bottom cart bar
  const cartBar = document.getElementById("cart-bar");
  if (cart.length > 0) cartBar.classList.add("show");
  else {
    cartBar.classList.remove("show");
    document.getElementById("cart-box").style.display = "none";
  }
}

function changeQuantity(index, delta) {
  cart[index].quantity += delta;
  if (cart[index].quantity <= 0) cart.splice(index, 1);
  updateCart();
}

function updateWhatsApp() {
  let msg = "Hello, I want to order:\n\n";
  cart.forEach((c, i) => {
    msg += `${i + 1}. ${c.item.name} - ₹${c.item.price} x ${c.quantity}\n`;
  });
  msg += `\nTotal: ₹${total.textContent}`;
  whatsappBtn.href = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`;
}

function toggleCart() {
  const cartBox = document.getElementById("cart-box");
  cartBox.style.display = (cartBox.style.display === "block") ? "none" : "block";
}

function clearCart() {
  cart = [];
  updateCart();
}

// Payment functions
function payGPay() {
  const amount = total.textContent;
  const upiLink = `gpay://upi/pay?pa=sarikondarahul2004@oksbi&pn=RR%20Enterprises&am=${amount}&cu=INR&tn=Order%20Payment`;
  window.location.href = upiLink;
}

function payPhonePe() {
  const amount = total.textContent;
  const upiLink = `phonepe://pay?pa=sarikondarahul2004@oksbi&pn=RR%20Enterprises&am=${amount}&cu=INR&tn=Order%20Payment`;
  window.location.href = upiLink;
}

function cod() {
  let msg = "Hello, I want to order with Cash on Delivery:\n\n";
  cart.forEach((c, i) => {
    msg += `${i + 1}. ${c.item.name} - ₹${c.item.price} x ${c.quantity}\n`;
  });
  msg += `\nTotal: ₹${total.textContent}`;
  window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(msg)}`);
}
