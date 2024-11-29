CREATE TABLE usuario (
    usua_id INT PRIMARY KEY AUTO_INCREMENT,
    usua_nombre VARCHAR(100) NOT NULL,
    usua_correo VARCHAR(100) UNIQUE NOT NULL,
    usua_password VARCHAR(255) NOT NULL,
    usua_rol ENUM('administrador', 'docente', 'estudiante') NOT NULL,
    usua_estado BOOLEAN DEFAULT TRUE
);


CREATE TABLE asignatura (
    asig_id INT PRIMARY KEY AUTO_INCREMENT,
    asig_nombre VARCHAR(100) NOT NULL,
    asig_codigo VARCHAR(20) UNIQUE NOT NULL
);


CREATE TABLE clase (
    clas_id INT PRIMARY KEY AUTO_INCREMENT,
    clas_fecha DATE NOT NULL,
    clas_hora_inicio TIME NOT NULL,
    clas_hora_fin TIME NOT NULL,
    clas_asig_id INT NOT NULL,
    clas_docente_id INT NOT NULL,
    FOREIGN KEY (clas_asig_id) REFERENCES asignatura(asig_id),
    FOREIGN KEY (clas_docente_id) REFERENCES usuario(usua_id)
);


CREATE TABLE codigo_qr (
    codi_id INT PRIMARY KEY AUTO_INCREMENT,
    codi_valor VARCHAR(255) NOT NULL,
    codi_fecha_generacion DATETIME DEFAULT CURRENT_TIMESTAMP,
    codi_clas_id INT NOT NULL,
    FOREIGN KEY (codi_clas_id) REFERENCES clase(clas_id)
);


CREATE TABLE asistencia (
    asis_id INT PRIMARY KEY AUTO_INCREMENT,
    asis_fecha_registro DATETIME DEFAULT CURRENT_TIMESTAMP,
    asis_estudiante_id INT NOT NULL,
    asis_clas_id INT NOT NULL,
    asis_validado BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (asis_estudiante_id) REFERENCES usuario(usua_id),
    FOREIGN KEY (asis_clas_id) REFERENCES clase(clas_id)
);


CREATE TABLE horario (
    hora_id INT PRIMARY KEY AUTO_INCREMENT,
    hora_dia ENUM('lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado', 'domingo') NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fin TIME NOT NULL,
    hora_asig_id INT NOT NULL,
    hora_docente_id INT NOT NULL,
    FOREIGN KEY (hora_asig_id) REFERENCES asignatura(asig_id),
    FOREIGN KEY (hora_docente_id) REFERENCES usuario(usua_id)
);


CREATE TABLE reporte (
    repo_id INT PRIMARY KEY AUTO_INCREMENT,
    repo_fecha_inicio DATE NOT NULL,
    repo_fecha_fin DATE NOT NULL,
    repo_generado_por INT NOT NULL,
    repo_detalle TEXT,
    FOREIGN KEY (repo_generado_por) REFERENCES usuario(usua_id)
);
