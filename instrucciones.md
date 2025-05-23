# Historias de Usuario - Sistema de Asistencia Docente

## Epic 1: Gestión de Usuarios y Autenticación

### HU-001: Registro de Administrador

**Como** administrador del sistema  
**Quiero** poder registrar nuevos usuarios administradores  
**Para** gestionar el acceso al sistema

**Criterios de Aceptación:**

- El administrador puede crear cuentas con nombre, correo y contraseña
- El correo debe ser único en el sistema
- La contraseña debe cumplir criterios de seguridad mínimos
- Solo usuarios con rol 'administrador' pueden crear otros administradores

### HU-002: Registro de Docentes

**Como** administrador  
**Quiero** registrar docentes en el sistema  
**Para** que puedan gestionar sus asignaturas y clases

**Criterios de Aceptación:**

- Puedo ingresar nombre, correo y contraseña del docente
- El sistema asigna automáticamente el rol 'docente'
- El correo debe ser único
- El docente se crea en estado activo por defecto

### HU-003: Registro de Estudiantes

**Como** administrador o docente  
**Quiero** registrar estudiantes en el sistema  
**Para** que puedan acceder a las clases y marcar asistencia

**Criterios de Aceptación:**

- Puedo ingresar nombre, correo y contraseña del estudiante
- El sistema asigna automáticamente el rol 'estudiante'
- El correo debe ser único
- El estudiante se crea en estado activo por defecto

### HU-004: Autenticación de Usuarios

**Como** usuario del sistema (admin/docente/estudiante)  
**Quiero** autenticarme con mis credenciales  
**Para** acceder a las funcionalidades según mi rol

**Criterios de Aceptación:**

- Puedo iniciar sesión con correo y contraseña
- El sistema me redirige según mi rol
- Las sesiones expiran por seguridad
- Solo usuarios activos pueden autenticarse

## Epic 2: Gestión de Asignaturas

### HU-005: Crear Asignatura

**Como** docente  
**Quiero** crear una nueva asignatura  
**Para** organizar mis clases por materia

**Criterios de Aceptación:**

- Puedo ingresar nombre, programa, descripción y semestre
- Debo especificar el grupo de la asignatura
- Puedo subir una imagen representativa
- El sistema genera automáticamente un slug único
- La asignatura se asocia automáticamente a mi usuario docente

### HU-006: Listar Mis Asignaturas

**Como** docente  
**Quiero** ver todas las asignaturas que tengo asignadas  
**Para** acceder rápidamente a su gestión

**Criterios de Aceptación:**

- Veo solo las asignaturas donde soy el docente asignado
- Puedo ver nombre, programa, semestre y grupo
- Las asignaturas se muestran ordenadas por semestre
- Puedo filtrar por programa o semestre

### HU-007: Editar Asignatura

**Como** docente  
**Quiero** modificar los datos de mis asignaturas  
**Para** mantener la información actualizada

**Criterios de Aceptación:**

- Puedo modificar nombre, descripción, semestre y grupo
- Puedo cambiar la imagen de la asignatura
- Los cambios se reflejan inmediatamente
- No puedo modificar asignaturas de otros docentes

## Epic 3: Gestión de Estudiantes en Asignaturas

### HU-008: Inscribir Estudiantes a Asignatura

**Como** docente  
**Quiero** inscribir estudiantes a mis asignaturas  
**Para** que puedan participar en las clases

**Criterios de Aceptación:**

- Puedo buscar estudiantes por nombre o correo
- Puedo seleccionar múltiples estudiantes para inscribir
- No puedo inscribir el mismo estudiante dos veces
- El estudiante recibe notificación de inscripción

### HU-009: Ver Estudiantes Inscritos

**Como** docente  
**Quiero** ver la lista de estudiantes inscritos en cada asignatura  
**Para** conocer mi grupo de clase

**Criterios de Aceptación:**

- Veo nombre y correo de cada estudiante inscrito
- Puedo ver la fecha de inscripción
- La lista se ordena alfabéticamente
- Puedo exportar la lista a Excel/PDF

### HU-010: Desinscribir Estudiantes

**Como** docente  
**Quiero** poder desinscribir estudiantes de mis asignaturas  
**Para** mantener actualizada la lista de participantes

**Criterios de Aceptación:**

- Puedo seleccionar estudiantes para desinscribir
- Se requiere confirmación antes de proceder
- El estudiante pierde acceso a las clases futuras
- Se mantiene histórico de asistencias previas

## Epic 4: Gestión de Clases

### HU-011: Programar Clase

**Como** docente  
**Quiero** programar una nueva clase para mi asignatura  
**Para** registrar cuándo se impartirá

**Criterios de Aceptación:**

- Puedo seleccionar fecha, hora de inicio y fin
- La clase se asocia a una asignatura específica
- Puedo programar clases futuras
- No puedo programar clases en horarios conflictivos

### HU-012: Ver Cronograma de Clases

