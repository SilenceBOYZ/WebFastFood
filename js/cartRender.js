let shopListCart = document.getElementById("cartShop");
let sideCart = document.getElementById("your-cart-side");
let cartPrice = document.getElementById("total-prices");
// Kinh nghiệm rút ra không được đạt trùng id trong html

let lockInputType = () => {
  let inputTypes = document.querySelectorAll(".item-Details__input");
  inputTypes.forEach((input) => {
    input.readOnly = true;
  })
}


let itemData = [
  {
    id: "wwww",
    name: "burger Việt",
    desc: "Món ăn ngon giá rẻ",
    image: "fooditem1.png",
    price: 25000
  },
  {
    id: "geqweqwessqw",
    name: "Burger Việt",
    desc: "Món ăn ngon giá rẻ",
    image: "fooditem2.png",
    price: 20000
  },
  {
    id: "acbs",
    name: "Tacos Việt Nam",
    desc: "Món ăn ngon giá rẻ",
    image: "fooditem3.png",
    price: 35000
  },
];

let basket = [];
let listItemSelected = [];

generateShop = () => {
  return (shopListCart.innerHTML = itemData.map((product) => {
    let { id, name, desc, image, price } = product;
    return `<div class="order-menu__cartItem" id="produc-${id}">
    <div class="order-menu__icon">
      <img src="img/svg/heart.svg" alt="" srcset="" />
    </div>
    <div class="order-menu__item">
      <div class="order-menu__imageBox">
        <img
          class="order-menu__image"
          src="img/foodItem/${image}"
          alt=""
          srcset=""
        />
      </div>
      <h3 class="order-menu__title">${name}</h3>
      <p class="order-menu__desc">
        ${desc}
      </p>
      <div class="order-menu__prices">
        <p class="order-menu__price">
          <span class="order-menu__moneyUnit">${price}</span> vnđ
        </p>
        <button id="${id}" onclick="addtocart(${id})" class="order-menu__addToCart" >
          <img width="25px" src="img/svg/plus.svg" alt="" srcset="" />
        </button>
      </div>
    </div>
  </div>`;
  }).join(""));
}

generateShop();

let addtocart = (id) => {
  let selectedItem = id;
  // Xử lý logic đã tồn tại id
  addToSide(selectedItem.id);
}

let addToSide = (id) => {
  let findProduct = id;
  let searchProduct = basket.find((x) => { return x.id === findProduct });
  if (searchProduct === undefined) {
    basket.push({
      id: findProduct,
      quantity: 1
    })
  } else if (searchProduct.quantity === 0) {
    basket = basket.filter((x)=> {return x.quantity > 0});
  }
  else {
    searchProduct.quantity += 1;
  }
  sideCart.innerHTML = basket.map((x) => {
    let find = itemData.find((y) => { return y.id === x.id }) || [];
    let { quantity } = x;
    let { id, name, image, price } = find;

    return `
    <div class="cart__item" id="product-cart-${id}">
    <div class="cart__imageBox">
      <img
        class="cart__image"
        src="img/foodItem/${image}"
        alt=""
        srcset=""
      />
    </div>
    <div class="cart__title">
      <h5 class="shop-menu__foodItemName u-margin-bottom-small">
      ${name}
      </h5>
      <div class="item-Details__information u-delete-margin-bottom">
        <div class="item-Details__informationBox u-delete-margin-left">
          <div class="form">
            <button onclick="decrement(${id})"
              class="item-Details__button item-Details__button--left"
            >
              <i>-</i>
            </button>
            <input
              type="text"
              value="${quantity}"
              name=""
              class="item-Details__input" id="quantity-${id}"
            />
            <button onclick="increment(${id})"
              class="item-Details__button item-Details__button--right"
            >
              <i>+</i>
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="cart__closeTag">
      <button>X</button>
      <i class="shop-menu__prices cart__price cart-side__price" id="price-${id}">${price * quantity}</i>
    </div>
  </div>
    `;
  }).join("");
  lockInputType();
  calcTotalPrice();
}
// Làm sao để select đúng id của từng sản phẩm
let increment = (id) => {
  let selectedItem = id;
  let itemId = `quantity-${selectedItem.id}`;
  // console.log(itemId);
  let findIdCartItem = document.getElementById(itemId);
  if (findIdCartItem) {
    findIdCartItem.value = parseInt(findIdCartItem.value) + 1;
    String(findIdCartItem.value);
    let searchItemInBasket = basket.find((x) => { return x.id === selectedItem.id });
    if (searchItemInBasket) {
      searchItemInBasket.quantity = parseInt(findIdCartItem.value);
    }
  }
  update(selectedItem.id);
  // parseInt
}
let decrement = (id) => {
  let selectedItem = id;
  let itemId = `quantity-${selectedItem.id}`;
  // console.log(itemId);
  let findIdCartItem = document.getElementById(itemId);
  if (findIdCartItem) {
    if (parseInt(findIdCartItem.value) === 0) {
      update(selectedItem.id);
    } else {
      findIdCartItem.value = parseInt(findIdCartItem.value) - 1;
    }
    String(findIdCartItem.value);
    let searchItemInBasket = basket.find((x) => { return x.id === selectedItem.id });
    if (searchItemInBasket) {
      searchItemInBasket.quantity = parseInt(findIdCartItem.value);
    }
  }
  update(selectedItem.id);
}

let update = (id) => {
  let itemPrice = `price-${id}`;
  // Xử lý update giỏ hàng
  let productPrice = document.getElementById(itemPrice);
  let findItemInData = itemData.find((x) => { return x.id === id });
  let search = basket.find((product) => { return product.id === id });
  if (search.quantity === 0) {
    addToSide(id);
  }
  else {
    productPrice.innerHTML = findItemInData.price * search.quantity;
  }
  calcTotalPrice();
}

let calcTotalPrice = () => {
  let sum = 0;
  let listOfPrice = document.querySelectorAll(".cart-side__price");
  let cartTotalPrice = Array.from(listOfPrice).forEach((x) => {
    sum += parseInt(x.innerHTML);
  });
  cartPrice.innerHTML = new Intl.NumberFormat('vi', { maximumSignificantDigits: 10 }).format(
    sum
  ) + ` <span>vnđ</span>`;
}

/* 
  `

  `

*/