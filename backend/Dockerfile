# Establecer la imagen base
FROM node:18.13.0

WORKDIR /backend


#Copio todos los archivos de src al directorio de trabajo
COPY src ./src
COPY package*.json ./
COPY .env ./

#Instalar dependencias
RUN npm install

#Puerto de la app
EXPOSE 8080

#Comando para iniciar mi aplicacion
CMD [ "node", "src/index.js" ]