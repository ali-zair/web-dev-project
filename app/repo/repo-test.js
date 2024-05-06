import customersRepo from "./customers-repo.js"

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

testPurchaseItem();
