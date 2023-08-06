// array of all three options
const product_option = document.getElementsByClassName("product-options");

// array of select input tags for sizes and color
const product_details = document.getElementsByClassName("product-details");

// total price of the selected product
const total = document.getElementById("total");

// three product's detials
const radio = document.getElementsByName("radio");
const price = document.getElementsByClassName("price");
const pairs_count = document.getElementsByClassName("pairs-count");
const discount = document.getElementsByClassName("discount");

// add to cart button
const cart_btn = document.getElementById("cart-btn");

// displaying total price
total.innerHTML = 0.00;

// to store data of selected option
let data = { pair: "", price: "", discount: "" };

// change event for radio inputs
const handleChangeEvent = () => {
    for (let i = 0; i < radio.length; i++) {
        product_option[i].classList.remove("product-selected");
        product_details[i].innerHTML = " ";
        if (radio[i].checked) {
            console.log(price[i].childNodes[0])
            product_option[i].classList.add("product-selected");
            
            product_details[i].innerHTML = addProductDetails();
            total.innerHTML = price[i].childNodes[0].nodeValue;
            let disc = i == 1 ? discount[i].children[1].textContent : discount[i].innerHTML;
            data = { pair: pairs_count[i].innerHTML, price: price[i].childNodes[0].nodeValue, discount: disc};
        }
    }
}

radio.forEach(input => {
    input.addEventListener('change', handleChangeEvent);
});


// adding the table of colors & sizes select inputs dynamically
const addProductDetails = () => {
    let str = "";
    str += `
        <div class="row1">
            <p class="index"></p>
            <p class="size">size</p>
            <p class="color">color</p>
        </div>
        <div class="row2">
            <p class="index">#1</p>
            <select class="size-input">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
            </select>
            <select class="clr-input">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="Green">Green</option>
            </select>
        </div>
        <div class="row3">
            <p class="index">#2</p>
            <select class="size-input">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
            </select>
            <select class="clr-input">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="Green">Green</option>
            </select>
        </div>
    `
    return str;
}

// click event on addTocart button and displaying the data selected
cart_btn.addEventListener('click', () => {
    console.log(data)
    let str = "";
    if (radio[0].checked || radio[1].checked || radio[2].checked) {
        let success_msg = document.getElementById("success-msg");
        
        str += `<p>Product added to cart</p>
                <p>Details:</p>
                <hr/>
                <p>${data.pair} </p>
                <p>Price : ${data.price} with <b>${data.discount}</b></p>`
        success_msg.innerHTML = str;

        // adding animated text for 3s displaying data
        success_msg.classList.add('show');
        setTimeout(function () { success_msg.className = success_msg.className.replace("show", ""); }, 3000);
    }
    else {
        alert("please select a product to add")
    }
})