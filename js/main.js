
var productname = document.getElementById("productName");
var productprice = document.getElementById("productPrice");
var productmodel = document.getElementById("productModel");
var productDec = document.getElementById("productDescription");
var AddProductBtn = document.getElementById("AddProductBtn");
var UpdateProductBtn = document.getElementById("UpdateProductBtn");
var productList = [];
var SearchArray = [];

if (localStorage.getItem("productList") == null) {
    productList = [];
} else {

    productList = JSON.parse(localStorage.getItem("productList"));

    DisplayProduct(productList);

}


function addproduct() {

    if (ValidateProductName() && ValidateProductPrice() && ValidateProductModel() == true) {
        var product = {
            name: productname.value,
            price: productprice.value,
            model: productmodel.value,
            desc: productDec.value
        }

        productList.push(product);
        clear();
        DisplayProduct(productList);
        localStorage.setItem("productList", JSON.stringify(productList));
    }
}

function clear() {

    productname.value = ""
    productprice.value = ""
    productmodel.value = ""
    productDec.value = ""
}

function DisplayProduct(products) {
    var blackbox = '';
    for (var i = 0; i < products.length; i++) {

        blackbox += `   <tr> 
        <td> ${i + 1}</td> 
        <td> ${products[i].Newname ? products[i].Newname : products[i].name}   </td> 
        <td> ${products[i].price} </td> 
        <td>${products[i].model} </td> 
        <td>${products[i].desc} </td> 
        <td><button onclick="UpdateProduct(${i})" class="btn btn-sm btn-warning">Update</button></td> 
        <td><button onclick="DeleteProduct(${i})" class="btn btn-sm btn-danger">Delete</button></td> 
      </tr>`

    }

    document.getElementById("tbody").innerHTML = blackbox
}

function DeleteProduct(productindex) {
    console.log(SearchArray, "hjagsd");
    if (SearchArray.length) {
        productList.splice(SearchArray[productindex].mainIndex, 1)

    } else {
        productList.splice(productindex, 1)

    }
    localStorage.setItem("productList", JSON.stringify(productList));
    DisplayProduct(productList)


}


var currentIndex;

function UpdateProduct(i) {

    AddProductBtn.classList.add("d-none");
    UpdateProductBtn.classList.replace("d-none", "d-block");

    productname.value = productList[i].name;
    productprice.value = productList[i].price;
    productmodel.value = productList[i].model;
    productDec.value = productList[i].desc;
    currentIndex = i;
}

function Update() {


    AddProductBtn.classList.replace("d-none", "d-block");
    UpdateProductBtn.classList.replace("d-block", "d-none");


    productList[currentIndex].name = productname.value;
    productList[currentIndex].price = productprice.value;
    productList[currentIndex].model = productmodel.value;
    productList[currentIndex].desc = productDec.value;

    localStorage.setItem("productList", JSON.stringify(productList));

    DisplayProduct(productList)

}





function search(item) {
    console.log(productList);
    SearchArray = []
    for (var i = 0; i < productList.length; i++) {

        if (productList[i].name.toLowerCase().includes(item.toLowerCase()) == true) {

            productList[i].Newname = productList[i].name.toLowerCase().replace(item.toLowerCase(), `<span class="text-danger">${item}</span>`);
            productList[i].mainIndex = i
            SearchArray.push(productList[i]);

        }

    }

    console.log(SearchArray);
    DisplayProduct(SearchArray)
}




function ValidateProductName() {

    var regex = /^[A-Z][a-z]{3,9}$/

    if (regex.test(productname.value) == true) {
        productname.style = "border:5px solid green";
        document.getElementById("wrongname").classList.add("d-none")
        return true;
    } else {

        productname.style = "border:5px solid red";
        document.getElementById("wrongname").classList.remove("d-none")
        return false;
    }


}

function ValidateProductPrice() {

    var regex = /^([1-9][0-9]{3,4}|100000)$/;

    if (regex.test(productprice.value)) {

        productprice.style = "border:5px solid green";
        document.getElementById("wrongprice").classList.add("d-none")
        return true;
    } else {
        productprice.style = "border:5px solid red";
        document.getElementById("wrongprice").classList.remove("d-none")
        return false;

    }




}

function ValidateProductModel() {
    var regex = /^(tv|mobile|laptop)$/;
    if (regex.test(productmodel.value)) {
        productmodel.style = "border:5px solid green";
        return true;
    } else {
        productmodel.style = "border:5px solid red";
        return false;
    }
}

function ValidateProductDescription() {
    var regex = /^(?:\S+\s+){119,}\S+$/
    if (regex.test(productDec.value)) {

        document.getElementById("wrongdesc").classList.add("d-none")

        return true;
    } else {

        productDec.style = "border:5px solid red";
        document.getElementById("wrongdesc").classList.remove("d-none")
        return false;
    }



}