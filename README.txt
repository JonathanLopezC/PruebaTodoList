# To-Do List Application
## Requisitos
- .NET Core SDK
- Reacj.js
- MySQL 
## Configuración del Backend
1. Clonar el repositorio y navegar a /TareasApi.
2. Configurar la cadena de conexión en appsettings.json.
3. Ejecutar las migraciones de Entity Framework Core.
    - dotnet migrations InitialCreate
    - dotnet migrations update
4. Iniciar el proyecto.
    - dotnet run 

## Configuración del Frontend
1. Navegar al directorio /to-do-app y ejecutar npm install.
2. Ejecutar npm start para iniciar la aplicación de React.
## Endpoints de la API
- GET /api/Tareas: Obtener todas las tareas.
- POST /api/Tareas: Crear una nueva tarea.
- PUT /api/Tareas/{id}: Actualizar una tarea existente.
- DELETE /api/Tareas/{id}: Eliminar una tarea.