const cartIcon = document.querySelector(".fa-cart-shopping")
const cartBox = document.querySelector(".cartBox")
const checkOut = document.querySelector(".checkout")

cartIcon.addEventListener("click",function (params) {
    cartBox.classList.add("openCart")
  
})

checkOut.addEventListener("click",function (params) {
    cartBox.classList.remove("openCart")
    
})



const productStoreArray = []

document.addEventListener("DOMContentLoaded", loadContent)
function loadContent(params) {
    const trashIcon = document.querySelectorAll(".fa-trash")
trashIcon.forEach(function name(trash) {
    trash.addEventListener("click", trashproduct)    
})

   const productNos = document.querySelectorAll(".productNos")
productNos.forEach(function (input) {
    input.addEventListener("change",negative)
    
})
totalCount()   
}


function trashproduct (params) {
    const removeTrashProduct = this.parentNode
    removeTrashProduct.remove()

    const removeNotify=document.querySelector(".productRemoveNotify")
       removeNotify.style.opacity = 1
       removeNotify.style.zIndex = 10


       setTimeout(() => {
        removeNotify.style.opacity = 0
        removeNotify.style.zIndex = -1
       }, 2000);

    const removeProductName = removeTrashProduct.querySelector(".productName").innerText
    console.log(removeProductName);

    const findRemoveTrashIndex = productStoreArray.findIndex(function (products) {
        return products.itemsName === removeProductName
    })
    console.log(findRemoveTrashIndex);
    
    productStoreArray.splice(findRemoveTrashIndex,1)
    console.log(productStoreArray);
    loadContent()
}


function negative(params) {
    if(this.value<1){
        this.value=1
    }
loadContent()
}


const cartbtn = document.querySelectorAll(".cart-btn")
cartbtn.forEach(function (btn) {
    btn.addEventListener("click",getProductDetail)  
})

function getProductDetail(params) {
    const items = this.parentNode.parentNode
    // console.log(items);
    

    const itemsName = items.querySelector(".prname").innerText
    const itemsImage = items.querySelector(".productavailable img").src
    const itemsPrice = items.querySelector(".prprice").innerText
    console.log(itemsName,itemsImage,itemsPrice);

    const productObject = {itemsName}
    console.log(productObject);
    const productIndex = productStoreArray.findIndex(function (product) {
      return product.itemsName === itemsName
    })
    console.log(productIndex);

    if(productIndex<0){
       productStoreArray.push(productObject)
       const addNotify=document.querySelector(".productAddNotify")
       addNotify.style.opacity = 1
       addNotify.style.zIndex = 10


       setTimeout(() => {
        addNotify.style.opacity = 0
        addNotify.style.zIndex = -1
       }, 2000);
    }
    else{
       alert("Product is already added to Cart")
       return;
       
    }
    console.log(productStoreArray);
    

    const createDiv = document.createElement("div")
    console.log(createDiv);
    createDiv.innerHTML= putProductInfo(itemsImage,itemsName,itemsPrice)

    const cartBox=document.querySelector(".cart-product-hold")
    cartBox.appendChild(createDiv)
    loadContent()
}

function putProductInfo(image,name,price) {
    return `
    <div class="cartProducts">
            <img src="${image}" alt="">
            <div class="cProductinfo">
                <h1 class="productName">${name}</h1>
                <h1 class="productPrice">${price}</h1>
                <div class="product-count"> <input type="number" name="" class="productNos" id=""  value="1"> 
                <h2 class="totalProductPrice"></h2></div>
            </div>
            <i class="fa-solid fa-trash"></i>
        </div> `
}

function totalCount(params) {
    const cartProduct = document.querySelectorAll(".cartProducts")
    console.log(cartProduct);
    
    var total=0
    cartProduct.forEach(function (Cproducts) {
        const productPrice = Cproducts.querySelector(".productPrice").innerText.replace("$"," ")
        const productCount = Cproducts.querySelector(".productNos").value
        const productPriceTotal = Cproducts.querySelector(".totalProductPrice")

        productPriceTotal.innerText = "$"+productPrice*productCount
        console.log(productPrice,productCount,productPriceTotal);
        
        total += (productPrice*productCount)
        console.log(total);
        
    })

    const cartTotal = document.querySelector(".total-amount")
    cartTotal.innerText="$."+total  


    const cartNotify = document.querySelector(".cartNotify")
    cartNotify.innerText= productStoreArray.length

    if(productStoreArray.length==0){
        cartNotify.style.opacity=0
    }
    else{
        cartNotify.style.opacity=1
        cartNotify.innerText=productStoreArray.length
    }

    const cartEmpty=document.querySelector(".cart-empty")
    if(productStoreArray.length==0){
        cartEmpty.style.height=200
    }
    else{
        cartEmpty.style.height=0
    }
}