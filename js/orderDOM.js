localStorage.getItem('restaurant');
let searchInput = document.getElementById('enter-food-name');
let menu = [
    {name: 'eba',   price: 500, category: 'swallow', image: 'img/new-eba.jpg'}, {name: 'fufu',  price: 500,category: 'swallow', image: 'img/semo.jpg'}, {name: 'semo',  price: 800, category: 'swallow', image: 'img/semo.jpg'}, {name: 'white rice',price: 600,category: 'swallow', image: 'img/rice-and-sauce.jpg'},
    {name: 'chicken',   price: 2500, category: 'proteins', image: 'chicken-sauce2.jpg'}, {name: 'beef',  price: 1000, category: 'proteins', image: 'yam and egg sauce.jpg'}, {name: 'fried fish',  price: 500, category: 'proteins', image: 'img/jollof-rice.jpg'}, {name: 'turkey',price: 2500, category: 'proteins', image: 'img/jollof-plantain.jpg'},
    {name: 'egusi',   price: 2000, category: 'soup', image: 'img/new-egusi-soup.jpg'}, {name: 'okra',  price: 1500, category: 'soup', image: '/img/okra-soup.jpg'}, {name: 'oha',  price: 2000, category: 'soup', image: 'img/oha-soup.jpg'}, {name: 'vegetable',price: 2500, category: 'soup', image: 'img/vegetable-soup.jpg'},
    {name: 'water',   price: 800, category: 'drinks', image: 'eva-water.png'}, {name: 'malt',  price: 500, category: 'drinks', image: 'malt.jpg'}, {name: 'milk',  price: 300, category: 'drinks', image: 'evap.webp'},
    {name: 'noodles',   price: 1500, category: 'sides', image: 'indomie.jpg'}, {name: 'moi-moi & egg',  price: 3000, category: 'sides', image: 'moi-moi-with-egg.jpg'}, {name: 'spaghetti',  price: 3000, category: 'sides', image: 'spaghetti.jpg'}
];

// let localCart = localStorage.getItem('mycart');
// let cart = !localCart ? [] : JSON.parse(localCart);


let payment_options = [
    {value: 'Bank card'}, {value: 'Transfer'}, {value: 'crypto'}
];


function searchFood() {
    let searchInput = document.getElementById('enter-food-name');
    let food = searchInput.value.trim();
    // category = searchInput.value.trim();
    if(food == '') {
        alert('kindly enter your desired food')
    // }else if(category) {
    //     displaycategory(category);
    }else{
        displayFood(food);
    }
}

function displayFood(food) {
    let menulist = menu.find(x => x.name == food);
    if(menulist) {
        let menuitem =`<div class="col-12 col-md-6 mt-1">
            <div class="d-flex">
                <a href="" class="d-flex border w-100 rounded-2 justify-content-between" style="color: black; height: 120px;">
                    <div class="ps-3 pt-2">
                        <h5 style="font-size: 15px;">${menulist.name}</h5>
                        <p>${menulist.name}</p>
                        <p style="color: #02C27F;">${menulist.price}</p>
                    </div>
                    <div class="text-end">
                        <img src="/img/${menulist.image}" alt="" style="height: 100%; width: 50%;">
                    </div>
                </a>
            </div>
            <button style="background-color: #0C513F; color: white;" class="rounded-3 px-2 py-1 border-0 mt-2 mb-3">add to cart</button>
        </div>`
        document.getElementById('display-menu').innerHTML = menuitem
        searchInput.value = ''
    }else{
        alert(`${food} not in menu`)
        searchInput.value = ''
    }
    
}

