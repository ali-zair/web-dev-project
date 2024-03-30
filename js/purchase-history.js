document.addEventListener('DOMContentLoaded', showPurchaseHistory);

let users = [];
let items = [];

async function showPurchaseHistory() {

	console.log("inside");

	const main = document.querySelector("#main");

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

	debugger;

	const user = users.find(user => user.uid === parseInt(localStorage.getItem('loggedInUser')));
	if (user.itemsPurchased && user.itemsPurchased.length > 0) {
		main.innerHTML = user.itemsPurchased.map(purchase => purchasesToHTML(purchase, items.find(item => item.id === purchase.itemId)));
	}
}

function purchasesToHTML(purchase, item) {
	return `<section class="item">
						<h1>Purchased Item</h1>
						<p>Order Number: ${purchase.orderNo}</label>
						<p>Item Title: ${item.title}</p>
						<p>Shipping Address: ${purchase.shippingAddress}</p>
						<p>Item Quantity: ${purchase.quantity}</p>
						<p>Date of Purchase: ${purchase.date.split('T')[0]}</p>
						<p>Shipping Type: ${purchase.shippingType}</p>
					</section>`
}