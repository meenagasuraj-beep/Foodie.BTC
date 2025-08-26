// Food items
const foods = [
  { id: 1, name: "Biriyani", price: 180, img: "https://i.ibb.co/g9Rr7sK/biriyani.jpg" },
  { id: 2, name: "Thumbsup", price: 40, img: "https://i.ibb.co/5Ywvjzg/thumbsup.jpg" },
  { id: 3, name: "Chicken Pakoda", price: 150, img: "https://i.ibb.co/dk0mPyR/chicken-pakoda.jpg" },
];

const foodList = document.getElementById("food-list");
const cartBtn = document.getElementById("cart-btn");
const cart = document.getElementById("cart");
const cartItems = document.getElementById("cart-items");
const cartCount = document.getElementById("cart-count");
const cartTotal = document.getElementById("cart-total");
const searchInput = document.getElementById("search");

let cartData = [];

// Display food items
function displayFoods(list) {
  foodList.innerHTML = "";
  list.forEach(food => {
    const item = document.createElement("div");
    item.classList.add("food-item");
    item.innerHTML = `
      <img src="${food.img}" alt="${food.name}">
      <h3>${food.name}</h3>
      <p>₹${food.price}</p>
      <button onclick="addToCart(${food.id})">Add to Cart</button>
    `;
    foodList.appendChild(item);
  });
}

// Initial display
displayFoods(foods);

// Add to cart
function addToCart(id) {
  const food = foods.find(f => f.id === id);
  cartData.push(food);
  updateCart();
}

// Update cart
function updateCart() {
  cartItems.innerHTML = "";
  let total = 0;

  cartData.forEach((item, index) => {
    total += item.price;
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.name} - ₹${item.price}
      <button onclick="removeFromCart(${index})">❌</button>
    `;
    cartItems.appendChild(li);
  });

  cartCount.textContent = cartData.length;
  cartTotal.textContent = total;
}

// Remove from cart
function removeFromCart(index) {
  cartData.splice(index, 1);
  updateCart();
}

// Toggle cart sidebar
cartBtn.addEventListener("click", () => {
  cart.classList.toggle("active");
});

// Checkout
document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cartData.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  cartData = [];
  updateCart();
  cart.classList.remove("active");
});

// Search filter
searchInput.addEventListener("input", (e) => {
  const searchText = e.target.value.toLowerCase();
  const filteredFoods = foods.filter(f => f.name.toLowerCase().includes(searchText));
  displayFoods(filteredFoods);
});
