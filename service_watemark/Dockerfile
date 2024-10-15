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

# Copiar la imagen de la marca de agua (watermark.png)
COPY watermark.png /app/watermark.png

# Exponer el puerto 5000 para el servicio de marca de agua
EXPOSE 5000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "index.js"]
