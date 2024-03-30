window.addEventListener("load", async () => {
	showItems();
	window.handleBuyNow = handleBuyNow;
})

const loginBtn = document.querySelector("#loginBtn");
const searchBox = document.querySelector("#searchBox");
const main = document.querySelector("#main");

let filteredItems = [];

// const items = [
// 	{
// 		id: Math.floor(Math.random()) * 1000,
// 		thumbnail: "https://images.prismic.io/system76/1ff2f4e5-6046-4a93-8f67-59262866fd9d_product-serw13-600x600.png",
// 		title: "System76 Lemur Pro",
// 		note: "Best everyday laptop!",
// 		features: ["Lightest, thinnest laptop", "16:10 screen ratio (1200p)", "Opens to 180°", "Intel Core Ultra (Series 1)"],
// 		price: 1399,
// 	},
// 	{
// 		id: Math.floor(Math.random()) * 1000,
// 		thumbnail: "https://images.prismic.io/system76/591a58a1-4a0c-4bad-9360-f271b1c82f55_product-galp-600x600-scaled.png",
// 		title: "System76 Pangolin",
// 		note: "Best graphics!",
// 		features: ["Fast AMD CPU", "Best integrated graphics", "Camera privacy switch", "Quick storage access"],
// 		price: 1299,
// 	},
// 	{
// 		id: Math.floor(Math.random()) * 1000,
// 		thumbnail: "https://images.prismic.io/system76/7d2377e5-ebb6-427d-8169-90affeac1286_product-darp-600x600-scaled.png",
// 		title: "System76 Darter Pro",
// 		note: "Most premium build!",
// 		features: ["Compact 15\"", "12-Core CPU", "DDR5 RAM (96GB max)", "Most ports including microSD reader"],
// 		price: 1500,
// 	},
// 	{
// 		id: Math.floor(Math.random()) * 1000,
// 		thumbnail: "https://images.prismic.io/system76/0c373c32-cc96-4ea5-ab45-8ad840c2a8e9_product-addw4-600x600.png",
// 		title: "System76 Adder WS",
// 		note: "Most affordable high-end performance!",
// 		features: ["24-core CPU", "NVIDIA 40-Series", "DDR5 RAM", "PCIe 4.0 SSDs"],
// 		price: 1699,
// 	},
// 	{
// 		id: Math.floor(Math.random()) * 1000,
// 		thumbnail: "https://images.prismic.io/system76/1ff2f4e5-6046-4a93-8f67-59262866fd9d_product-serw13-600x600.png",
// 		title: "System76 Serval WS",
// 		note: "Most affordable 4K display!",
// 		features: ["Fast USB speeds", "Premium build", "165Hz refresh rate (15\")", "2K or 4K display (17\")"],
// 		price: 2099,
// 	},
// 	{
// 		id: Math.floor(Math.random()) * 1000,a
// 		thumbnail: "https://images.prismic.io/system76/7d2377e5-ebb6-427d-8169-90affeac1286_product-darp-600x600-scaled.png",
// 		title: "System76 Bonobo WS",
// 		note: "Most powerful!",
// 		features: ["24-core Intel i9 processor", "NVIDIA RTX 4080 or 4090", "2K 240Hz or 4K 144Hz display", "Massive trackpad"],
// 		price: 3299,
// 	}
// ];

let items = [];
const data = await fetch("js/data/users.json");
const users = await data.json();

// if (!localStorage.loggedInUser) {
//   localStorage.loggedInUser = -1;
// }

if (users.some(user => user.uid === localStorage.getItem('loggedInUser'))) {
  loginBtn.textContent = "Logout";
}

loginBtn.addEventListener("click", () => {
  if (localStorage.getItem('loggedInUser') == -1) {
    window.location.href = "/login-type.html";
  } else {
    localStorage.setItem('loggedInUser', -1);
    loginBtn.textContent = "Login";
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
					<button>Show Details</button>
					<button onclick="handleBuyNow(${item.id})">Buy Now!</button>
			</section>`;
}

function handleBuyNow(id) {
  const item = items.find(item => item.id === id);
  if (users.some(user => user.uid !== undefined && user.uid == localStorage.getItem('loggedInUser'))) {
    localStorage.itemID = item.id;
    window.location.href = `/buy-now.html`;
  } else {
    confirm("Please login to buy items!");
    window.location.href = "/login-type.html";
  }
}

function addItem(title, note, features, extra_details, price) {
  //can't be ourchased when added so we just set it as false by default
  //in documentation, check if logged in
  const newItem = {
    title,
    note,
    features,
    extra_details,
    price,
    purchased: false,
  };
  items.push(newItem);
}

function removeItem(title) {
  //should add id as an attribute after making a function to randomly generate it, more suitable than title which could be duplicated
  const index = items.findIndex(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  if (index !== -1) {
    items.splice(index, 1);
  }
}
function purchaseItem(title) {
  //maybe should be added to cart, since it is only purchesed after deducting money from customer
  //check balance , change in DOM
  const index = items.findIndex(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  items[index].purchased = !items[index].purchased;
}
addItem(
  "New Product",
  "Note about the new product",
  ["Feature 1", "Feature 2"],
  "New extra details",
  12344
);
addItem(
  "Product2",
  "Note about the new product",
  ["Feature 1", "Feature 2"],
  " extra details",
  1233
);
// line();
// console.log(find("l"));
// line();
// line();
// console.log(items);
// line();
// line();
// removeItem("Product2");
// line();
// line();
// console.log(items);
// line();
// line();
// purchaseItem("lemur1");
// console.log(items);
