
const CAR_PRODUCT = "cartProdcutsId";

document.addEventListener("DOMContentLoaded",() => {
loadProductsDecalle();
});

function getProductsDecaDb() {
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

async function loadProductsDecalle(){
const products = await getProductsDecaDb();

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
                <button type="button" class="btn btn-outline-primary text-white" onClick=(addProductCart(${product.id}))>Comprar</button>
            </div>
        </div>
      </div>
      `;  
});

//document.getElementsByClassName("products")[0].innerHTML = html;
$(".products")[0].innerHTML = html; //jquery

}


function openCloseCart() {
   
    const containerCart = document.getElementsByClassName("cart-products")[0];
 
    containerCart.classList.forEach(item => {
         if(item ==="hidden"){
             containerCart.classList.remove("hidden");
             containerCart.classList.add("active");
         }
         if(item ==="active"){
             containerCart.classList.remove("active");
             containerCart.classList.add("hidden");
         }
    });
 }
 
 
 function addProductCart(idProduct){
     let arrayProductsId = [];
 
     let localStorageItems = localStorage.getItem(CAR_PRODUCT);
     
     if(localStorageItems === null){
         arrayProductsId.push(idProduct);
         localStorage.setItem(CAR_PRODUCT,arrayProductsId);
     }else{
         let productsId = localStorage.getItem(CAR_PRODUCT);
         if(productsId.length > 0 ){
             productsId += "," + idProduct;
         }else {
         productsId = productId;
         }
         localStorage.setItem(CAR_PRODUCT,productsId);
     }    
 }

 $("body").prepend('<h5>Motos - De Calle/Naked</h5>');
 $("h5").fadeOut("slow",function(){
 $("h5").fadeIn(1000);
 });
 
 
 $("h5").css("background-color","grey");
 $("h5").css("text-align","center");
 $("h5").css("padding-top","5.3em");
 