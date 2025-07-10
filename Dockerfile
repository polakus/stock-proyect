FROM node:18

WORKDIR /app

COPY package*.json ./
RUN npm install

# Instalar nodemon globalmente para desarrollo
RUN npm install -g nodemon

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]