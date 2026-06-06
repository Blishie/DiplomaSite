// Функция для отображения товаров в корзине
function displayCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Корзина пуста</p>';
        updateSummary(0, 0);
        return;
    }

    cartItems.innerHTML = '';
    
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item__image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item__info">
                <h3 class="cart-item__title">${item.name}</h3>
                <p class="cart-item__price">${item.price} ₽</p>
            </div>
            <div class="cart-item__actions">
                <div class="quantity-control">
                    <button class="decrease-quantity" data-index="${index}">-</button>
                    <span class="quantity">1</span>
                    <button class="increase-quantity" data-index="${index}">+</button>
                </div>
                <button class="remove-item" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        cartItems.appendChild(cartItem);
    });

    // Добавляем обработчики событий
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', decreaseQuantity);
    });

    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', increaseQuantity);
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', removeItem);
    });

    updateSummary(cart.length, calculateTotal(cart));
}

// Функция для обновления итоговой суммы
function updateSummary(itemsCount, totalPrice) {
    document.querySelector('.total-items').textContent = itemsCount;
    document.querySelector('.total-price').textContent = `${totalPrice} ₽`;
}

// Функция для расчета общей суммы
function calculateTotal(cart) {
    return cart.reduce((total, item) => total + item.price, 0);
}

// Функция для уменьшения количества товара
function decreaseQuantity(event) {
    const index = parseInt(event.target.dataset.index);
    const quantityElement = event.target.nextElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    
    if (quantity > 1) {
        quantity--;
        quantityElement.textContent = quantity;
        updateCartItem(index, quantity);
    }
}

// Функция для увеличения количества товара
function increaseQuantity(event) {
    const index = parseInt(event.target.dataset.index);
    const quantityElement = event.target.previousElementSibling;
    let quantity = parseInt(quantityElement.textContent);
    
    quantity++;
    quantityElement.textContent = quantity;
    updateCartItem(index, quantity);
}

// Функция для обновления товара в корзине
function updateCartItem(index, quantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart[index];
    const totalPrice = item.price * quantity;
    
    // Обновляем отображение цены
    const cartItem = document.querySelectorAll('.cart-item')[index];
    cartItem.querySelector('.cart-item__price').textContent = `${totalPrice} ₽`;
    
    // Обновляем общую сумму
    const newTotal = cart.reduce((total, item, i) => {
        const itemQuantity = i === index ? quantity : 1;
        return total + (item.price * itemQuantity);
    }, 0);
    
    updateSummary(cart.length, newTotal);
}

// Функция для удаления товара из корзины
function removeItem(event) {
    const index = parseInt(event.target.closest('.remove-item').dataset.index);
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    displayCartItems();
    updateCartCount();
    showNotification('Товар удален из корзины');
}

// Функция для показа уведомления
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Функция для обновления счетчика корзины
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}

// Обработчик для кнопки оформления заказа
document.querySelector('.checkout').addEventListener('click', function() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        showNotification('Корзина пуста');
        return;
    }
    
    // Здесь можно добавить логику оформления заказа
    showNotification('Заказ оформлен!');
    localStorage.removeItem('cart');
    displayCartItems();
    updateCartCount();
});

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    displayCartItems();
    updateCartCount();
}); 