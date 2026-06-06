document.addEventListener('DOMContentLoaded', function() {
    // Галерея изображений
    const mainImage = document.getElementById('main-product-image');
    const thumbnails = document.querySelectorAll('.thumbnail');

    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Обновляем главное изображение
            mainImage.src = this.querySelector('img').src;
            
            // Обновляем активный класс у миниатюр
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Управление количеством товара
    const quantityInput = document.querySelector('.quantity-selector input');
    const minusBtn = document.querySelector('.quantity-btn.minus');
    const plusBtn = document.querySelector('.quantity-btn.plus');

    minusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value > 1) {
            quantityInput.value = value - 1;
        }
    });

    plusBtn.addEventListener('click', function() {
        let value = parseInt(quantityInput.value);
        if (value < 99) {
            quantityInput.value = value + 1;
        }
    });

    quantityInput.addEventListener('change', function() {
        let value = parseInt(this.value);
        if (value < 1) this.value = 1;
        if (value > 99) this.value = 99;
    });

    // Добавление в корзину
    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.addEventListener('click', function() {
        const quantity = parseInt(quantityInput.value);
        // Здесь будет логика добавления в корзину
        showNotification(`Товар добавлен в корзину (${quantity} шт.)`);
    });

    // Добавление в избранное
    const addToFavoritesBtn = document.querySelector('.add-to-favorites');
    let isFavorite = false;

    addToFavoritesBtn.addEventListener('click', function() {
        isFavorite = !isFavorite;
        // Здесь будет логика добавления/удаления из избранного
        if (isFavorite) {
            this.classList.add('active');
            showNotification('Товар добавлен в избранное');
        } else {
            this.classList.remove('active');
            showNotification('Товар удален из избранного');
        }
    });

    // Переключение табов
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            
            // Обновляем активные классы у кнопок
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Показываем нужный контент
            tabContents.forEach(content => {
                content.classList.remove('active');
                if (content.id === tabId) {
                    content.classList.add('active');
                }
            });
        });
    });

    // Отзывы
    const writeReviewBtn = document.querySelector('.reviews-header .btn-primary');
    if (writeReviewBtn) {
        writeReviewBtn.addEventListener('click', function() {
            // Здесь будет логика открытия формы отзыва
            showNotification('Форма отзыва будет доступна после авторизации');
        });
    }

    // Загрузка дополнительных отзывов
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // Здесь будет логика загрузки дополнительных отзывов
            showNotification('Загрузка дополнительных отзывов...');
        });
    }

    // Просмотр изображений отзывов
    const reviewImages = document.querySelectorAll('.review-images img');
    reviewImages.forEach(img => {
        img.addEventListener('click', function() {
            // Здесь будет логика открытия галереи изображений отзыва
            const src = this.src;
            showImageModal(src);
        });
    });

    // Похожие товары
    const similarProductBtns = document.querySelectorAll('.products-grid .btn-primary');
    similarProductBtns.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Здесь будет логика добавления похожего товара в корзину
            showNotification('Товар добавлен в корзину');
        });
    });

    // Функция показа уведомлений
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        document.body.appendChild(notification);

        // Удаляем уведомление через 3 секунды
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Функция показа модального окна с изображением
    function showImageModal(src) {
        const modal = document.createElement('div');
        modal.className = 'image-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <button class="close-modal">&times;</button>
                <img src="${src}" alt="Увеличенное изображение">
            </div>
        `;

        document.body.appendChild(modal);

        // Закрытие модального окна
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }
}); 