let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// GenerateShop
let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let {id, name, price, desc, img } =x;
            let search = basket.find((x) => x.id === id) || []
        return `
        <div id=product-id-${id} class="item">
            <img width="200" src=${img} alt="">
            <div class="details">
                <h3>${name}</h3>
                <p>${desc}</p>
                <div class="price-quantity">
                   <h2>$ ${price}</h2>
                    <div class="buttons">
                        <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                        <div id=${id} class="quantity">
                        ${search.item === undefined ? 0 : search.item}
                        </div>
                        <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                    </div>
                </div>
            </div>
        </div>
    `  
    }).join(""));
};

generateShop();

// Increment
let increment = (id) => {
    cartAmount++;
    let selectedItem = id;
    let search = basket.find((x)=> x.id === selectedItem.id);

    if(search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }
    update(selectedItem.id);
    updateCartAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));
};

// Decrement
let decrement = (id) => {
    if (cartAmount > 0) {
        cartAmount--;
    }
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id);

    if (search === undefined) return;
    else if (search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);
    updateCartAmount();
    calculation();
    localStorage.setItem("data", JSON.stringify(basket));   
};

// Update
let update = (id) => { 
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation(); 
};

// Calculate
let calculation = () => {
    let cartIcon = document.getElementById("cartAmount");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};
 
calculation();

let cartAmount = 0;

function updateCartAmount() {
    document.getElementById("cartAmount").innerHTML = cartAmount;
    
};


