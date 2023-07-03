//Dropdown-effect
//This tells us that a jQuery operation is about to happen to the element with the class of card, the hover function is used so that we can hover over so as to expand the card
$('.cards').hover(function () {
    //This gets the index of each card
    let index = $(this).index()
    //This is to select the card
    let currCard = $('.cards').eq(index)
    //This is to select the body of the card
    let currBody = $(`.cards:eq(${index}) .card-body`)
    //This allows for it to slide up when the cursor is not on it
    if (currBody.css('display') == 'block') {
        currBody.slideUp()
    } //This allows it to slide down when hovered over
    else {
        $('.card-body').slideUp()
        currBody.slideDown()
    }
});
//Chained effect
$(document).ready(function () {
    //This selects the element and tells us that when the p elements are clicked something should happen
    $("p").click(function () {
        //This changes the color and slides of the element p up and down
        $("p").css("color", "grey").slideUp(2000).slideDown(2000);
    });
    //This animates the images 
    $("img").click(function () {
        $("img").animate({width: "300px", height: "350px"})
    });
});
//This selects all the addToCart button
let btn = document.querySelectorAll('.addToCart')
//Create an empty array that we will use to store all the product info.
let products = []
//Using for Loop to loop through each of the buttons
for (let i = 0; i < btn.length; i++) {
    let cartBotton = btn[i]
    //added event listener
    cartBotton.addEventListener('click', () => {
        //Getting the image,name,price,totalPrice to be saved in the local storage
        let product = {
            image: event.target.parentElement.parentElement.children[0].children[0].src,
            name: event.target.parentElement.parentElement.children[1].children[0].textContent,
            price: event.target.parentElement.parentElement.children[1].children[2].textContent,
            totalPrice: parseInt(event.target.parentElement.parentElement.children[1].children[2].children[0].textContent),
            quantity: 1

        } 
        addItemToLocal(product);
    })
}
//Saving to Local Storage
function addItemToLocal(product) {
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    if (cartItem === null) {
        products.push(product)
    } else {
        cartItem.forEach(item => {
            if (product.name == item.name) {
                product.quantity = item.quantity += 1;
                product.totalPrice = item.totalPrice += product.totalPrice;
            } else {
                products.push(item)
            }
        });
        //Pushing each products to the array
        products.push(product)
    }
    //setting the items in the localstorage
    localStorage.setItem('prdInCart', JSON.stringify(products))
    window.location.reload()
}
//To display the products in the cart page
function dispCartItem() {
    //setting html to an empty string so we can save each product details in it 
    let html = ' ';
    //Gets the item from the array when each button is clicked
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    //for each items clicked it is displayed in the cart page like this
    cartItem.forEach(item => {
        html += `
        <div class="card w-100 container d-flex justify-content-center">
        <section class="block">
            <section>
                <img src = "${item.image}" alt="">
            </section>
            <section class="info">
                <h4>${item.name}</h4>
                <h5>${item.price}</h5>
                <p>Quantity: ${item.quantity}</p>
                <p>R${item.totalPrice}</p>
                <button class='removeItem'>Remove</button>
            </section>
        </section>
        </div>
        `
    });
    //appending it to the html
    document.querySelector('.cartDisplay').innerHTML = html;
}
dispCartItem()
//Displaying of cartNumber 
function cartNumberDisplay() {
    //setting the intial number to 0
    let cartNumber = 0
    //gets each items when clicked and adds it to the cartNumber
    let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
    cartItem.forEach(item => {
        cartNumber = item.quantity += cartNumber;
    });
    //This allows it to display next to the cart
    document.querySelector('.nav span').textContent = cartNumber;
}
cartNumberDisplay()

//To remove items from the cart
let remove = document.getElementsByClassName('removeItem')
//loop through each button
for (let i = 0; i < remove.length; i++) {
    let removeBtn = remove[i]
    //when clicked it gets the item and delete it from the local storage
    removeBtn.addEventListener('click', () => {
        let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
        cartItem.forEach(item => {
            if (item.name != event.target.parentElement.parentElement.children[1].children[0].textContent) {
                products.push(item);
            }
        })
        localStorage.setItem('prdInCart', JSON.stringify(products))
        window.location.reload()
    })
}
//assigning and declaring values
let subTotal = 0;
let tax = 0;
let total= 0;
//gets each item price and adds it
let cartItem = JSON.parse(localStorage.getItem('prdInCart'))
cartItem.forEach(item => {
    subTotal = item.totalPrice += subTotal
    //This is used to calculate the tax and to round it to two decimal number
    tax = Math.round(((subTotal * 5) / 100) * 100) / 100

    total = subTotal + tax
});
//This alerts the total
function alertSubtotal() {
    alert(subTotal)
}
//This displays the values
document.querySelector('.priceView').textContent = `R${subTotal}`
document.querySelector('.taxPreview').textContent = `R${tax}`
document.querySelector('.totalPreview').textContent = `R${total}`

//This is used to calculate the discount code
//The button with the class discount is selected and onced clicked the value placed into the input will be check, if it corresponds with the value here, the discount will be applied
document.querySelector('.discount').addEventListener('click', applyDiscount)

function applyDiscount() {
    let discountCode = document.querySelector('.discountValue').value.toLowerCase();
    if (discountCode === 'praise50') {
        total = total - 200
        //displays the total after discount is applied
        document.querySelector('.totalPreview').textContent = `R${total}`
        alert('Discount Code Applied')
    }
    //or the total stays the same if the value is not correct
    else {
        alert('TRY AGAIN! Valid Code is Praise50')
    }
}

//A function which contains showing/hiding to display the delivery options 
//This selects where we want the change to happen, and also what we want to do.
$("#seeAnotherField").change(function () {
    //when the selected has this value, we want it to show the other form
    if ($(this).val() == "00") {
        $('#otherFieldDiv').show();
        //if selected this would hide the form
    } else {
        $('#otherFieldDiv').hide();
    }
});
$("#seeAnotherField").trigger("change");

//This is used to change the delivery prices based on what option is selected 
function change() {
    //get the selected
    let delivery = parseInt(document.querySelector("#otherField").value);
    let price = total + delivery;
    //displays the value
    document.querySelector(".totalPreview").textContent = `R${price}`;
}
//This is used to change the delivery prices based on what option is selected 
function changeMe() {
    //get the selected
    var collectionOrDelivery = parseInt(document.querySelector('#seeAnotherField').value);
    var price = total + collectionOrDelivery
    //displays the value
    document.querySelector(".totalPreview").textContent = `R${price}`;
}

//When the button is clicked a random number is created for the reference
document.querySelector('.confirm').addEventListener('click', confirmOrder)

function confirmOrder() {
    alert(`Your Order is successful and the Order number is ${(Math.floor(Math.random()*100))}`)
    document.querySelector('.confirm').removeEventListener("click", confirmOrder);
}