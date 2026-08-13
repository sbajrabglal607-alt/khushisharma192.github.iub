// ================= CART =================

let shoppingCart = [];

const cartElement = document.getElementById("cart");
const cartButton = document.getElementById("cartButton");
const closeCartButton = document.getElementById("closeCart");
const cartOverlay = document.getElementById("cartOverlay");

const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");


// OPEN CART

cartButton.addEventListener("click", function () {

  cartElement.classList.add("active");
  cartOverlay.classList.add("active");

});


// CLOSE CART

closeCartButton.addEventListener("click", closeCart);

cartOverlay.addEventListener("click", closeCart);


function closeCart() {

  cartElement.classList.remove("active");
  cartOverlay.classList.remove("active");

}


// ================= ADD TO CART =================

function addToCart(productName, productPrice) {

  const existing =
    shoppingCart.find(item => item.name === productName);

  if (existing) {

    existing.quantity++;

  } else {

    shoppingCart.push({
      name: productName,
      price: productPrice,
      quantity: 1
    });

  }

  updateCart();

  cartElement.classList.add("active");
  cartOverlay.classList.add("active");

}


// ================= UPDATE CART =================

function updateCart() {

  cartItems.innerHTML = "";

  if (shoppingCart.length === 0) {

    cartItems.innerHTML =
      `<p class="empty-cart">Your cart is empty.</p>`;

  } else {

    shoppingCart.forEach((item, index) => {

      const itemElement =
        document.createElement("div");

      itemElement.className = "cart-item";

      itemElement.innerHTML = `

        <div>

          <h4>
            ${item.name}
          </h4>

          <p>
            ₹${item.price.toLocaleString("en-IN")}
            × ${item.quantity}
          </p>

        </div>

        <button
          class="remove-item"
          onclick="removeFromCart(${index})">

          ✕

        </button>

      `;

      cartItems.appendChild(itemElement);

    });

  }


  const total =
    shoppingCart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  const quantity =
    shoppingCart.reduce(
      (sum, item) =>
        sum + item.quantity,
      0
    );


  cartTotal.textContent =
    "₹" + total.toLocaleString("en-IN");

  cartCount.textContent = quantity;

}


// ================= REMOVE CART ITEM =================

function removeFromCart(index) {

  shoppingCart.splice(index, 1);

  updateCart();

}


// ================= PRODUCT FILTER =================

function filterProducts(category) {

  const products =
    document.querySelectorAll(".product");

  products.forEach(product => {

    if (
      category === "All" ||
      product.dataset.category === category
    ) {

      product.style.display = "";

    } else {

      product.style.display = "none";

    }

  });


  document
    .getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

}


// ================= SEARCH =================

const searchButton =
  document.getElementById("searchButton");

const searchArea =
  document.getElementById("searchArea");

const searchInput =
  document.getElementById("searchInput");


searchButton.addEventListener("click", function () {

  searchArea.classList.toggle("active");

  if (searchArea.classList.contains("active")) {

    searchInput.focus();

  }

});


searchInput.addEventListener("input", function () {

  const searchText =
    searchInput.value.toLowerCase().trim();

  const products =
    document.querySelectorAll(".product");


  products.forEach(product => {

    const name =
      product.dataset.name.toLowerCase();

    const category =
      product.dataset.category.toLowerCase();


    if (
      name.includes(searchText) ||
      category.includes(searchText)
    ) {

      product.style.display = "";

    } else {

      product.style.display = "none";

    }

  });

});


// ================= MOBILE MENU =================

const menuButton =
  document.getElementById("menuButton");

const nav =
  document.getElementById("nav");


menuButton.addEventListener("click", function () {

  nav.classList.toggle("active");

});


document.querySelectorAll("#nav a")
  .forEach(link => {

    link.addEventListener("click", function () {

      nav.classList.remove("active");

    });

  });


// ================= ORDER =================

function placeOrder() {

  if (shoppingCart.length === 0) {

    alert(
      "Your cart is empty. Please add a product first."
    );

    return;

  }


  let orderMessage =
    "Hello Khushi Handicrafts & Marble!%0A%0A";

  orderMessage +=
    "I would like to order:%0A";


  shoppingCart.forEach(item => {

    orderMessage +=
      "- " +
      item.name +
      " × " +
      item.quantity +
      " = ₹" +
      (
        item.price *
        item.quantity
      ).toLocaleString("en-IN") +
      "%0A";

  });


  const total =
    shoppingCart.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );


  orderMessage +=
    "%0ATotal: ₹" +
    total.toLocaleString("en-IN");


  /*
    IMPORTANT:
    Replace 919999999999 below with
    your real WhatsApp number.

    Example for an Indian number:
    919828429584
  */

  const phoneNumber =
    "919999999999";


  const whatsappURL =
    "https://wa.me/" +
    phoneNumber +
    "?text=" +
    orderMessage;


  window.open(
    whatsappURL,
    "_blank"
  );

}


// ================= NEWSLETTER =================

const newsletterForm =
  document.getElementById("newsletterForm");


newsletterForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    const email =
      document.getElementById(
        "newsletterEmail"
      ).value;


    alert(
      "Thank you for joining Khushi Handicrafts & Marble!"
    );


    console.log(
      "Newsletter subscriber:",
      email
    );


    newsletterForm.reset();

  }
);


// ================= CONTACT FORM =================

const contactForm =
  document.getElementById("contactForm");


contactForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();


    alert(
      "Thank you for contacting Khushi Handicrafts & Marble. We will get back to you soon!"
    );


    contactForm.reset();

  }
);


// ================= INITIALIZE =================

updateCart();
