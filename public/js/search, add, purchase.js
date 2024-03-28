const items = [
  {
    title: "lemur1",
    note: "best everyday use1",
    features: ["good1", "ultra 7 cpu1", "whatever1"],
    extra_details: "made out of aluminum1 ",
    price: 1200,
    purchased: false,
  },
  {
    title: "lemur2",
    note: "best everyday use2",
    features: ["good2", "ultra 7 cpu2", "whatever2"],
    extra_details: "made out of aluminum2 ",
    price: 1300,
    purchased: false,
  },
  {
    title: "n3",
    note: "best everyday use3",
    features: ["good3", "ultra 7 cpu3", "whatever3"],
    extra_details: "made out of aluminum3 ",
    price: 1350,
    purchased: false,
  },
  {
    title: "l4",
    note: "best everyday use4",
    features: ["good4", "ultra 7 cpu4", "whatever4"],
    extra_details: "made out of aluminum4 ",
    price: 1450,
    purchased: false,
  },
  {
    title: "e5",
    note: "best everyday use5",
    features: ["good5", "ultra 7 cpu5", "whatever5"],
    extra_details: "made out of aluminum5 ",
    price: 1650,
    purchased: false,
  },
];
function line() {
  console.log(
    "---------------------------------------------------------------------------------"
  );
}
function find(search_term) {
  return items.filter((item) =>
    item.title.toLowerCase().includes(search_term.toLowerCase())
  );
}

function addItem(title, note, features, extra_details, price) {
  //can't be ourchased when added so we just set it as false by default
  //in documentation, check if logged in
  const newItem = {
    title,
    note,
    features,
    extra_details,
    price,
    purchased: false,
  };
  items.push(newItem);
}
function removeItem(title) {
  //should add id as an attribute after making a function to randomly generate it, more suitable than title which could be duplicated
  const index = items.findIndex(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  if (index !== -1) {
    items.splice(index, 1);
  }
}
function purchaseItem(title) {
  //maybe should be added to cart, since it is only purchesed after deducting money from customer
  //check balance , change in DOM
  const index = items.findIndex(
    (item) => item.title.toLowerCase() === title.toLowerCase()
  );
  items[index].purchased = !items[index].purchased;
}
addItem(
  "New Product",
  "Note about the new product",
  ["Feature 1", "Feature 2"],
  "New extra details",
  12344
);
addItem(
  "Product2",
  "Note about the new product",
  ["Feature 1", "Feature 2"],
  " extra details",
  1233
);
line();
console.log(find("l"));
line();
line();
console.log(items);
line();
line();
removeItem("Product2");
line();
line();
console.log(items);
line();
line();
purchaseItem("lemur1");
console.log(items);