**Como** docente  
**Quiero** ver el cronograma de todas mis clases  
**Para** planificar mis actividades académicas

**Criterios de Aceptación:**

- Veo clases ordenadas por fecha y hora
- Puedo filtrar por asignatura
- Distingo entre clases activas y finalizadas
- Puedo ver clases por semana o mes

### HU-013: Iniciar Clase

**Como** docente  
**Quiero** marcar el inicio de una clase programada  
**Para** activar el registro de asistencia

**Criterios de Aceptación:**

- Solo puedo iniciar clases programadas para hoy
- La clase cambia a estado 'activa'
- Se genera automáticamente el código QR
- Los estudiantes pueden empezar a marcar asistencia

### HU-014: Finalizar Clase

**Como** docente  
**Quiero** marcar el fin de una clase activa  
**Para** cerrar el registro de asistencia

**Criterios de Aceptación:**

- Solo puedo finalizar clases que estén activas
- La clase cambia a estado 'finalizada'
- Se desactiva el código QR
- Ya no se puede marcar asistencia

## Epic 5: Gestión de Códigos QR

### HU-015: Generar Código QR para Clase

**Como** docente  
**Quiero** que se genere automáticamente un código QR al iniciar clase  
**Para** que los estudiantes marquen asistencia

**Criterios de Aceptación:**

- El QR se genera automáticamente al activar la clase
- Contiene información única de la clase
- Se muestra tanto el código como el enlace
- La imagen QR queda guardada en la base de datos

### HU-016: Mostrar Código QR en Pantalla

**Como** docente  
**Quiero** mostrar el código QR en pantalla durante la clase  
**Para** que los estudiantes lo puedan escanear

**Criterios de Aceptación:**

- El QR se muestra en tamaño grande y legible
- Incluye información de la asignatura y fecha
- Se actualiza automáticamente si es necesario
- Puedo ocultar/mostrar el QR según necesite

### HU-017: Regenerar Código QR

**Como** docente  
**Quiero** poder regenerar el código QR durante la clase  
**Para** evitar que estudiantes ausentes marquen asistencia

**Criterios de Aceptación:**

- Puedo generar un nuevo QR manualmente
- El QR anterior se invalida automáticamente
- Los estudiantes deben usar el nuevo código
- Se registra la hora de regeneración

## Epic 6: Registro de Asistencia

### HU-018: Marcar Asistencia por QR (Estudiante)

**Como** estudiante  
**Quiero** escanear el código QR para marcar mi asistencia  
**Para** registrar que estoy presente en clase

**Criterios de Aceptación:**

- Puedo escanear el QR con mi teléfono
- Solo funciona si estoy inscrito en la asignatura
- Solo puedo marcar asistencia una vez por clase
- Recibo confirmación de asistencia registrada

### HU-019: Ver Estudiantes Presentes

**Como** docente  
**Quiero** ver en tiempo real qué estudiantes han marcado asistencia  
**Para** monitorear la participación

**Criterios de Aceptación:**

- Veo la lista actualizada de estudiantes presentes
- Se muestra la hora exacta de marcado
- Puedo distinguir entre presentes y ausentes
- La lista se actualiza automáticamente

### HU-020: Marcar Asistencia Manual

**Como** docente  
**Quiero** marcar manualmente la asistencia de estudiantes  
**Para** casos especiales o problemas técnicos

**Criterios de Aceptación:**

- Puedo cambiar estado de ausente a presente
- Puedo cambiar estado de presente a ausente
- Se registra quién hizo el cambio manual
- Requiere justificación del cambio

### HU-021: Ver Historial de Asistencia

**Como** docente  
**Quiero** consultar el historial de asistencia por estudiante  
**Para** hacer seguimiento académico

**Criterios de Aceptación:**

- Puedo filtrar por estudiante, fecha o asignatura
- Veo porcentaje de asistencia por período
- Puedo exportar reportes de asistencia
- Se muestran tanto presencias como ausencias

## Epic 7: Recordatorios y Notificaciones

### HU-022: Crear Recordatorio de Clase

**Como** docente  
**Quiero** crear recordatorios para mis clases  
**Para** que los estudiantes no olviden asistir

**Criterios de Aceptación:**

- Puedo crear recordatorios con título y descripción
- Puedo establecer fecha y hora de inicio y fin
- El recordatorio se asocia a una clase específica
- Puedo crear múltiples recordatorios por clase

### HU-023: Ver Recordatorios Activos

**Como** estudiante  
**Quiero** ver los recordatorios de mis clases  
**Para** estar al tanto de las actividades

**Criterios de Aceptación:**

- Veo solo recordatorios de asignaturas donde estoy inscrito
- Los recordatorios se ordenan por fecha
- Puedo marcar recordatorios como leídos
- Se destacan los recordatorios urgentes

### HU-024: Gestionar Recordatorios

**Como** docente  
**Quiero** editar o eliminar recordatorios creados  
**Para** mantener información actualizada

