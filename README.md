## Pre requisitos
Asegúrate de tener instalado lo siguiente:
- Node.js
- Docker
- Docker Compose
- npm
- Angular CLI
```bash
  npm install -g @angular/cli
```

## Configuración del Entorno
Clona el repositorio y navega hasta el directorio del proyecto:
```bash
git clone https://github.com/JDavidcor23/app-fletx.git
cd backend
```
## Ejecución de la Aplicación Nodejs
Iniciar los servicios con Docker Compose
Esto iniciará todos los servicios definidos en tu archivo docker-compose.yml, incluyendo tu base de datos PostgreSQL y PGAdmin.
```bash
docker-compose up -d
```
## Instalar dependencias de Node.js
Navega hasta el directorio de la aplicación Node.js (si es diferente del directorio raíz) e instala las dependencias:

```bash
npm install
```
## Iniciar la aplicación Node.js
```bash
npm start
```
## Configuración de la Base de Datos
Ejecución de Sentencias SQL
Para configurar tus esquemas de base de datos y los datos iniciales, ejecuta las sentencias SQL en sentencias.sql. Puedes hacer esto a través de la línea de comandos o mediante una interfaz gráfica como PGAdmin.


## Ejecutar Angular
Clona el repositorio y navega hasta el directorio del proyecto:
```bash
git clone https://github.com/JDavidcor23/app-fletx.git
cd client
```

## Instalar dependencias de Angular
Navega hasta el directorio de la aplicación y ejecuta el siguiente comando:

```bash
npm install
```
## Iniciar la aplicación Angular
```bash
npm start
```
