document.addEventListener('DOMContentLoaded', function() {
    // Получаем все ссылки навигации
    const navLinks = document.querySelectorAll('.profile-nav a');
    
    // Получаем все секции
    const sections = document.querySelectorAll('.profile-section');
    
    // Обработчик клика по ссылкам навигации
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Предотвращаем переход по ссылке, если это не кнопка выхода
            if (!this.classList.contains('logout')) {
                e.preventDefault();
                
                // Убираем активный класс у всех ссылок
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Добавляем активный класс текущей ссылке
                this.classList.add('active');
                
                // Получаем ID секции из href ссылки
                const sectionId = this.getAttribute('href').substring(1);
                
                // Скрываем все секции
                sections.forEach(section => section.classList.remove('active'));
                
                // Показываем нужную секцию
                document.getElementById(sectionId).classList.add('active');
            }
        });
    });
    
    // Обработчик отправки формы личных данных
    const profileForm = document.querySelector('.profile-form');
    if (profileForm) {
        profileForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Здесь будет логика отправки данных на сервер
            alert('Данные успешно сохранены');
        });
    }
    
    // Обработчик кнопки "Повторить заказ"
    const repeatOrderButtons = document.querySelectorAll('.order-footer .btn-primary');
    repeatOrderButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Здесь будет логика повторного заказа
            alert('Заказ добавлен в корзину');
        });
    });
    
    // Обработчики кнопок управления адресами
    const addressActions = document.querySelectorAll('.address-actions button');
    addressActions.forEach(button => {
        button.addEventListener('click', function() {
            if (this.classList.contains('btn-secondary')) {
                // Логика редактирования адреса
                alert('Редактирование адреса');
            } else if (this.classList.contains('btn-danger')) {
                if (confirm('Вы уверены, что хотите удалить этот адрес?')) {
                    // Логика удаления адреса
                    this.closest('.address-item').remove();
                }
            }
        });
    });
    
    // Обработчик добавления нового адреса
    const addAddressButton = document.querySelector('.addresses-list .btn-primary');
    if (addAddressButton) {
        addAddressButton.addEventListener('click', function() {
            // Здесь будет логика добавления нового адреса
            alert('Добавление нового адреса');
        });
    }

    // Обработка изменения аватара
    const changeAvatarBtn = document.querySelector('.change-avatar');
    const avatarInput = document.createElement('input');
    avatarInput.type = 'file';
    avatarInput.accept = 'image/*';
    avatarInput.style.display = 'none';

    if (changeAvatarBtn) {
        changeAvatarBtn.addEventListener('click', function() {
            avatarInput.click();
        });

        avatarInput.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const avatarImg = document.querySelector('.profile-avatar img');
                    avatarImg.src = e.target.result;
                    // Здесь будет код для отправки аватара на сервер
                };
                reader.readAsDataURL(file);
            }
        });
    }

    // Обработка формы настроек
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        settingsForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('confirm-password').value;
            const emailNotifications = document.getElementById('email-notifications').checked;

            if (newPassword !== confirmPassword) {
                showNotification('Пароли не совпадают', 'error');
                return;
            }

            // Здесь будет код для отправки данных на сервер
            showNotification('Настройки успешно сохранены');
        });
    }

    // Загрузка и отображение заказов
    function loadOrders() {
        const ordersList = document.querySelector('.orders-list');
        if (!ordersList) return;

        // Здесь будет код для загрузки заказов с сервера
        // Пример отображения заказов:
        const orders = [
            {
                id: '12345',
                date: '01.01.2023',
                status: 'Доставлен',
                products: [
                    {
                        name: 'Название товара',
                        image: '../assets/images/product1.jpg',
                        quantity: 1,
                        price: 999
                    }
                ],
                total: 999
            }
        ];

        ordersList.innerHTML = orders.map(order => `
            <div class="order-item">
                <div class="order-header">
                    <span class="order-number">Заказ #${order.id}</span>
                    <span class="order-date">${order.date}</span>
                    <span class="order-status">${order.status}</span>
                </div>
                <div class="order-products">
                    ${order.products.map(product => `
                        <div class="order-product">
                            <img src="${product.image}" alt="${product.name}">
                            <div class="product-info">
                                <h4>${product.name}</h4>
                                <p>Количество: ${product.quantity}</p>
                                <p>Цена: ${product.price} ₽</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
                <div class="order-footer">
                    <span class="order-total">Итого: ${order.total} ₽</span>
                    <button class="btn btn-outline" data-order-id="${order.id}">Повторить заказ</button>
                </div>
            </div>
        `).join('');

        // Обработка кнопки "Повторить заказ"
        document.querySelectorAll('.btn-outline').forEach(button => {
            button.addEventListener('click', function() {
                const orderId = this.dataset.orderId;
                // Здесь будет код для повторения заказа
                showNotification('Заказ добавлен в корзину');
            });
        });
    }

    // Загрузка и отображение избранных товаров
    function loadFavorites() {
        const favoritesGrid = document.querySelector('.favorites-grid');
        if (!favoritesGrid) return;

        // Здесь будет код для загрузки избранных товаров с сервера
        // Пример отображения избранных товаров:
        const favorites = [
            {
                id: 1,
                name: 'Название товара',
                image: '../assets/images/product1.jpg',
                price: 999
            }
        ];

        favoritesGrid.innerHTML = favorites.map(product => `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p class="price">${product.price} ₽</p>
                <button class="btn" data-product-id="${product.id}">В корзину</button>
                <button class="btn btn-outline remove-favorite" data-product-id="${product.id}">
                    <i class="fas fa-heart"></i>
                </button>
            </div>
        `).join('');

        // Обработка кнопок добавления в корзину и удаления из избранного
        document.querySelectorAll('.favorites-grid .btn').forEach(button => {
            button.addEventListener('click', function() {
                const productId = this.dataset.productId;
                if (this.classList.contains('remove-favorite')) {
                    // Здесь будет код для удаления из избранного
                    showNotification('Товар удален из избранного');
                } else {
                    // Здесь будет код для добавления в корзину
                    showNotification('Товар добавлен в корзину');
                }
            });
        });
    }

    // Функция для показа уведомлений
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Инициализация при загрузке страницы
    loadOrders();
    loadFavorites();
});
