const products = [
 { name: "Bisleri 2L", price: 200, image: "images/bisleri2.webp" },
  { name: "Bisleri 1L", price: 140 , image: " images/bisleri1.jpg"},
  { name: "Bisleri 500ml", price: 175,image: " images/500ml.jpg" },
  { name: "Bindu Jeera Masala Soda", price: 240,image: " images/bindu.webp" },
  { name: "Tata Gluco", price: 180,image: " images/tata.jpg" },
  { name: "Sprite 2.25L", price: 750 ,image: " images/sprite.webp"},
  { name: "Thumbs Up 2.25L", price: 750,image: " images/up.jpg" },
  { name: "Appy Fizz 1L", price: 330,image: " images/appy.webp" },
  { name: "Sprite 250ml", price: 460,image: " images/sprite250.jpeg" },
  { name: "Mountain Dew", price: 500 ,image: " images/dew.webp"},
  { name: "Sting", price: 500 ,image: " images/sting.jpg"},
  { name: "Sprite 1L", price: 650,image: " images/sprite1.avif" },
  { name: "Thumbs Up 1L", price: 650 ,image: " images/up1.webp"},
  { name: "Campa Orange", price: 215,image: " images/orange.webp" },
  { name: "Campa Black", price: 215 ,image: " images/black.jpg"},
  { name: "Fanta 250ml", price: 460 ,image: " images/fanta.webp"},
  { name: "Maaza", price: 500 ,image: " images/maaza.jpg"},
  { name: "Frooti", price: 400 ,image: " images/frooti125.webp"},
  { name: "Frooti Bottle", price: 330 ,image: " images/frooti.jpg"},
  { name: "Redbull", price: 2270 ,image: " images/redbull.jpg"},
  { name: "Hell", price: 1200 ,image: " images/hell.webp"},
  { name: "Jersey Badam Milk", price: 700 ,image: " images/badam.avif"},
  { name: "Jersey Paneer 200gms", price: 100 ,image: " images/paneer.jpg"},
  { name: "Tata water 250ml ", price: 130 ,image: " images/tata250.jpg"},
  { name: "Tata water 500ml ", price: 165 ,image: " images/tata500.webp"},
  { name: "Tata water 1 LTR  ", price: 130 ,image: " images/tata1l.jpg"},
  { name: "Tata water 2 LTR  ", price: 180 ,image: " images/tata2l.jpeg"},   
  { name: "masqati badam milk ", price: 760 ,image: " images/milk.jpg"},
  { name: "Pulpy 250ml  ", price: 600 ,image: " images/pulp.jpg"}, 
    { name: "Thumbs up  250ml   ", price: 460 ,image: " images/up250.jpg"},
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
  <img src="${p.image}" class="product-img"
       onerror="this.src='https://via.placeholder.com/150'">

  <h3>${p.name}</h3>
  <p>₹${p.price}</p>

  <div id="controls-${i}" class="card-controls" style="display:none;">
    <button onclick="changeProductQuantity(${i}, -1)">-</button>
    <span id="qty-${i}">0</span>
    <button onclick="changeProductQuantity(${i}, 1)">+</button>
  </div>

  <button id="add-${i}" class="add-btn" onclick="addToCart(${i})">Add</button>
    <div id="controls-${i}" class="card-controls" style="display:none;">
      <button onclick="changeProductQuantity(${i}, -1)">-</button>
      <span id="qty-${i}">0</span>
      <button onclick="changeProductQuantity(${i}, 1)">+</button>
    </div>
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

