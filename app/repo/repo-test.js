import customersRepo from "./customers-repo.js"
import sellersRepo from "./sellers-repo.js";

async function testPurchaseItem() {
	const custId = 52;
	const itemId = 265;
	const quantity = 2;

	const purchaseDetails = {
		orderNo: 492115,
		itemId: 265,
		shippingAddress: "asdklf",
		quantity: 2,
		date: "2024-05-06T14:32:05.121Z",
		shippingType: "express"
	};

	const result = await customersRepo.purchaseItem(custId, itemId, quantity, purchaseDetails);

	switch (result) {
		case 'item updated successfully':
			console.log('Item purchased successfully');
			break;
		case 'not enough stock for this item':
			console.log('Item is currently unavailable');
			break;
		case 'customer has insufficient balance':
			console.log('Customer has insufficient balance');
			break;
	}
}

async function testAddItemToSeller() {
	const sellerId = 123;
	const item = {
		thumbnail: 'https://via.placeholder.com/150',
		title: 'Item 1',
		note: 'This is a note',
		features: ['feature 1', 'feature 2'],
		price: 100,
		quantity: 10,
		extra_details: 'extra details'
	};

	const result = await sellersRepo.addItemToSeller(item, sellerId);

	switch (result) {
		case 'item added successfully':
			console.log('Item added successfully');
			break;
		case 'item could not be added':
			console.log('There was an error adding the item. Please try again later.');
			break;
	}
}

// testPurchaseItem();
testAddItemToSeller();