window.addEventListener("load", async () => {
  showItems();
  window.handleBuyNow = handleBuyNow;
  window.handleShowDetails = handleShowDetails;
});

const loginBtn = document.querySelector("#loginBtn");
const searchBox = document.querySelector("#searchBox");
const main = document.querySelector("#main");

let filteredItems = [];

let items = [];
const data = await fetch("js/data/users.json");
const users = await data.json();

if (!localStorage.loggedInUser) {
  localStorage.loggedInUser = -1;
}

debugger;
if (users.some(user => user.uid === parseInt(localStorage.getItem('loggedInUser')) || user.sid === parseInt(localStorage.getItem('loggedInUser')))) {
  loginBtn.textContent = "Logout";
  const user = users.find(user => user.uid === parseInt(localStorage.getItem('loggedInUser')));
  if (user) {
    document.querySelector("#purchaseLI").classList.toggle("hidden", false);
  }
}

loginBtn.addEventListener("click", () => {
  if (parseInt(localStorage.getItem('loggedInUser')) === -1) {
    window.location.href = "/login-type.html";
  } else {
    localStorage.setItem("loggedInUser", -1);
    loginBtn.textContent = "Login";
    document.querySelector("#purchaseLI").classList.toggle("hidden", true);
  }
});

searchBox.addEventListener("input", find);

function find() {
  if (searchBox.value !== "") {
    filteredItems = items.filter((item) =>
      item.title.toLowerCase().includes(searchBox.value.toLowerCase())
    );
    showItems(true);
  } else {
    showItems(false);
  }
}

async function showItems(isFiltered) {
  try {
    if (localStorage.items) {
      items = JSON.parse(localStorage.items);
    } else {
      const data = await fetch("js/data/items.json");
      items = await data.json();
      localStorage.items = JSON.stringify(items);
    }
    if (isFiltered === true) {
      main.innerHTML = filteredItems.map((item) => itemToHTML(item)).join("");
    } else {
      main.innerHTML = items.map((item) => itemToHTML(item)).join("");
    }
  } catch (error) {
    console.error("Failed to load items:", error);
  }
}

function itemToHTML(item) {
  return `<section class="item">
					<figure>
							<img src="${item.thumbnail}" alt="Image of ${item.title} Laptop">
					</figure>
					<p>${item.title}</p>
					<p class="best-for">${item.note}</p>
					<p class="note">Notable Features: </p>
					<p class="features">${item.features[0]}</p>
					<p class="features">${item.features[1]}</p>
					<p class="features">${item.features[2]}</p>
					<p class="features">${item.features[3]}</p>
					<p class="price">$${item.price}</p>
					<button onclick="handleShowDetails(${item.id})">Show Details</button>
					<button onclick="handleBuyNow(${item.id})">Buy Now!</button>
			</section>`;
}

function handleShowDetails(id) {
  const item = items.find((item) => item.id === id);
  localStorage.itemID = item.id;
  window.location.href = "/show-details.html";
}

function handleBuyNow(id) {
  const item = items.find((item) => item.id === id);
  if (
    users.some(
      (user) =>
        user.uid !== undefined &&
        user.uid == localStorage.getItem("loggedInUser")
    )
  ) {
    localStorage.itemID = item.id;
    window.location.href = `/buy-now.html`;
  } else {
    alert("Please login to buy items!");
    window.location.href = "/login-type.html";
  }
}
