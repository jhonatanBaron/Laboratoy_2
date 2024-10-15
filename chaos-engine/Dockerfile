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

# Exponer el puerto 8000 para el Chaos Engine
EXPOSE 8000

# Comando por defecto para ejecutar la aplicación
CMD ["node", "index.js"]
