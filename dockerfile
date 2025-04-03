# Usa una imagen base de Node.js (puedes probar con una versión diferente si esta sigue dando problemas)
FROM node:16-slim

# Instalar dependencias del sistema necesarias para Meteor
RUN apt-get update && apt-get install -y \
    curl \
    bash \
    build-essential \
    libstdc++6 \
    libgcc1 \
    libcurl4-openssl-dev \
    libssl-dev \
    python3 \
    && rm -rf /var/lib/apt/lists/*

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
