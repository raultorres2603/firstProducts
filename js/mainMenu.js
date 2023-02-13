var cart = new Array();

var products = [
  [
    "Hamburguesa de pollo",
    1.5,
    "https://cdn.cookmonkeys.es/recetas/medium/hamburguesa-de-pollo-1-13554.jpg",
  ],
  [
    "Filete empanado",
    2.2,
    "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhgMDVDS7IQlxrPcQ3or5KEfTl1CLcL1IolPayVxRa_yGFqZYhlLnfCaqmDOUYpLQ-16IaAWVwkQbXQTs45MtqUDf31GQFirliJ8b3sXS06t5PnzWA7s61v6P06ek_9DX6EH_pLmijCjhBotP0zHCAoOTbqw0-xUs8VYtYNGXRKTzAkFQnhasm5T-1G/s1200/Pollo-empanado-3.JPG",
  ],
];

window.addEventListener("load", (ev) => {
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let contenedor = `<div class="card" style="height:auto; width:25%;">
    <img src="${product[2]}" onclick="addCart(${i})" class="card-img-top" style="height:auto; width:100%;" alt="...">
    <div class="card-body">`;
    console.log(product);
    for (let j = 0; j < product.length - 1; j++) {
      const detailProduct = product[j];
      contenedor += `
      <p class="card-text">${detailProduct}</p>
        `;
    }
    contenedor += "</div></div>";
    document.getElementById("productsAvail").innerHTML += contenedor;
  }
});

function addCart(position) {
  // console.log("Position of product: " + position);
  cart.push(position);
  console.log(cart);
  draw();
}

function draw() {
  let table = document.getElementById("tableBody");
  let total = 0;
  table.innerHTML = "";
  for (let i = 0; i < cart.length; i++) {
    let position_product = cart[i];
    let product = products[position_product];
    console.log(product);
    let row = table.insertRow();
    let productName = row.insertCell();
    productName.innerHTML = product[0];
    let productPrice = row.insertCell();
    productPrice.innerHTML = product[1];
    let eliminate = row.insertCell();
    eliminate.innerHTML = `<button type="button" class="btn btn-danger">X</button>    `;
    total += product[1];
    document.getElementById("total").innerHTML = `Pedido (T: ${total}€)`;
  }
}

function insertProd() {
  let priceInput = document.getElementById("price");
  let productName = document.getElementById("products");
  let tableBody = document.getElementById("tableBody");

  /* Creation on HTML to put on table */
  let row = tableBody.insertRow();

  let productCell = row.insertCell();
  productCell.innerHTML = productName.value;

  let priceCell = row.insertCell();
  priceCell.innerHTML = priceInput.value;

  let quitCell = row.insertCell();

  let redButton = document.createElement("button");
  redButton.classList.add("btn", "btn-danger");
  redButton.innerHTML = `<i class="fa-solid fa-xmark"></i>`;
  quitCell.appendChild(redButton);
  quitCell.addEventListener("click", function () {
    eliminateProd(row);
  });

  /* Append on table */
  //tableBody.appendChild(row);
}

function eliminateProd(row) {
  row.remove();
}
function updatePrice(product) {
  let priceInput = document.getElementById("price");
  console.log(priceInput);

  /* Deppending of the product, price on input value */
  switch (product) {
    case "Hamburguesa de Pollo":
      priceInput.value = 1.0;
      break;

    case "Patatas fritas":
      priceInput.value = 1.2;

      break;
    case "Batido":
      priceInput.value = 3.2;

      break;
    default:
      priceInput.value = 0;
      break;
  }

  console.log(product);
}