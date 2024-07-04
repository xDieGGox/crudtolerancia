# Usa una imagen base de Node.js
FROM node:latest

# Establece el directorio de trabajo
WORKDIR /app

# Copia el código fuente del frontend
COPY crudmascotas /app/crudmascotas

# Instala las dependencias necesarias para el proyecto Angular y el servidor Node.js
RUN npm install -g @angular/cli && \
    cd crudmascotas && \
    npm install

# Compila la aplicación Angular
RUN cd crudmascotas && \
    npm run build

# Instala Nginx
RUN apt-get update && apt-get install -y nginx

# Copiamos el directorio de la app de angular a la carpeta de html para el servidor nginx
COPY crudmascotas/dist/crudmascotas/angular-app /var/www/html/

# Copia la configuración personalizada de Nginx
#COPY default /etc/nginx/sites-enabled/default

RUN service nginx start

# Exponer el puerto para el servidor web y las conexiones de WebSocket
EXPOSE 80

# Comandos para iniciar el servidor Node.js y el servidor web
#CMD ["node", "index.js"]
# Comandos para iniciar el servidor Node.js y Nginx
#CMD ["nginx", "-g", "daemon off;"] & ["node", "index.js"]
CMD ["sh", "-c","nginx -g 'daemon off;'"]