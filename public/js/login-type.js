const customerBtn = document.querySelector("#customerBtn");
const sellerBtn = document.querySelector("#sellerBtn");

customerBtn.addEventListener("click", () => (window.location.href = "/customers-login.html"));
sellerBtn.addEventListener("click", () => (window.location.href = "/sellers-login.html"));
