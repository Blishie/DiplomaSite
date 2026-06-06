document.addEventListener('DOMContentLoaded', function() {
    const feedbackForm = document.getElementById('feedbackForm');
    if (!feedbackForm) return;

    // Маска для телефона
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let x = e.target.value.replace(/\D/g, '').match(/(\d{0,1})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/);
            e.target.value = !x[2] ? x[1] : x[1] + ' (' + x[2] + (x[3] ? ') ' + x[3] : '') + (x[4] ? '-' + x[4] : '') + (x[5] ? '-' + x[5] : '');
        });
    }

    // Обработка отправки формы
    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();

        // Сбор данных формы
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            phone: document.getElementById('phone').value.trim(),
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value.trim()
        };

        // Валидация формы
        if (!validateForm(formData)) {
            return;
        }

        // Отправка данных на сервер
        sendFeedback(formData);
    });

    // Функция валидации формы
    function validateForm(data) {
        let isValid = true;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Валидация имени
        if (data.name.length < 2) {
            showError('name', 'Имя должно содержать минимум 2 символа');
            isValid = false;
        }

        // Валидация email
        if (!emailRegex.test(data.email)) {
            showError('email', 'Введите корректный email');
            isValid = false;
        }

        // Валидация темы
        if (!data.subject) {
            showError('subject', 'Выберите тему сообщения');
            isValid = false;
        }

        // Валидация сообщения
        if (data.message.length < 10) {
            showError('message', 'Сообщение должно содержать минимум 10 символов');
            isValid = false;
        }

        return isValid;
    }

    // Функция отображения ошибки
    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Удаляем предыдущую ошибку, если есть
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        field.parentElement.appendChild(errorDiv);
        field.classList.add('error');
        
        // Удаляем класс ошибки и сообщение через 3 секунды
        setTimeout(() => {
            field.classList.remove('error');
            errorDiv.remove();
        }, 3000);
    }

    // Функция отправки данных на сервер
    function sendFeedback(data) {
        // Здесь будет код для отправки данных на сервер
        // Например, с использованием fetch:
        /*
        fetch('/api/feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(result => {
            if (result.success) {
                showSuccessMessage();
                feedbackForm.reset();
            } else {
                showError('form', result.message || 'Произошла ошибка при отправке формы');
            }
        })
        .catch(error => {
            showError('form', 'Произошла ошибка при отправке формы');
        });
        */

        // Временное решение для демонстрации
        showSuccessMessage();
        feedbackForm.reset();
    }

    // Функция отображения сообщения об успешной отправке
    function showSuccessMessage() {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        successDiv.textContent = 'Ваше сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.';
        
        // Удаляем предыдущее сообщение, если есть
        const existingMessage = document.querySelector('.success-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        feedbackForm.parentElement.insertBefore(successDiv, feedbackForm);
        
        // Удаляем сообщение через 5 секунд
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}); 