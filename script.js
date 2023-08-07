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



// to store data of selected option
let data = { pair: "", price: "", discount: "" };

// change event for radio inputs
const handleChangeEvent = () => {

    product_option[2].classList.remove("product-selected");
    product_details[2].innerHTML = " ";
    product_option[0].style.top = "19.215rem";
    product_option[1].style.top = "28.434rem";
    product_option[2].style.top = "37.653rem";

    for (let i = 0; i < radio.length; i++) {
        product_option[i].classList.remove("product-selected");
        product_details[i].innerHTML = " ";
        if (radio[i].checked) {
            product_option[i].classList.add("product-selected");
            product_details[i].innerHTML = addProductDetails();
            if (i == 0) {
                product_option[i + 1].style.top = "37.201rem";
                product_option[i + 2].style.top = "46.42rem";
            }
            if (i == 1) {
                product_option[i + 1].style.top = "46.42rem";
            }
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
            <p class="size">size</p>
            <p class="color">color</p>

            <p class="index1">#1</p>
            <select class="size-input1 sizes">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
            </select>
            <select class="clr-input1 colors">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="Green">Green</option>
            </select>

            <p class="index2">#2</p>
            <select class="size-input2 sizes">
                <option value="s">S</option>
                <option value="m">M</option>
                <option value="l">L</option>
            </select>
            <select class="clr-input2 colors">
                <option value="red">Red</option>
                <option value="blue">Blue</option>
                <option value="Green">Green</option>
            </select>
    `
    return str;
}

product_details[1].innerHTML = addProductDetails();

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