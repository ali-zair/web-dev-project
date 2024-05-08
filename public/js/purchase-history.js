const loginBtn = document.querySelector("#loginBtn");
const main = document.querySelector("#main");

document.addEventListener('DOMContentLoaded', showPurchaseHistory);

async function showPurchaseHistory() {
	debugger
	const custId = localStorage.custCookie.split(':')[0]
	const url = `/api/customers?custId=${custId}`
	const itemsPurchasedData = await fetch(url)
	const itemsPurchased = await itemsPurchasedData.json()
	const itemsData = await fetch('/api/items')
	const items = await itemsData.json()
	if (itemsPurchased && itemsPurchased.length > 0) {
		main.innerHTML = itemsPurchased.map(purchase => purchasesToHTML(purchase, items.find(item => item.id === purchase.itemId))).join("");
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