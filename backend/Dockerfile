# Встановлюємо права на storage і cache# Використовуємо офіційний базовий імедж PHP з FPM (FastCGI Process Manager).
# Це оптимальний варіант для Laravel, оскільки PHP-FPM працює з Nginx.
FROM php:8.2-fpm

# Оновлюємо список пакетів та встановлюємо системні бібліотеки,
# які потрібні для роботи PHP-розширень та Laravel.
RUN apt-get update && apt-get install -y \
        # Бібліотека для роботи з регулярними виразами (для PHP mbstring)        
        libonig-dev \            
        # Бібліотека для роботи з ZIP (необхідна Laravel)
        libzip-dev \             
        # Потрібен, коли Composer розпаковує пакунки
        unzip \                  
        # MySQL CLI — корисно для діагностики та міграцій
        default-mysql-client \   
        # Встановлюємо PHP-розширення: MySQL, mbstring, ZIP
        && docker-php-ext-install pdo_mysql mbstring zip \  
        # Вмикаємо pdo_mysql (хоча часто не обов’язково)
        && docker-php-ext-enable pdo_mysql                  

# Встановлюємо робочу директорію всередині контейнера.
# Усі наступні команди будуть виконуватися відносно цього шляху.
WORKDIR /var/www/html

# Копіюємо весь код із поточної директорії (де лежить Dockerfile)
# у контейнер у /var/www/html.
# ✔ Тут має бути саме Laravel-проєкт, інакше artisan не знайдеться.
COPY . /var/www/html

# Даємо права веб-серверу (www-data) на папки, де Laravel зберігає кеши, логи та сесії.
# Без цього Laravel може видавати помилки на запис у storage.
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Копіюємо Composer з офіційного імеджа Composer.
# Тепер Composer доступний у контейнері за командою "composer".
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Встановлюємо Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer