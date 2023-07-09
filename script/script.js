// счетчик
const minus = document.querySelector('[data-action="minus"]');
const plus = document.querySelector('[data-action="plus"]');
const counter = document.querySelector('[data-counter]');

minus.addEventListener('click', function () {
  if (parseInt(counter.innerText) > 1) {
    counter.innerText = --counter.innerText;
  }
});
plus.addEventListener('click', function () {
  counter.innerText = ++counter.innerText;
});

// счетчик корзины
const cartIcon = document.getElementById('cart-icon');
const cartBtn = document.querySelector('.button.cart');
const cartBuy = document.querySelector('.cartbuy');
const counterCart = document.querySelector('[data-counter]');
const selectSize = document.getElementById('size');
cartIcon.addEventListener('click', function (go) {
  cartBuy.classList.toggle('show-cart');
  go.stopPropagation();
});

cartBtn.addEventListener('click', function (gogo) {
  cartIcon.classList.add('show');
  cartBuy.classList.add('show-cart');
  gogo.stopPropagation();
  let count = cartIcon.getAttribute('data-count');
  let firstValue = parseInt(counterCart.textContent);
  let lastValue = parseInt(count) || 0;
  lastValue += firstValue;
  cartIcon.setAttribute('data-count', lastValue);
});
document.addEventListener('click', (as) => {
  if (!cartBuy.contains(as.target) && as.target !== selectSize && as.target !== plus && as.target !== minus) {
    cartBuy.classList.remove('show-cart');
  }
});

// slider

const mainImage = document.querySelector('.product__image');
const asideImages = document.querySelectorAll('.aside__image img');
asideImages.forEach(function (image) {
  image.addEventListener('click', function () {
    const imagePath = this.getAttribute('src');
    mainImage.setAttribute('src', imagePath);
  });
});

//modal
const modal = document.querySelector('.modal');
const oneclick = document.querySelector('.oneclick');
const closebtn = document.querySelector('#modal-close');

oneclick.addEventListener('click', (event) => {
  modal.classList.add('active');
  event.stopPropagation();
});
closebtn.addEventListener('click', () => {
  modal.classList.remove('active');
});

document.addEventListener('click', (event) => {
  if (!modal.contains(event.target)) {
    modal.classList.remove('active');
  }
});
// burger
let menu = document.querySelector('#menu-icon');
let nav = document.querySelector('.nav');
menu.onclick = () => {
  menu.classList.toggle('bx-x');
  nav.classList.toggle('open');
};

// Описание товара
const productDesc = document.querySelector('.choose.accordion');

productDesc.addEventListener('click', function () {
  let panel = this.nextElementSibling;
  if (panel.style.display === 'block') {
    panel.style.display = 'none';
  } else {
    panel.style.display = 'block';
  }
});
//статус корзины
function toggleCartStatus() {
  const cartStatus = document.querySelector('.cartbuy__body');
  const cartEmpty = document.querySelector('.cart__emty');
  if (cartStatus.children.length > 0) {
    cartEmpty.classList.add('none');
  } else {
    cartEmpty.classList.remove('none');
  }
}
// итого корзины
function cartSumm() {
  const cartStatus = document.querySelector('.cartbuy__body');
  const cartsItems = document.querySelectorAll('.cart-item');
  const cartTotal = document.querySelector('.cart__total-price');
  let totalPrice = 0;
  cartsItems.forEach(function (item) {
    const itemAmount = item.querySelector('[data-counter]');
    const itemPrice = item.querySelector('.cart-item__price');
    const cartPrice = parseInt(itemAmount.innerText) * parseInt(itemPrice.innerText);
    totalPrice += cartPrice;
  });

  cartTotal.innerText = totalPrice;
}
// корзина;

const cartBody = document.querySelector('.cartbuy__body');
cartBtn.addEventListener('click', function () {
  const tovar = document.querySelector('.content__product');
  const productImage = document.querySelector('.cart__image');
  const productInfo = {
    title: tovar.querySelector('.content__desc>h3').innerText,
    article: tovar.querySelector('.content__desc>p').innerText,
    image: productImage.getAttribute('src'),
    price: tovar.querySelector('[data-price]').innerText,
    size: tovar.querySelector('#size').value,
    counter: tovar.querySelector('[data-counter]').innerText,
  };
  let existingCartItems = cartBody.querySelectorAll(`[data-size="${productInfo.size}"]`);
  if (existingCartItems.length > 0) {
    existingCartItems.forEach(function (item) {
      let counterElement = item.querySelector('[data-counter]');
      counterElement.innerText = parseInt(counterElement.innerText) + parseInt(productInfo.counter);
    });
  } else {
    const cartItemHtml = `
     <div class="cart-item" data-size="${productInfo.size}">
        <div class="cart-item__img">
            <img src="${productInfo.image}" alt="${productInfo.title}">
        </div>
        <div class="cart-item__desc">
            <div class="cart-item__title">${productInfo.title}</div>
            <div class="cart-item__article">${productInfo.article}</div>
            <div class="cart-item__amount">
                <p>Количество: <span data-counter="">${productInfo.counter}</span></p>
                <p>Размер: ${productInfo.size}</p>
            </div>
            <div class="cart-item__currency">Цена: <span class="cart-item__price">${productInfo.price}</span></div>
        </div>
        <div class="bx bx-x" id="cart__item-close"></div>
     </div>
    `;

    cartBody.insertAdjacentHTML('beforeend', cartItemHtml);
    toggleCartStatus();
  }
  cartSumm();
});
//Удаление элемента
document.addEventListener('click', function (event) {
  if (event.target.matches('#cart__item-close')) {
    const cartItem = event.target.closest('.cart-item');

    const counterElement = cartItem.querySelector('.cart-item__amount [data-counter]');
    const counterValue = parseInt(counterElement.innerText);

    const currentCount = parseInt(cartIcon.getAttribute('data-count'));
    const newCount = currentCount - counterValue;
    cartIcon.setAttribute('data-count', newCount);

    cartItem.remove();

    toggleCartStatus();
    cartSumm();

    if (newCount === 0) {
      cartIcon.classList.remove('show');
    }
  }
});
