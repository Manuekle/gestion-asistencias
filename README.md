# 📊 Sistema de Gestión de Asistencias FUP

Este es un prototipo de software para la **gestión de asistencias** en la FUP, que permite a los docentes generar códigos QR para registrar la asistencia de los estudiantes de forma automática y segura. Los estudiantes escanean estos códigos para confirmar su asistencia en cada clase.

## 🚀 Características Principales

- ✅ Gestión de usuarios (administradores, docentes, estudiantes).
- ✅ Registro de clases y asignaturas.
- ✅ Generación de códigos QR para cada clase.
- ✅ Registro de asistencias mediante escaneo de QR.
- ✅ Visualización de reportes de asistencia.
- ✅ Modificación manual de asistencias por parte del docente.

## ⚙️ Tecnologías Utilizadas

- **Frontend:** React, Tailwind CSS, shadcn/ui  
- **Backend:** .NET  
- **Base de Datos:** MySQL  
- **Seguridad:** Autenticación basada en tokens, validación de QR  
- **Herramientas de Desarrollo:** Visual Studio, Postman, Docker (opcional)

## 🗒️ Checklist de Módulos

### 🗂️ **Módulos Principales**

- [X] **Gestión de Usuarios**
  - [X] Registro de usuarios
  - [X] Inicio de sesión con autenticación
  - [X] Gestión de roles (administrador, docente, estudiante)
  
- [X] **Gestión de Clases**
  - [X] Creación y edición de clases
  - [X] Asignación de docentes y asignaturas
  - [ ] Visualización del horario
  
- [X] **Generación de Códigos QR**
  - [X] Botón para generar QR en la vista del docente
  - [X] Mostrar QR con tiempo de validez limitado
  - [X] Integración con el backend para tokens únicos
  
- [X] **Registro de Asistencias**
  - [X] Escaneo de QR por parte de los estudiantes
  - [X] Registro automático de la asistencia en la base de datos
  - [ ] Validación de la ubicación y hora
  
- [X] **Visualización de Asistencias**
  - [X] Tabla de estudiantes por clase (vista del docente)
  - [ ] Modificación manual del estado de asistencia
  - [ ] Filtros por fecha, estado, y asignatura
  
- [ ] **Reportes**
  - [ ] Generación de reportes de asistencia
  - [ ] Exportación a PDF/Excel
  - [ ] Gráficos de estadísticas de asistencia

## 🗓️ Cronograma de Desarrollo

- **Enero:** Documentación del proyecto, estado del arte, marco teórico. ✅  
- **Febrero - Marzo:** Desarrollo del backend (API, base de datos, lógica de negocio).  
- **Abril - Mayo:** Desarrollo del frontend (interfaces, conexión con la API, pruebas).  
- **Junio:** Pruebas finales, optimización, entrega del proyecto.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! Si deseas colaborar:

1. Haz un fork del repositorio

2. Crea una nueva rama (git checkout -b feature-nueva)

3. Realiza tus cambios y haz commit

4. Abre un Pull Request

## 📧 Contacto

Desarrollador: Manuel Esteban Erazo Medina

Correo: [manuel.erazo@fup.edu.co]

Proyecto para: Fundación Universitaria de Popayán (FUP)
