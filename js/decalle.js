
const CAR_PRODUCT = "cartProdcutsId";

document.addEventListener("DOMContentLoaded",() => {
loadProductsCub();
});

function getProductsCubDb() {
   const url = "./json/dbMotosDecalle.json";
   
   return fetch (url)
    .then(response => {
    return response.json();
   })
    .then(result => {
    return result;
    })
    .catch(err => {
     console.log(err);
    });
}

async function loadProductsCub(){
const products = await getProductsCubDb();

let html ="";
products.forEach(product => {

    html += `
      <div class="col-lg-3 col-md-6 col-sm-12 product-container">
        <div class="card product">
            <img
                src="${product.image}"
                class="card-img-top"
                alt="${product.brand}"
            />
            <div class="card-body">
                <h5 class="card-title">${product.brand} - ${product.model}</h5>
                 <p class="card-text">${product.extraInfo}</p>
                <p class="card-text">U$D ${product.price}</p>
                <button type="button" class="btn btn-outline-primary text-white">Comprar</button>
            </div>
        </div>
      </div>
      `;  
});

document.getElementsByClassName("products")[0].innerHTML = html;

}



function openCloseCart() {
   const btnCart = document.getElementsByClassName("cart-products")[0];
   console.log(btnCart);
}