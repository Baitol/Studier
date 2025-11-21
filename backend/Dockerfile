FROM php:8.2-fpm

# Встановлюємо системні залежності
RUN apt-get update && apt-get install -y \
        libonig-dev \
        libzip-dev \
        unzip \
        default-mysql-client \
    && docker-php-ext-install pdo_mysql mbstring zip \
    && docker-php-ext-enable pdo_mysql

WORKDIR /var/www/html

# Копіюємо код Laravel
COPY ./backend /var/www/html

# Встановлюємо права на storage і cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Встановлюємо Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer