# Usa una imagen de Node.js (asegurándote que la versión sea compatible con Meteor)
FROM node:16-slim

# Instalar dependencias del sistema necesarias para Meteor (en este caso, curl y bash)
RUN apt-get update && apt-get install -y curl bash

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el código de la aplicación dentro del contenedor
COPY . .

# Instalar Meteor de forma global
RUN curl https://install.meteor.com/ | sh

# Asegurarnos de que las dependencias de npm estén instaladas
RUN meteor npm install

# Exponer el puerto 3000 (puerto por defecto de Meteor)
EXPOSE 3000

# Ejecutar la aplicación Meteor
CMD ["meteor", "run", "--production"]