function loadMenu () {
    let menuitems = '';
    menu.forEach((x, index) => {
        menuitems += `<div class="col-12 col-md-6 mt-1">
            <div class="d-flex">
                <a href="" class="d-flex border w-100 rounded-2 justify-content-between" style="color: black; height: 120px;">
                    <div class="ps-3 pt-2">
                        <h5 style="font-size: 15px;">${x.name}</h5>
                        <p>${x.name}</p>
                        <p style="color: #02C27F;">${x.price}</p>
                    </div>
                    <div class="text-end">
                        <img src="/img/${x.image}" alt="" style="height: 100%; width: 70%;">
                    </div>
                </a>
            </div>
            <a href="#display-cart">
            <button id="addcart-btn" style="background-color: #0C513F; color: white;" class="rounded-3 px-2 py-1 border-0 mt-2 mb-3" onclick="addFood(${index})">add to cart</button>
            </a>
        </div>`
        document.getElementById('display-menu').innerHTML = menuitems
    });
}
let cart = []
function addFood(menuindex) {
    let menuitem = menu[menuindex];
    let cartdisplay = cart.find((cartitem) => cartitem.name == menuitem.name);
    if(!cartdisplay) {
        alert('added successfully')
        document.getElementById('cart-bg').innerHTML = ''
        let quantity = 1 
        cart.push({
            name: menuitem.name,
            price: menuitem.price,
            quantity:1,
            total: menuitem.price
        });
        updateLocalstorage()
        document.getElementById('display-cart').innerHTML +=`<div id="display-cart" class="row d-none d-lg-block mt-4" style="margin-left: 1px;">
            <div class="d-flex">
                <div class="col-6">
                    <b>Gracious Kitchen</b>
                </div>
                <div class="col-6 text-end">
                    <a href=""><button class="rounded-pill bg-success-subtle border-0 px-2">+ Add another pack</button></a>
                </div>
            </div>
                
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Pack 1</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeFood()"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Name: ${menuitem.name}
                    <p>Price: ${menuitem.price}</p>
                    <p>Quantity: ${quantity}</p>
                    <p>Total: ${menuitem.price}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        cartNumber();
        sumCartTotal()
    }else{
        cartdisplay.quantity += 1 
        cartdisplay.price = menuitem.price;
        cartdisplay.total = cartdisplay.quantity * menuitem.price
        console.log(cartdisplay)
        alert('your cart has been updated')
        let ordered_food = ""
        ordered_food +=`<div id="display-cart" class="row d-none d-lg-block mt-4" style="margin-left: 1px;">
            <div class="d-flex">
                <div class="col-6">
                    <b>Gracious Kitchen</b>
                </div>
                <div class="col-6 text-end">
                    <a href=""><button class="rounded-pill bg-success-subtle border-0 px-2">+ Add another pack</button></a>
                </div>
            </div>
                
            <div class="row rounded-2" style="border: 1px dashed; margin-left: 5px; padding: 10px 5px;">
                <div class="col-6">
                    <p style="font-weight: bold;">Pack 1</p>
                </div>
                <div class="col-6 text-end">
                    <i onclick="removeFood()"class="bi bi-trash" style="color: red;"></i>
                </div>
                <div class="col-6">
                    Dish: ${menuitem.name}
                    <p> Price: ${menuitem.price}</p>
                    <p>Quantity: ${cartdisplay.quantity}</p>
                    <p>Total: ${cartdisplay.total}</p>
                </div>
                <div class="col-6 text-end">
                    <button class="rounded-pill border-0 px-2"> - 1 + </button>
                </div>
                <div class="col-12 text-center">
                    <a href="payment.html" style="color: white;">
                        <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
                    </a>
                </div>
            </div>
            <div id="display-total"></div>
        </div>`
        document.getElementById('display-cart').innerHTML = ordered_food
        updateLocalstorage();
        sumCartTotal();
        let localCart = localStorage.getItem('mycart');
        let cart = !localCart ? [] : JSON.parse(localCart);
    }
}

function displaycategory(category) {
    let menulist = menu.find(x => x.category == category);
    if(menulist) {
        let menuitem=`<div class="col-12 col-md-6 mt-1">
            <div class="d-flex">
                <a href="" class="d-flex border w-100 rounded-2 justify-content-between" style="color: black; height: 120px;">
                    <div class="ps-3 pt-2">
                        <h5 style="font-size: 15px;">${menulist.name}</h5>
                        <p>${menulist.name}</p>
                        <p style="color: #02C27F;">${menulist.price}</p>
                    </div>
                    <div class="text-end">
                        <img src="/img/moi-moi-with-egg.jpg" alt="" style="height: 100%; width: 50%;">
                    </div>
                </a>
            </div>
            <button style="background-color: #0C513F; color: white;" class="rounded-3 px-2 py-1 border-0 mt-2 mb-3" onclick="addFood(index)">add to cart</button>
        </div>`
        document.getElementById('display-menu').innerHTML = menuitem
        searchInput.value = ''
    }
};


function removeFood(name) {
    let item = cart[name]
    let index = cart.find(cartitem => cartitem.name == item.name);
    if(index < 0) {
        let notification = confirm('are you sure you would like to remove this item?')
        if(notification == true) {
            cart.splice(index, 1)
        }
    }
}

function cartNumber() {
    document.getElementById('count').innerHTML = cart.length;
}


function updateLocalstorage () {
    localStorage.setItem('mycart', JSON.stringify(cart));
}

function sumCartTotal() {
    // let totalCost = cart.reduce((accum, value) => accum + value.total, 0);
    let totalCost = 0;
    cart.forEach(cartItem => {
        totalCost += cartItem.total
    });
    document.getElementById('display-total').innerHTML = `Total Worth: $${totalCost}`;
}

function listCartItems() {
    let cartLi = '';
    if (cart.length == 0) {
        cartLi = `<li class="text-center" style="font-size: 80px;" id="cart-bg">your cart appears here!</li>`;
    } else {
        cart.forEach((cartItem, index) => {
            cartLi += `
            <div id="menu-item" class="col-12">
            <h4>Item: ${cartItem.name}</h4>
            <p>Price: $${cartItem.price}</p>
            <p>Qty: ${cartItem.quantity}</p>
            <p>Total: $${cartItem.total}</p>
            <a href="payment.html" style="color: white;">
                <button class="rounded-pill border-0 px-2 w-100" style="background-color: #02C27F;">Place Order</button>
            </a>
            <div class="col-6 text-end">
                <i onclick="removeFood(${index})"class="bi bi-trash" style="color: white;"></i>
            </div>
        </div>`
        })
    }

    document.getElementById('display-cart').innerHTML = cartLi;
}

listCartItems()

