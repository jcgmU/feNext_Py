# 📋 Frontend Task Manager con Next.js

Este proyecto es una aplicación de gestión de tareas (Task Manager) desarrollada con Next.js, parte de una arquitectura completa con backend implementado en Django usando Clean Architecture.

## 🌟 Características

- **Gestión completa de tareas**:

  - Visualización de lista de tareas con estado
  - Creación de nuevas tareas
  - Edición de tareas existentes
  - Marcado de tareas como completadas/pendientes
  - Eliminación de tareas

- **Experiencia de usuario mejorada**:
  - Interfaz responsiva
  - Feedback visual de acciones
  - Manejo de estados de carga y errores
  - Validación de formularios

## 🛠️ Tecnologías utilizadas

- **Next.js**: Framework React con renderizado del lado del servidor
- **React**: Biblioteca para construir interfaces de usuario
- **Axios**: Cliente HTTP para comunicación con API
- **CSS-in-JS**: Estilos dinámicos integrados en componentes

## 📦 Estructura del proyecto

```
frontend/
├── components/      # Componentes reutilizables
├── pages/           # Rutas y vistas de la aplicación
├── public/          # Archivos estáticos
├── services/        # Servicios para comunicación con API
├── styles/          # Estilos globales
└── utils/           # Utilidades y helpers
```

## 🚀 Instalación y ejecución

### Requisitos previos

- Node.js (v14 o superior)
- npm (v6 o superior)
- Backend API funcionando (ver sección Backend)

### Pasos para instalación

1. **Clonar el repositorio**

```bash
git clone https://github.com/jcgmU/feNext_Py.git
cd feNext_Py
```

2. **Instalar dependencias**

```bash
npm install
```

3. **Configurar variables de entorno**

```bash
# Crear archivo .env.local
echo "NEXT_PUBLIC_API_URL=http://localhost:8000/api" > .env.local
```

4. **Ejecutar en desarrollo**

```bash
npm run dev
```

5. **Acceder a la aplicación**
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts disponibles

- **Desarrollo**: `npm run dev` - Inicia servidor de desarrollo
- **Construcción**: `npm run build` - Genera versión optimizada
- **Producción**: `npm start` - Ejecuta la versión de producción
- **Linting**: `npm run lint` - Verifica calidad de código

## 🔄 Flujo de datos

1. El usuario interactúa con la interfaz de React
2. Los componentes usan servicios (`/services/api.js`) para comunicarse con la API
3. La API procesa las solicitudes y devuelve respuestas
4. La interfaz se actualiza según los datos recibidos

## 🧪 Testing

```bash
# Ejecutar pruebas
npm test

# Ejecutar pruebas con cobertura
npm test -- --coverage
```

## 🐳 Docker (opcional)

El proyecto incluye configuración para Docker:

```bash
# Construir imagen
docker build -t task-manager-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 task-manager-frontend
```

## 🔌 Backend

Esta aplicación frontend se comunica con una API REST desarrollada en Django utilizando Clean Architecture.

### Repositorio del backend

El código del backend está disponible en: [https://github.com/jcgmU/py_dj_be](https://github.com/jcgmU/py_dj_be)

### Instalación del backend

1. **Clonar repositorio backend**

```bash
git clone https://github.com/jcgmU/py_dj_be.git
cd py_dj_be
```

2. **Configurar entorno virtual**

```bash
python -m venv venv
source venv/bin/activate  # En Windows: venv\Scripts\activate
```

3. **Instalar dependencias**

```bash
pip install -r requirements.txt
```

4. **Configurar base de datos**

```bash
python manage.py migrate
```

5. **Ejecutar servidor**

```bash
python manage.py runserver
```

6. **Verificar API**
   La API estará disponible en [http://localhost:8000/api/tasks/](http://localhost:8000/api/tasks/)

### Configuración CORS

Si encuentras problemas de CORS, asegúrate que el backend tenga instalado `django-cors-headers` y configurado para aceptar peticiones de tu frontend.

## 🌐 Despliegue

Para despliegue en producción se recomienda:

1. Construir la aplicación: `npm run build`
2. Usar un servidor Node.js o exportar como estático
3. Configurar variables de entorno para la URL de la API

## 👥 Contribución

Las contribuciones son bienvenidas. Por favor, abre un issue o pull request para sugerir cambios o mejoras.

## 🔗 Enlaces útiles

- [Documentación de Next.js](https://nextjs.org/docs)
- [Documentación de React](https://reactjs.org/docs)
- [Documentación de la API](https://github.com/jcgmU/py_dj_be/blob/main/README.md)

---

Desarrollado con ❤️ por [jcgmU](https://github.com/jcgmU)
