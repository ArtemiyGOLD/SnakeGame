document.addEventListener("DOMContentLoaded", function () {
  // Элементы корзины
  const cartButton = document.getElementById('cartButton');
  const cartSidebar = document.getElementById('cartSidebar');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartItemsContainer = document.getElementById('cartItems');
  const emptyCart = document.getElementById('emptyCart');
  const cartIcon = document.querySelector('#cartButton img');
  const checkoutFooter = document.querySelector('.checkout-footer');
  const cartTotal = document.getElementById('cartTotal');

  let cart = []; // Массив для хранения товаров

  // Проверяем, что все элементы корзины существуют
  if (cartButton && cartSidebar && cartOverlay && cartItemsContainer && emptyCart && cartIcon && checkoutFooter && cartTotal) {
    // Функция для открытия и закрытия корзины
    function toggleCart() {
      cartSidebar.classList.toggle('active');
      cartOverlay.classList.toggle('active');
      cartIcon.src = cartSidebar.classList.contains('active') ? 'images/icons/arrow-left.png' : 'images/icons/basket.png';

      // Обновляем видимость checkout-footer
      updateCart();
    }

    // Функция для обновления отображения корзины
    function updateCart() {
      cartItemsContainer.innerHTML = ''; // Очищаем контейнер с товарами
      let total = 0;

      if (cart.length === 0) {
        emptyCart.style.display = 'block'; // Показываем сообщение, что корзина пуста
        cartItemsContainer.style.display = 'none';
        checkoutFooter.style.display = 'none'; // Скрываем checkout-footer, если корзина пуста
      } else {
        emptyCart.style.display = 'none'; // Скрываем сообщение о пустой корзине
        cartItemsContainer.style.display = 'block';

        // Отображаем каждый товар в корзине
        cart.forEach((item, index) => {
          const cartItem = document.createElement('div');
          cartItem.classList.add('cart-item');

          cartItem.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="item-details">
              <h3>${item.name}</h3>
              <p>${item.price}₽</p>
              <div class="quantity-control">
                <button onclick="decreaseQuantity(${index})">-</button>
                <span>${item.quantity}</span>
                <button onclick="increaseQuantity(${index})">+</button>
              </div>
            </div>
          `;

          cartItemsContainer.appendChild(cartItem);
          total += item.price * item.quantity; // Считаем общую сумму
        });

        // Показываем checkout-footer только если корзина открыта и не пуста
        if (cartSidebar.classList.contains('active')) {
          checkoutFooter.style.display = 'block';
        } else {
          checkoutFooter.style.display = 'none';
        }
      }

      cartTotal.textContent = `${total.toFixed(2)}₽`; // Обновляем итоговую сумму
    }

    // Функция для добавления товара в корзину
    function addToCart(name, price, image) {
      const existingItem = cart.find((item) => item.name === name);

      if (existingItem) {
        existingItem.quantity += 1; // Увеличиваем количество, если товар уже в корзине
      } else {
        cart.push({ name, price, image, quantity: 1 }); // Добавляем новый товар
      }

      updateCart(); // Обновляем отображение корзины
    }

    // Функция для увеличения количества товара
    window.increaseQuantity = function (index) {
      cart[index].quantity += 1;
      updateCart();
    };

    // Функция для уменьшения количества товара
    window.decreaseQuantity = function (index) {
      if (cart[index].quantity > 1) {
        cart[index].quantity -= 1; // Уменьшаем количество
      } else {
        cart.splice(index, 1); // Удаляем товар, если количество становится 0
      }

      updateCart(); // Обновляем отображение корзины
    };

    // Привязываем открытие/закрытие корзины к кнопке корзины
    cartButton.addEventListener('click', toggleCart);

    // Закрываем корзину при клике на оверлей
    cartOverlay.addEventListener('click', toggleCart);

    // Привязываем добавление товара к кнопкам "В корзину"
    function bindAddToCartButtons() {
      document.querySelectorAll('.add-to-cart').forEach((button) => {
        button.addEventListener('click', () => {
          const product = button.closest('.popularBlock, .menuBlock');
          const productName = product.querySelector('h2').textContent;
          const productPrice = parseFloat(product.querySelector('.price, .priceMenu').textContent.replace('₽', ''));
          const productImage = product.querySelector('img').src;

          addToCart(productName, productPrice, productImage); // Добавляем товар в корзину
        });
      });
    }

    // Вызываем функцию привязки кнопок при загрузке страницы
    bindAddToCartButtons();

    // Скрываем checkout-footer по умолчанию
    checkoutFooter.style.display = 'none';
  } else {
    console.error("Один из элементов корзины не найден на странице.");
  }
});