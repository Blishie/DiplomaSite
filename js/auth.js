// Обработчики для переключения между вкладками
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');

    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Удаляем активный класс у всех табов и форм
            tabs.forEach(t => t.classList.remove('active'));
            forms.forEach(f => f.classList.remove('active'));

            // Добавляем активный класс выбранному табу и соответствующей форме
            this.classList.add('active');
            const formId = this.dataset.tab + '-form';
            document.getElementById(formId).classList.add('active');
        });
    });

    // Обработчик формы входа
    const loginForm = document.getElementById('login-form');
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const rememberMe = document.getElementById('remember-me').checked;

        // Здесь должна быть логика авторизации
        // Для демонстрации просто сохраняем данные в localStorage
        const user = {
            email,
            rememberMe
        };

        localStorage.setItem('user', JSON.stringify(user));
        showNotification('Вы успешно вошли!');
        
        // Перенаправляем на главную страницу
        setTimeout(() => {
            window.location.href = '../index.html';
        }, 1500);
    });

    // Обработчик формы регистрации
    const registerForm = document.getElementById('register-form');
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        // Проверка совпадения паролей
        if (password !== confirmPassword) {
            showNotification('Пароли не совпадают!', 'error');
            return;
        }

        // Проверка сложности пароля
        if (password.length < 6) {
            showNotification('Пароль должен содержать минимум 6 символов!', 'error');
            return;
        }

        // Здесь должна быть логика регистрации
        // Для демонстрации просто сохраняем данные в localStorage
        const user = {
            name,
            email
        };

        localStorage.setItem('user', JSON.stringify(user));
        showNotification('Регистрация успешна!');
        
        // Переключаем на форму входа
        setTimeout(() => {
            document.querySelector('.auth-tab[data-tab="login"]').click();
        }, 1500);
    });

    // Обработчики для социальных кнопок
    document.querySelector('.social-btn.vk').addEventListener('click', function() {
        showNotification('Авторизация через ВКонтакте', 'info');
        // Здесь должна быть логика авторизации через ВК
    });

    document.querySelector('.social-btn.google').addEventListener('click', function() {
        showNotification('Авторизация через Google', 'info');
        // Здесь должна быть логика авторизации через Google
    });
});

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

// Добавляем стили для уведомлений
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 4px;
        color: white;
        animation: slideIn 0.3s ease-out;
    }

    .notification.success {
        background-color: #2ecc71;
    }

    .notification.error {
        background-color: #e74c3c;
    }

    .notification.info {
        background-color: #3498db;
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