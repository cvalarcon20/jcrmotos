
const CAR_PRODUCT = "cartProdcutsId";

document.addEventListener("DOMContentLoaded",() => {
loadProductsCub();
loadProductsChop();
});

function getProductsCubDb() {
   const url = "./dbMotosCub.json";
   
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

function getProductsChopDb() {
    const url = "../dbMotosChop.json";
    
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
                <button type="button" class=""btn btn-primary btn-cart">Comprar</button>
            </div>
        </div>
      </div>
      `;  
});

document.getElementsByClassName("products")[0].innerHTML = html;

}


async function loadProductsChop(){
    const products = await getProductsChopDb();
    
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
                    <button type="button" class=""btn btn-primary btn-cart">Comprar</button>
                </div>
            </div>
          </div>
          `;  
    });
    
    document.getElementsByClassName("productschop")[0].innerHTML = html;
    
    }


function openCloseCart() {

    const containerCartProducts = document.getElementsByClassName("cart-products")[0];
    
    containerCartProducts
}
