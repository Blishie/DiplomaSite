document.addEventListener('DOMContentLoaded', function() {
    // Переключение разделов
    const navLinks = document.querySelectorAll('.profile-nav a');
    const sections = document.querySelectorAll('.profile-section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Удаляем активный класс у всех ссылок
            navLinks.forEach(l => l.classList.remove('active'));
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Скрываем все разделы
            sections.forEach(section => section.style.display = 'none');
            
            // Показываем нужный раздел
            const targetSection = document.querySelector(this.getAttribute('href'));
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // Обработка выбора даты
    const dateButtons = document.querySelectorAll('.date-selector button');
    dateButtons.forEach(button => {
        button.addEventListener('click', function() {
            dateButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            updateDashboardData(this.dataset.period);
        });
    });

    // Функция обновления данных дашборда
    function updateDashboardData(period) {
        // Здесь будет запрос к серверу для получения данных за выбранный период
        console.log(`Updating dashboard data for period: ${period}`);
    }

    // Обработка заказов
    const orderActions = document.querySelectorAll('.order-action');
    orderActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            const orderId = this.closest('tr').dataset.orderId;
            const actionType = this.dataset.action;
            
            handleOrderAction(orderId, actionType);
        });
    });

    function handleOrderAction(orderId, actionType) {
        // Здесь будет логика обработки действий с заказами
        console.log(`Handling order ${orderId} with action: ${actionType}`);
    }

    // Обработка товаров
    const productActions = document.querySelectorAll('.product-action');
    productActions.forEach(action => {
        action.addEventListener('click', function(e) {
            e.preventDefault();
            const productId = this.closest('.product-item').dataset.productId;
            const actionType = this.dataset.action;
            
            handleProductAction(productId, actionType);
        });
    });

    function handleProductAction(productId, actionType) {
        // Здесь будет логика обработки действий с товарами
        console.log(`Handling product ${productId} with action: ${actionType}`);
    }

    // Инициализация графиков
    function initCharts() {
        // Здесь будет инициализация графиков с помощью библиотеки для визуализации данных
        console.log('Initializing charts');
    }

    // Обработка ответов на отзывы
    const replyForms = document.querySelectorAll('.review-reply-form');
    replyForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const reviewId = this.closest('.review-item').dataset.reviewId;
            const replyText = this.querySelector('textarea').value;
            
            handleReviewReply(reviewId, replyText);
        });
    });

    function handleReviewReply(reviewId, replyText) {
        // Здесь будет логика отправки ответа на отзыв
        console.log(`Sending reply to review ${reviewId}: ${replyText}`);
    }

    // Обработка уведомлений
    function initNotifications() {
        const notificationButton = document.querySelector('.notifications-button');
        if (notificationButton) {
            notificationButton.addEventListener('click', function() {
                toggleNotifications();
            });
        }
    }

    function toggleNotifications() {
        // Здесь будет логика отображения/скрытия уведомлений
        console.log('Toggling notifications');
    }

    // Функция для отображения уведомлений пользователю
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Инициализация всех компонентов
    initCharts();
    initNotifications();

    // Показываем дашборд по умолчанию
    document.querySelector('#dashboard').style.display = 'block';
    document.querySelector('[href="#dashboard"]').classList.add('active');
}); 