
const CART_PRODUCT = "cartProductsId";

document.addEventListener("DOMContentLoaded",() => {
loadProductsCub();
loadProductCart();
});

function getProductsCubDb() {
   const url = "./json/dbMotosCub.json";
   
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
                <button type="button" class="btn btn-outline-primary text-white" onClick=(addProductCart(${product.id})) >Comprar</button>
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

    let localStorageItems = localStorage.getItem(CART_PRODUCT);
    
    if(localStorageItems === null){
        arrayProductsId.push(idProduct);
        localStorage.setItem(CART_PRODUCT,arrayProductsId);
    }else{
        let productsId = localStorage.getItem(CART_PRODUCT);
        if(productsId.length > 0 ){
            productsId += "," + idProduct;
        }else {
            productsId = productId;
        }
        localStorage.setItem(CART_PRODUCT,productsId);
    }    

    loadProductCart();
}

$("body").prepend('<h5>Motos - CUB</h5>');
$("h5").fadeOut("slow",function(){
$("h5").fadeIn(1000);
});


$("h5").css("background-color","grey");
$("h5").css("text-align","center");
$("h5").css("padding-top","5.3em");

async  function loadProductCart(){
    const products = await getProductsCubDb();

// paso de LocalStorage a un array
    const localStorageItems = localStorage.getItem(CART_PRODUCT);
    let html = "";

    if(!localStorageItems){
        html=`
            <div class="cart-product empty"> 
            <p>Carrito vacío. </p>
            </div>
        `;
    }else {

    const idProductsSplit = localStorageItems.split(',');

// Eliminamos los id duplicados
    const idProductCart = Array.from(new Set(idProductsSplit));
 

    idProductCart.forEach(id => {
        products.forEach(product => {
            if(id == product.id) {
                const quantity = countDuplicatesId(id,idProductsSplit);
                const totalPrice = product.price * quantity;

                html += `

                <div class="cart-product">
                    <img src="${product.image}"  alt="${product.model}" />
                    <div class="cart-product-info">
                        <span class="quantity">${quantity}</span>
                        <p>${product. brand}</p>
                        <p>${product.model}</p>
                        <p>USD ${totalPrice.toFixed(2)}</p>
                        <p class="change-quantity">
                            <button class="text-white" onClick=(decreaceQuantity(${product.id}))>-</button>
                            <button class="text-white" onClick=(increaseQuantity(${product.id}))>+</button>
                        </p>
                        <p class="cart-product-delete">
                        <button onClick=(deleteProductCart(${product.id}))>Eliminar</button>
                        </p>
                    </div>
                </div>
                `;  }

        });
    });

  }
    document.getElementsByClassName('cart-products')[0].innerHTML = html;
    
}


 function deleteProductCart(idProduct){
     const idProductsCart = localStorage.getItem(CART_PRODUCT);
     const arrayIdProductsCart = idProductsCart.split(',');
     const resultIdDelete = deleteAllIds(idProduct,arrayIdProductsCart);
   
     if(resultIdDelete){
         let count = 0 ;
         let idString = "";
        
         resultIdDelete.forEach(id => {
             count ++;
             if(count < resultIdDelete.length){
                 idString += id + ",";
             }else {
                 idString += id;
             }
         });
         localStorage.setItem(CART_PRODUCT, idString);
     }
     
    const idsLocalStorage = localStorage.getItem(CART_PRODUCT); 
     if (!idsLocalStorage){
         localStorage.removeItem(CART_PRODUCT);
     }
    loadProductCart(); 
 }


function increaseQuantity(idProduct){
    const idProductsCart = localStorage.getItem(CART_PRODUCT);
    const arrayIdProductsCart = idProductsCart.split(",");
    arrayIdProductsCart.push(idProduct);

    let count = 0 ;
    let idString = "";
    arrayIdProductsCart.forEach(id => {
        count ++;
        if(count < arrayIdProductsCart.length) {
            idString += id +",";
        }else {
            idString += id;
        } 
    });
    localStorage.setItem(CART_PRODUCT,idString);
    loadProductCart();

}


function decreaceQuantity(idProduct){
    const idProductsCart = localStorage.getItem(CART_PRODUCT);
    const arrayIdProductsCart = idProductsCart.split(",");

    const deleteItem = idProduct.toString();
    let index = arrayIdProductsCart.indexOf(deleteItem);
    if(index > -1) {
        arrayIdProductsCart.splice(index,1);
    }

    let count = 0 ;
    let idString = "";
    arrayIdProductsCart.forEach(id => {
        count ++;
        if(count < arrayIdProductsCart.length) {
            idString += id +",";
        }else {
            idString += id;
        } 
    });
    localStorage.setItem(CART_PRODUCT,idString);
    loadProductCart();
}




 function countDuplicatesId(value,arrayIds){
     let count = 0 ;
     arrayIds.forEach(id => {
         if(value == id) {
             count++;
         }
     });
     return count;

 }

 function deleteAllIds(id,arrayIds){
     return arrayIds.filter(itemId => {
         return itemId != id;
     });
 }