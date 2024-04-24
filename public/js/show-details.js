const showDetails = document.querySelector(".item-details");
window.addEventListener("load", async () => {
  window.handleBuyNow = handleBuyNow;
});
document.addEventListener("DOMContentLoaded", displayDetails);

async function displayDetails() {
  const itemsData = await fetch("js/data/items.json");
  const items = await itemsData.json();
  const item1 = items.find((item) => item.id == localStorage.getItem("itemID"));

  showDetails.innerHTML = showDetailsToHtml(item1);
}

function showDetailsToHtml(item) {
  return `<div class="item" data-id="${item.id}" data-thumbnail="${
    item.thumbnail
  }" data-title="${item.title}" data-note="${
    item.note
  }" data-features="${JSON.stringify(item.features)}" data-price="${
    item.price
  }" data-quantity="${item.quantity}" data-extra-details="${
    item.extra_details
  }">
            <figure>
              <img src="${item.thumbnail}" alt="Image of ${item.title} Laptop">
            </figure>
            <h2>${item.title}</h2>
            <p class="best-for">${item.note}</p>
            <h3 class="note">Notable Features: </h3>
            <p class="features">${item.features[0]}</p>
            <p class="features">${item.features[1]}</p>
            <p class="features">${item.features[2]}</p>
            <p class="features">${item.features[3]}</p>
            <h3 class="price">Price: </h3>
            <p class="price">$${item.price}</p>
            <h3 class="extraDetails">Extra Details: </h3>
            <p class="extraDetails">${item.extra_details}</p>
        </div>`;
}

function handleBuyNow(id) {
  const item = items.find((item) => item.id === id);
  if (
    users.some(
      (user) =>
        user.uid !== undefined &&
        user.uid == localStorage.getItem("loggedInUser")
    )
  ) {
    localStorage.itemID = item.id;
    window.location.href = `/buy-now.html`;
  } else {
    alert("Please login to buy items!");
    window.location.href = "/login-type.html";
  }
}
