import sellersFunc from "./functionalities/sellers-func.js";

const addItemForm = document.querySelector("#addItemForm");

addItemForm.addEventListener("submit", async (e) => {
	e.preventDefault();
	const formData = new FormData(addItemForm);

	const item = {
		thumbnail: formData.get("thumbnail"),
		title: formData.get("title"),
		note: formData.get("note"),
		features: formData.get("features"),
		price: parseFloat(formData.get("price")),
		quantity: parseInt(formData.get("quantity")),
		extra_details: formData.get("extraDetails")
	};

	const sellerId = localStorage.sellerCookie.split(":")[0];
	const result = await sellersFunc.addItem(sellerId, item);

	switch (result) {
		case "item added successfully":
			alert("Item added successfully");
			break;
		case "item could not be added":
			alert("There was an error adding the item. Please try again later.");
			break;
	}

	addItemForm.reset();
	window.location.href = "/my-items.html";

});