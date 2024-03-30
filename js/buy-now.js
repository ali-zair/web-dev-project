const buyerDetailsForm = document.querySelector("#buyerDetailsForm");
const addOrder = document.querySelector("#addOrder");

document.addEventListener("DOMContentLoaded", showBuyerDetailsForm);

let users = [];
let items = [];

buyerDetailsForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const purchaseDetails = {
    orderNo: Math.floor(Math.random() * 1000000),
    itemId: parseInt(localStorage.getItem("itemID")),
    shippingAddress: buyerDetailsForm.querySelector("#shippingAddress").value,
    quantity: parseInt(buyerDetailsForm.querySelector("#quantity").value),
    date: new Date(Date.now()).toISOString(),
    shippingType: buyerDetailsForm.querySelector("#shippingType").value,
  };

  if (!localStorage.users) {
    const usersData = await fetch("js/data/users.json");
    users = await usersData.json();
  } else {
    users = JSON.parse(localStorage.users);
  }

  if (!localStorage.items) {
    const itemsData = await fetch("js/data/items.json");
    items = await itemsData.json();
  } else {
    items = JSON.parse(localStorage.items);
  }

  // debugger;
  const item = items.find(
    (item) => item.id === parseInt(localStorage.getItem("itemID"))
  );
  const user = users.find(
    (user) => user.uid === parseInt(localStorage.getItem("loggedInUser"))
  );
  const itemPrice = parseInt(item.price);
  const itemQuantity = parseInt(purchaseDetails.quantity);
  if (itemPrice * itemQuantity > user.balance) {
    alert("Insufficient funds");
  } else {
    if (itemQuantity > item.quantity) {
      alert("Insufficient stock");
    } else {
      item.quantity -= itemQuantity;
      items.splice(
        items.findIndex(
          (item) => item.id === parseInt(localStorage.getItem("itemID"))
        ),
        1,
        item
      );
      localStorage.items = JSON.stringify(items);
      const seller = users.find(
        (user) => user.itemsOwned && user.itemsOwned.includes(item.id)
      );
      seller.bankAccount.balance += itemPrice * itemQuantity;
      users.splice(
        users.findIndex((user) => user.uid === seller.uid),
        1,
        seller
      );
      user.balance -= itemPrice * itemQuantity;
      user.itemsPurchased.push(purchaseDetails);
      users.splice(
        users.findIndex(
          (user) => user.uid === parseInt(localStorage.getItem("loggedInUser"))
        ),
        1,
        user
      );
      localStorage.users = JSON.stringify(users);
      console.log(items);
      console.log(users);
      alert("Order placed successfully");
      // window.location.href = "/home.html";
    }
  }
  console.log(purchaseDetails);
});

async function showBuyerDetailsForm() {
  const itemsData = await fetch("js/data/items.json");
  items = await itemsData.json();
  const item = items.find((item) => item.id == localStorage.getItem("itemID"));
  buyerDetailsForm.innerHTML = buyersDetailsFormToHTML(item);
}

function buyersDetailsFormToHTML(item) {
  return `<h1>Buy Now!</h1>
          <label>Item: ${item.title}</label>
          <label for="shippingAddress">Shipping Address: </label>
          <input type="text" id="shippingAddress" required/>
          <label for="quantity">Quantity: </label>
          <input type="number" name="quantity" id="quantity" required/>
          <label for="shippingType">Shipping Type: </label>
          <select name="shippingType" id="shippingType">
            <option value="standard">Standard</option>
            <option value="express">Express</option>
            <option value="priorityMail">Priority Mail</option>
          </select>
          <label> Price of each: $${item.price}</label>
          <button type="submit" id="addOrder">Place Order</button>`;
}
