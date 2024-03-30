const loginBtn = document.querySelector("#loginBtn");
const main = document.querySelector("#main");

let users = [];
let items = [];

document.addEventListener('DOMContentLoaded', showPurchaseHistory);

loginBtn.addEventListener("click", () => {
    if (parseInt(localStorage.getItem('loggedInUser')) === -1) {
    window.location.href = "/login-type.html";
    } else {
    localStorage.setItem("loggedInUser", -1);
    loginBtn.textContent = "Login";
    document.querySelector("#purchaseLI").classList.toggle("hidden", true);
    }
});

async function showPurchaseHistory() {
	await getUsersAndItems();
	if (users.some(user => user.uid === parseInt(localStorage.getItem('loggedInUser')))) {
		loginBtn.textContent = "Logout";
		document.querySelector("#purchaseLI").classList.toggle("hidden", false);
	}
	const user = users.find(user => user.uid === parseInt(localStorage.getItem('loggedInUser')));
	if (user.itemsPurchased && user.itemsPurchased.length > 0) {
		main.innerHTML = user.itemsPurchased.map(purchase => purchasesToHTML(purchase, items.find(item => item.id === purchase.itemId))).join("");
	}
}

async function getUsersAndItems() {
	if (!localStorage.users) {
		const data = await fetch('js/data/users.json');
		users = await data.json();
	} else {
		users = JSON.parse(localStorage.getItem('users'));
	}
	
	if (!localStorage.items) {
		const data = await fetch('js/data/items.json');
		items = await data.json();
	} else {
		items = JSON.parse(localStorage.getItem('items'));
	}
}

function purchasesToHTML(purchase, item) {
	return `<section class="item">
				<h2>Order: #${purchase.orderNo}</h2>
				<p>${item.title}</p>
				<p>Shipping Address: ${purchase.shippingAddress}</p>
				<p>Item Quantity: ${purchase.quantity}</p>
				<p>Date of Purchase: ${purchase.date.split('T')[0]}</p>
				<p>Shipping Type: ${purchase.shippingType}</p>
			</section>`
}