**Criterios de Aceptación:**

- Puedo modificar título, descripción y fechas
- Puedo cambiar estado a 'finalizado'
- Puedo eliminar recordatorios no enviados
- Los cambios se reflejan para todos los estudiantes

## Epic 8: Reportes y Estadísticas

### HU-025: Generar Reporte de Asistencia por Asignatura

**Como** docente  
**Quiero** generar reportes de asistencia de mis asignaturas  
**Para** evaluar la participación estudiantil

**Criterios de Aceptación:**

- Puedo seleccionar rango de fechas
- El reporte incluye estadísticas generales
- Puedo exportar en formato PDF o Excel
- Se incluyen gráficos de tendencias

### HU-026: Ver Estadísticas Personales de Asistencia

**Como** estudiante  
**Quiero** ver mis estadísticas de asistencia  
**Para** monitorear mi rendimiento académico

**Criterios de Aceptación:**

- Veo porcentaje de asistencia por asignatura
- Puedo ver historial detallado por fechas
- Se muestran tendencias mensuales
- Recibo alertas si mi asistencia es baja

### HU-027: Dashboard Administrativo

**Como** administrador  
**Quiero** ver estadísticas generales del sistema  
**Para** monitorear el uso y rendimiento

**Criterios de Aceptación:**

- Veo número total de usuarios activos
- Estadísticas de asignaturas y clases
- Reportes de asistencia globales
- Métricas de uso del sistema

## Epic 9: Gestión de Perfil y Configuración

### HU-028: Actualizar Perfil de Usuario

**Como** usuario del sistema  
**Quiero** actualizar mi información personal  
**Para** mantener mis datos actualizados

**Criterios de Aceptación:**

- Puedo cambiar mi nombre y correo
- Puedo actualizar mi contraseña
- Los cambios requieren confirmación
- Se valida que el correo siga siendo único

### HU-029: Gestión de Estados de Usuario

**Como** administrador  
**Quiero** activar/desactivar usuarios  
**Para** controlar el acceso al sistema

**Criterios de Aceptación:**

- Puedo cambiar estado de activo a inactivo
- Usuarios inactivos no pueden autenticarse
- Puedo reactivar usuarios cuando sea necesario
- Se mantiene histórico de cambios de estado

### HU-030: Configuración de Notificaciones

**Como** usuario del sistema  
**Quiero** configurar mis preferencias de notificaciones  
**Para** recibir información relevante

**Criterios de Aceptación:**

- Puedo elegir tipos de notificaciones a recibir
- Puedo configurar horarios de notificación
- Puedo desactivar notificaciones temporalmente
- Las preferencias se guardan por usuario

## Campos Adicionales Sugeridos para la Base de Datos

### Tabla: notificaciones

```sql
CREATE TABLE notificacion (
    noti_id INTEGER PRIMARY KEY AUTOINCREMENT,
    noti_titulo TEXT NOT NULL,
    noti_mensaje TEXT NOT NULL,
    noti_tipo TEXT CHECK (noti_tipo IN ('recordatorio', 'asistencia', 'sistema')) NOT NULL,
    noti_usuario_id INTEGER NOT NULL,
    noti_usuario_tipo TEXT CHECK (noti_usuario_tipo IN ('administrador', 'docente', 'estudiante')) NOT NULL,
    noti_leida BOOLEAN DEFAULT FALSE,
    noti_fecha_envio DATETIME DEFAULT CURRENT_TIMESTAMP,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Tabla: configuracion_usuario

```sql
CREATE TABLE configuracion_usuario (
    conf_id INTEGER PRIMARY KEY AUTOINCREMENT,
    conf_usuario_id INTEGER NOT NULL,
    conf_usuario_tipo TEXT CHECK (conf_usuario_tipo IN ('administrador', 'docente', 'estudiante')) NOT NULL,
    conf_notif_recordatorios BOOLEAN DEFAULT TRUE,
    conf_notif_asistencia BOOLEAN DEFAULT TRUE,
    conf_tema TEXT CHECK (conf_tema IN ('claro', 'oscuro')) DEFAULT 'claro',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### Modificación sugerida para tabla clase

```sql
-- Agregar columna para duración estimada y ubicación
ALTER TABLE clase ADD COLUMN clas_duracion_minutos INTEGER DEFAULT 90;
ALTER TABLE clase ADD COLUMN clas_ubicacion TEXT;
```

### Modificación sugerida para tabla asistencia

```sql
-- Agregar columnas para tracking de marcado
ALTER TABLE asistencia ADD COLUMN asis_hora_marcado TIME;
ALTER TABLE asistencia ADD COLUMN asis_metodo TEXT CHECK (asis_metodo IN ('qr', 'manual')) DEFAULT 'qr';
ALTER TABLE asistencia ADD COLUMN asis_marcado_por INTEGER; -- ID del docente si fue manual
```
