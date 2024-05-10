const loginBtn = document.querySelector("#loginBtn");
const main = document.querySelector("#main");

document.addEventListener('DOMContentLoaded', showPurchaseHistory);

async function showPurchaseHistory() {
	const custId = localStorage.custCookie.split(':')[0]
	const url = `/api/customers?custId=${custId}`
	const itemsPurchasedData = await fetch(url)
	const { itemsPurchased } = await itemsPurchasedData.json()
	console.log(itemsPurchased);
	const itemsData = await fetch('/api/items')
	const items = await itemsData.json()
	console.log(items);
	if (itemsPurchased && itemsPurchased.length > 0) {
		console.log("inside if");
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
				<p>Amount: $${purchase.amount}</p>
			</section>`
}