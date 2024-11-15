# Proyecto de Adopciones

Este proyecto es una API para la gestión de adopciones de mascotas. Permite registrar usuarios, mascotas y gestionar el proceso de adopción.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
- [Endpoints](#endpoints)
- [Configuración](#configuración)
- [Tests](#tests)
- [Docker](#docker)
- [DockerHub](#dockerhub)
- [Swagger](#swagger)

## Instalación

1. Clona el repositorio:
  ```bash
  git clone https://github.com/RodrigoNaray/EntregaFinal-Curso3

  cd EntregaFinal-Curso3
  ```

2. Instala las dependencias:
  ```bash
  npm install
  ```

3. Configura las variables de entorno:
  Crea un archivo `.env` en la raíz del proyecto y añade las siguientes variables:
  ```env
  MONGO_URL=tu_url_de_mongodb
  PORT=8080
  ```

## Uso

Para iniciar el servidor en modo desarrollo:
```bash
npm run dev
```

Para iniciar el servidor en modo producción:
```bash
npm start
```

## Endpoints

### Usuarios

- `GET /api/users`: Obtener todos los usuarios.
- `GET /api/users/{uid}`: Obtener un usuario por ID.
- `POST /api/users`: Crear un nuevo usuario.
- `PUT /api/users/{uid}`: Actualizar un usuario.
- `DELETE /api/users/{uid}`: Eliminar un usuario.

### Mascotas

- `GET /api/pets`: Obtener todas las mascotas.
- `POST /api/pets`: Crear una nueva mascota.
- `PUT /api/pets/{pid}`: Actualizar una mascota.
- `DELETE /api/pets/{pid}`: Eliminar una mascota.

### Adopciones

- `GET /api/adoptions`: Obtener todas las adopciones.
- `GET /api/adoptions/{aid}`: Obtener una adopción por ID.
- `POST /api/adoptions/{uid}/{pid}`: Crear una nueva adopción.

## Configuración

El proyecto utiliza un archivo de configuración para las variables de entorno. Asegúrate de configurar correctamente el archivo `.env` con las variables necesarias.

## Tests

Para ejecutar los tests unitarios y de integración:
```bash
npm run test
```

## Docker

Para construir y correr el contenedor Docker:
1. Construye la imagen:
  ```bash
  docker build -t nombre-de-la-imagen .
  ```

2. Corre el contenedor:
  ```bash
  docker run -p 8080:8080 nombre-de-la-imagen
  ```

## DockerHub

Para descargar y correr la imagen desde DockerHub:

link al repo: https://hub.docker.com/r/rnaray963/adoption

1. Descarga la imagen:
  ```bash
  docker pull rnaray963/adoption:1.0.0
  ```

2. Corre el contenedor:
  ```bash
  docker run -p 8080:8080 rnaray963/adoption:1.0.0
  ```
## Swagger

La documentación de la API está disponible en Swagger. Para acceder a la documentación, inicia el servidor y navega a:
```
http://localhost:8080/api-docs
```

