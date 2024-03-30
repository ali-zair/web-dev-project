const showDetails = document.querySelector("#item-details");

document.addEventListener("DOMContentLoaded", showDetails);

async function showDetails() {
  const itemsData = await fetch("js/data/items.json");
  const items = await itemsData.json();
  const item = items.find((item) => item.id == localStorage.getItem("itemID"));
  showDetails.innerHTML = handleShowDetails(item);
  console.log("something man slauter");
}

function handleShowDetails(item) {
  return `<div class="item" data-id="${item.id}" data-thumbnail="${
    item.thumbnail
  }" data-title="${item.title}" data-note="${
    item.note
  }" data-features="${JSON.stringify(item.features)}" data-price="${
    item.price
  }" data-quantity="${item.quantity}" data-extra-details="${item.extraDetails}">
            <figure>
              <img src="${item.thumbnail}" alt="Image of ${item.title} Laptop">
            </figure>
            <p>${item.title}</p>
            <p class="best-for">${item.note}</p>
            <p class="note">Notable Features: </p>
            <p class="features">${item.features[0]}</p>
            <p class="features">${item.features[1]}</p>
            <p class="features">${item.features[2]}</p>
            <p class="features">${item.features[3]}</p>
            <p class="price">$${item.price}</p>
            <p class="extraDetails">${item.extraDetails}</p>
            <button>Buy Now!</button>
        </div>`;
}
showDetails();
