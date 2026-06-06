// Моковые данные для товаров
const products = [
    {
        id: 1,
        name: "Молоко",
        price: 89,
        category: "food",
        image: "../images/goods/milk.jpg"
    },
    {
        id: 2,
        name: "Хлеб",
        price: 45,
        category: "food",
        image: "../images/goods/bread.jpg"
    },
    {
        id: 3,
        name: "Стиральный порошок",
        price: 299,
        category: "household",
        image: "../images/goods/powder.jpg"
    },
    {
        id: 4,
        name: "Шампунь",
        price: 199,
        category: "cosmetics",
        image: "../images/goods/shampoo.jpg"
    }
];

// Функция для отображения товаров
function displayProducts(productsToShow) {
    const productsGrid = document.querySelector('.products__grid');
    productsGrid.innerHTML = '';

    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
            <div class="product-image">
                <img src="${product.image}" 
                     alt="${product.name}"
                     loading="lazy"
                     onerror="this.onerror=null; this.src='../images/main/no-image.jpg';">
            </div>
            <div class="product-content">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">В корзину</button>
            </div>
        `;

        // Обработка загрузки изображения
        const img = productCard.querySelector('img');
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });

        productsGrid.appendChild(productCard);
    });

    // Добавляем обработчики для кнопок
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });
}

// Функция для добавления товара в корзину
function addToCart(event) {
    const productId = parseInt(event.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));
    
    updateCartCount();
    showNotification('Товар добавлен в корзину');
}

// Функция для обновления счетчика корзины
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
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

// Функция для фильтрации товаров
function filterProducts() {
    const selectedCategories = Array.from(document.querySelectorAll('input[name="category"]:checked'))
        .map(checkbox => checkbox.value);
    
    const minPrice = parseInt(document.getElementById('min-price').value);
    const maxPrice = parseInt(document.getElementById('max-price').value);
    
    let filteredProducts = products;
    
    if (selectedCategories.length > 0) {
        filteredProducts = filteredProducts.filter(product => 
            selectedCategories.includes(product.category)
        );
    }
    
    filteredProducts = filteredProducts.filter(product => 
        product.price >= minPrice && product.price <= maxPrice
    );
    
    return filteredProducts;
}

// Функция для сортировки товаров
function sortProducts(products, sortBy) {
    return [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return 0;
        }
    });
}

// Обработчики событий
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    displayProducts(products);
    updateCartCount();

    // Обработчик сортировки
    document.getElementById('sort').addEventListener('change', function() {
        const filteredProducts = filterProducts();
        const sortedProducts = sortProducts(filteredProducts, this.value);
        displayProducts(sortedProducts);
    });

    // Обработчик фильтров
    document.querySelector('.apply-filters').addEventListener('click', function() {
        const filteredProducts = filterProducts();
        const sortValue = document.getElementById('sort').value;
        const sortedProducts = sortProducts(filteredProducts, sortValue);
        displayProducts(sortedProducts);
    });

    // Обработчики для ползунков цены
    const priceMin = document.getElementById('price-min');
    const priceMax = document.getElementById('price-max');
    const minPriceInput = document.getElementById('min-price');
    const maxPriceInput = document.getElementById('max-price');

    priceMin.addEventListener('input', function() {
        minPriceInput.value = this.value;
    });

    priceMax.addEventListener('input', function() {
        maxPriceInput.value = this.value;
    });

    minPriceInput.addEventListener('input', function() {
        priceMin.value = this.value;
    });

    maxPriceInput.addEventListener('input', function() {
        priceMax.value = this.value;
    });
});

// Добавляем стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #2ecc71;
        color: white;
        padding: 15px 20px;
        border-radius: 4px;
        animation: slideIn 0.3s ease-out;
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style); 