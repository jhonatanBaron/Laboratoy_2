# Utilizar una imagen base de Node.js
FROM node:16-alpine

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar las dependencias
RUN npm install

# Copiar el código fuente
COPY . .

# Exponer el puerto 6000 para el Instance Manager
EXPOSE 6000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "index.js"]
