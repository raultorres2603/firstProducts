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
  if (localStorage.getItem("products")) {
    products = JSON.parse(localStorage.getItem("products"));
    console.log("Existe el localStorage");
    drawProds();
  } else {
    console.log("No existe el localStorage");
    localStorage.setItem("products", JSON.stringify(products));
    drawProds();
  }

  document.getElementById("formProd").addEventListener("submit", (evForm) => {
    evForm.preventDefault();
    console.log(evForm.target.elements);
    products.push([
      evForm.target.elements.productName.value,
      evForm.target.elements.price.value,
      evForm.target.elements.image.value,
    ]);
    localStorage.setItem("products", JSON.stringify(products));
    console.log(products);
    drawProds();
  });
});

function drawProds() {
  document.getElementById("productsAvail").innerHTML = "";
  for (let i = 0; i < products.length; i++) {
    const product = products[i];
    let contenedor = `<div class="card" style="height:auto; width:25%;">
    <img src="${product[2]}" data-valueprod="${i}" class="card-img-top imgProduct" style="height:auto; width:100%;" alt="...">
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

  document.querySelectorAll(".imgProduct").forEach((element, key, parent) => {
    console.log(element);
    console.log(key);
    element.addEventListener("click", (ev) => {
      addCart(ev.target.dataset.valueprod);
    });
  });
}

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
    eliminate.innerHTML = `<button type="button" onclick="eliminateProd(${i})" class="btn btn-danger">X</button>    `;
    total += product[1];
    document.getElementById("total").innerHTML = `Pedido (T: ${total}€)`;
  }
}

function eliminateProd(position) {
  cart.splice(position, 1);
  draw();
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
  quitCell.addEventListener("click", (ev) => {
    eliminateProd(row);
  });

  /* Append on table */
  //tableBody.appendChild(row);
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
