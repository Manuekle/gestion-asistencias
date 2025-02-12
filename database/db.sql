-- Tabla: usuario (Solo para administradores)
CREATE TABLE usuario (
    usua_id INT PRIMARY KEY AUTO_INCREMENT,
    usua_nombre VARCHAR(100) NOT NULL,
    usua_correo VARCHAR(100) UNIQUE NOT NULL,
    usua_password VARCHAR(255) NOT NULL,
    usua_rol ENUM('administrador') NOT NULL,
    usua_estado BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: docente
CREATE TABLE docente (
    doc_id INT PRIMARY KEY AUTO_INCREMENT,
    doc_nombre VARCHAR(100) NOT NULL,
    doc_correo VARCHAR(100) UNIQUE NOT NULL,
    doc_password VARCHAR(255) NOT NULL,
    doc_estado BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: estudiante
CREATE TABLE estudiante (
    estu_id INT PRIMARY KEY AUTO_INCREMENT,
    estu_nombre VARCHAR(100) NOT NULL,
    estu_correo VARCHAR(100) UNIQUE NOT NULL,
    estu_password VARCHAR(255) NOT NULL,
    estu_estado BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: asignatura
CREATE TABLE asignatura (
    asig_id INT PRIMARY KEY AUTO_INCREMENT,
    asig_nombre VARCHAR(100) NOT NULL,
    asig_programa VARCHAR(100) NOT NULL,
    asig_descripcion VARCHAR(500) NOT NULL,
    asig_semestre INT NOT NULL,
    asig_grupo VARCHAR(10) NOT NULL,
    asig_slug VARCHAR(100) GENERATED ALWAYS AS (REPLACE(LOWER(asig_nombre), ' ', '-')) STORED,
    asig_docente_id INT NOT NULL,
    asig_imagen_url VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asig_docente_id) REFERENCES docente(doc_id)
);

-- Tabla: clase
CREATE TABLE clase (
    clas_id INT PRIMARY KEY AUTO_INCREMENT,
    clas_asig_id INT NOT NULL,
    clas_fecha DATE NOT NULL,
    clas_hora_inicio VARCHAR(50) NOT NULL,
    clas_hora_fin VARCHAR(50) NOT NULL,
    clas_estado ENUM('activa', 'finalizada') DEFAULT 'activa',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clas_asig_id) REFERENCES asignatura(asig_id)
);

-- Tabla: asistencia
CREATE TABLE asistencia (
    asis_id INT PRIMARY KEY AUTO_INCREMENT,
    asis_estu_id INT NOT NULL,
    asis_clas_id INT NOT NULL,
    asis_fecha DATE NOT NULL,
    asis_estado ENUM('presente', 'ausente') DEFAULT 'ausente',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asis_estu_id) REFERENCES estudiante(estu_id),
    FOREIGN KEY (asis_clas_id) REFERENCES clase(clas_id)
);

-- Tabla: codigo_qr
CREATE TABLE codigo_qr (
    codi_id INT AUTO_INCREMENT PRIMARY KEY,
    codi_valor VARCHAR(255) NOT NULL,
    codi_clas_id INT NOT NULL,
    codi_qr_image TEXT, -- Aquí guardamos la imagen en formato Base64
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codi_clas_id) REFERENCES clase(clas_id)
);
