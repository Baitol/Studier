# беремо Node 20 як базу
FROM node:20 
# робоча директорія всередині контейнера
WORKDIR /app
# копіюємо тільки package.json та package-lock.json, щоб зробити npm install окремо
COPY package*.json ./
# встановлюємо всі залежності всередині контейнера Важливо: не копіюємо node_modules з Windows, бо вони не підходять для Linux-контейнера
RUN npm install --force
# копіюємо весь код після установки пакетів
COPY . .
# запускаємо Vite та дозволяємо доступ ззовні
CMD ["npm", "run", "dev", "--", "--host"]
