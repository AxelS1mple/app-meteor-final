# Usa la imagen oficial de Node.js
FROM node:16-slim

# Establecer el directorio de trabajo en /app
WORKDIR /app

# Copiar los archivos del proyecto al contenedor
COPY . .

# Instalar dependencias de Meteor
RUN curl https://install.meteor.com/ | sh
RUN meteor npm install

# Exponer el puerto en el que Meteor va a correr
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["meteor", "run", "--production"]
