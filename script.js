const products = [
  { name: "Bisleri 2L", price: 200,Image:"bisleri.jpeg"},
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
  { name: "frooti", price: 400},
  { name: "frooti bottle", price: 330},
  { name: "redbull", price: 2270},
  { name: "hell", price: 1200},
  { name: "jersey badam milk", price: 700},
  { name: "jersey panner 200gms", price: 100},
];

let cart = [];

const productList = document.getElementById("product-list");
const cartItems = document.getElementById("cart-items");
const total = document.getElementById("total");
const cartCount = document.getElementById("cart-count");
const whatsappBtn = document.getElementById("whatsapp-btn");

// Add your WhatsApp number here
const phoneNumber = "9392829603";

// Display products
products.forEach((p, i) => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <h3>${p.name}</h3>
    <p>₹${p.price}</p>
    <button onclick="addToCart(${i})">Add</button>
  `;
  productList.appendChild(div);
});

function addToCart(i) {
  cart.push(products[i]);
  updateCart();
}

function updateCart() {
  cartItems.innerHTML = "";
  let sum = 0;

  cart.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item.name + " - ₹" + item.price;
    cartItems.appendChild(li);
    sum += item.price;
  });

  total.textContent = sum;
  cartCount.textContent = cart.length;

  updateWhatsApp();
}

function updateWhatsApp() {
  let msg = "Hello, I want to order:\n\n";
  cart.forEach((item, i) => {
    msg += (i+1) + ". " + item.name + " - ₹" + item.price + "\n";
  });

  msg += "\nTotal: ₹" + total.textContent;

  const url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(msg);
  whatsappBtn.href = url;
}
function toggleCart() {
  const cartBox = document.querySelector(".cart-box");
  if (cartBox.style.display === "none") {
    cartBox.style.display = "block";
  } else {
    cartBox.style.display = "none";
  }
}

function clearCart() {
  cart = [];
  updateCart();
}