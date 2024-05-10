import sellersFunc from "./functionalities/sellers-func.js";

document.addEventListener('DOMContentLoaded', showItems(false))

const logoutBtn = document.querySelector("#logoutBtn");
const searchBox = document.querySelector("#searchBox");
const main = document.querySelector("#main");

let filteredItems = []
let items = [];

// if the user is not logged in as a seller then redirect
if (!(await sellersFunc.isLoggedIn(localStorage.sellerCookie))) {
	window.location.href = "/home.html"
}

logoutBtn.addEventListener("click", async () => {
	await sellersFunc.logout(localStorage.sellerCookie);
	alert("You have successfully logged out");
	window.location.href = "/home.html"
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
		const sellerId = localStorage.sellerCookie.split(":")[0]
		items = await sellersFunc.getSellerItems(sellerId)
		console.log(items);
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
	const features = item.features.split("; ")
	return `<section class="item">
					<figure>
							<img src="${item.thumbnail}" alt="Image of ${item.title} Laptop">
					</figure>
					<p>${item.title}</p>
					<p class="best-for">${item.note}</p>
					<p class="note">Notable Features: </p>
					<p class="features">${features[0]}</p>
					<p class="features">${features[1]}</p>
					<p class="features">${features[2]}</p>
					<p class="features">${features[3]}</p>
					<p class="price">$${item.price}</p>
			</section>`;
}