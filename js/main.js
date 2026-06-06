// Обработка поиска
document.addEventListener('DOMContentLoaded', function() {
    const searchForm = document.querySelector('.search');
    const searchInput = searchForm.querySelector('input');
    const searchButton = searchForm.querySelector('button');

    searchButton.addEventListener('click', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            window.location.href = `pages/catalog.html?search=${encodeURIComponent(searchTerm)}`;
        }
    });

    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            const searchTerm = searchInput.value.trim();
            if (searchTerm) {
                window.location.href = `pages/catalog.html?search=${encodeURIComponent(searchTerm)}`;
            }
        }
    });
});

// Обновление количества товаров в корзине
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cartCount.textContent = cart.length;
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
});

// Мобильное меню
document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('.nav');
    const headerTop = document.querySelector('.header__top');
    
    function toggleMobileMenu() {
        if (window.innerWidth <= 768) {
            if (!nav.classList.contains('mobile-menu')) {
                nav.classList.add('mobile-menu');
                const menuButton = document.createElement('button');
                menuButton.className = 'mobile-menu-button';
                menuButton.innerHTML = '<i class="fas fa-bars"></i>';
                headerTop.insertBefore(menuButton, nav);
                
                menuButton.addEventListener('click', function() {
                    nav.classList.toggle('active');
                });
            }
        } else {
            const mobileMenuButton = document.querySelector('.mobile-menu-button');
            if (mobileMenuButton) {
                mobileMenuButton.remove();
            }
            nav.classList.remove('mobile-menu', 'active');
        }
    }

    window.addEventListener('resize', toggleMobileMenu);
    toggleMobileMenu();
});

// Анимация при прокрутке
document.addEventListener('DOMContentLoaded', function() {
    const features = document.querySelectorAll('.feature');
    const categories = document.querySelectorAll('.category');

    function checkScroll() {
        const triggerBottom = window.innerHeight * 0.8;

        features.forEach(feature => {
            const featureTop = feature.getBoundingClientRect().top;
            if (featureTop < triggerBottom) {
                feature.classList.add('show');
            }
        });

        categories.forEach(category => {
            const categoryTop = category.getBoundingClientRect().top;
            if (categoryTop < triggerBottom) {
                category.classList.add('show');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
});
