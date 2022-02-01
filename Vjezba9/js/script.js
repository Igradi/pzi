// Prikaži/sakrij shopping menu s desne strane dodavanjem/brisanjem klase "active"
document.getElementById("shopping").addEventListener("click", () => {
  document.getElementById("shopping-side-menu").classList.toggle("active");
});

let counter = 0; // Inicijalno postavi brojač na nula
document.getElementById("shopping-count").innerText = counter;

// Funkcija koja inkrementira brojač
function setCount() {
  let totalCount = 0;
  const allPizzasInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < allPizzasInShop.length; i++) {
    const pizzaInShop = allPizzasInShop[i];

    const amount = pizzaInShop.querySelector(".amount").textContent;
    totalCount += +amount;
  }
  document.getElementById("shopping-count").innerText = totalCount;
}

// Dodaj klik "slušač" na crvene button-e za narudžbe pizza
const buttons = document.querySelectorAll("#pizze button.red");
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", onOrderButtonClick);
}

// Poziva se na klik crvenog button-a
function onOrderButtonClick(event) {
  const clickedButtonElement = event.currentTarget; // Dohvaćanje kliknutog elementa
  const articleElement = clickedButtonElement.parentElement; // Dohvati "roditelj element" od kliknutnog elementa

  const pizzaName = articleElement.querySelector("h3").innerText;
  const pizzaPrice = articleElement.querySelector("small em").innerText;

  const pizzaCardInShop = document.getElementById(pizzaName.toLowerCase());
  console.log(pizzaCardInShop);
  if (pizzaCardInShop) {
    const currentAmountElement = pizzaCardInShop.querySelector(".amount");
    let amount = parseInt(currentAmountElement.textContent);
    currentAmountElement.innerText = ++amount;
    pizzaCardInShop.querySelector(".minus").disabled = false;
  } else {
    createShopItem(pizzaName, pizzaPrice); // Dodaj pizzu u košaricu
  }

  setCount(); // Uvećaj brojač

  calculateTotalPrice();

}

// Funkcija koja kreira pizza "karticu" u košarici prema imenu i cijeni pizze
function createShopItem(name, price) {
  const shopItem = document.createElement("article"); // Prvo kreiraj prazan element: <article></article>
  shopItem.classList.add("shopping-item"); // Dodaj mu klasu: <article class="shopping-item"></article>
  shopItem.id = name.toLowerCase();

  // Ubaci u <article> element ostale HTML elemente
  shopItem.innerHTML = `
    <i class="fas fa-times close"></i>
    <h3>${name}</h3>
    <div class="item-info">
      <small>Cijena:</small>
      <strong class="price">${price}</strong>
    </div>
    <div class="item-info">
      <small>Količina:</small>
      <div class="amount-box">
        <button class="minus" disabled><i class="fas fa-minus"></i></button>
        <strong class="amount">1</strong>
        <button class="plus"><i class="fas fa-plus"></i></button>
      </div>
    </div>`;

  // Dodaj novokreirani <article> element (sa svim svojim sadržajem) unutar "#shopping-items" elementa
  document.getElementById("shopping-items").append(shopItem);

  shopItem.querySelector(".close").addEventListener("click", onDeleteShopItem);

  shopItem.querySelector(".plus").addEventListener("click", onPlusClick);

  shopItem.querySelector(".minus").addEventListener("click", onMinusClick);

}
function calculateTotalPrice() {
  let totalPrice = 0;
  const allPizzasInShop = document.querySelectorAll(".shopping-item");
  for (let i = 0; i < allPizzasInShop.length; i++) {
    const pizzaInShop = allPizzasInShop[i];

    const amount = pizzaInShop.querySelector(".amount").textContent;
    const price = pizzaInShop.querySelector(".price").textContent;
    const onlyPrice = price.split(" ")[0];

    const umnozak = parseInt(amount) * parseFloat(onlyPrice);

    totalPrice += umnozak;
  }
  document.querySelector("#total-price strong").innerText = totalPrice.toFixed(2) + " kn";
}

function onDeleteShopItem(event) {
  const clickedX = event.currentTarget;
  const itemInShop = clickedX.parentElement;
  itemInShop.remove();

  calculateTotalPrice();
  setCount();
}

function onPlusClick(event) {
  const clickedPlus = event.currentTarget;
  const itemInShop = clickedPlus.parentElement;
  let amount = parseInt(itemInShop.querySelector(".amount").textContent);

  amount += 1;

  itemInShop.querySelector(".amount").textContent = amount;
  itemInShop.querySelector(".minus").disabled = false;
  calculateTotalPrice();
  setCount();
}

function onMinusClick(event) {
  const clickedMinus = event.currentTarget;
  const itemInShop = clickedMinus.parentElement;
  let amount = parseInt(itemInShop.querySelector(".amount").textContent);

  if (amount - 1 > 1) {
    amount -= 1;
    itemInShop.querySelector(".amount").textContent = amount;
  }
  else if (amount - 1 == 1) {
    amount -= 1;
    itemInShop.querySelector(".amount").textContent = amount;
    itemInShop.querySelector(".minus").disabled = true;
  }
  calculateTotalPrice();
  setCount();
}