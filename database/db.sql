-- Tabla: usuario (Solo para administradores)
CREATE TABLE usuario (
    usua_id INTEGER PRIMARY KEY AUTOINCREMENT,
    usua_nombre TEXT NOT NULL,
    usua_correo TEXT UNIQUE NOT NULL,
    usua_password TEXT NOT NULL,
    rol TEXT CHECK (rol IN ('administrador')) NOT NULL,
    usua_estado BOOLEAN DEFAULT TRUE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: docente
CREATE TABLE docente (
    doc_id INTEGER PRIMARY KEY AUTOINCREMENT,
    doc_nombre TEXT NOT NULL,
    doc_correo TEXT UNIQUE NOT NULL,
    doc_password TEXT NOT NULL,
    doc_estado BOOLEAN DEFAULT TRUE,
    rol TEXT CHECK (rol IN ('docente')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: estudiante
CREATE TABLE estudiante (
    estu_id INTEGER PRIMARY KEY AUTOINCREMENT,
    estu_nombre TEXT NOT NULL,
    estu_correo TEXT UNIQUE NOT NULL,
    estu_password TEXT NOT NULL,
    estu_estado BOOLEAN DEFAULT TRUE,
    rol TEXT CHECK (rol IN ('estudiante')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Tabla: asignatura
CREATE TABLE asignatura (
    asig_id INTEGER PRIMARY KEY AUTOINCREMENT,
    asig_nombre TEXT NOT NULL,
    asig_programa TEXT NOT NULL,
    asig_descripcion TEXT NOT NULL,
    asig_semestre INTEGER NOT NULL,
    asig_grupo TEXT NOT NULL,
    asig_slug TEXT GENERATED ALWAYS AS (REPLACE(LOWER(asig_nombre), ' ', '-')) STORED,
    asig_docente_id INTEGER NOT NULL,
    asig_imagen_url TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asig_docente_id) REFERENCES docente(doc_id)
);

-- Tabla: clase
CREATE TABLE clase (
    clas_id INTEGER PRIMARY KEY AUTOINCREMENT,
    clas_asig_id INTEGER NOT NULL,
    clas_fecha DATE NOT NULL,
    clas_hora_inicio TEXT NOT NULL,
    clas_hora_fin TEXT NOT NULL,
    clas_estado TEXT CHECK (clas_estado IN ('activa', 'finalizada')) DEFAULT 'activa',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (clas_asig_id) REFERENCES asignatura(asig_id)
);

-- Tabla: asistencia
CREATE TABLE asistencia (
    asis_id INTEGER PRIMARY KEY AUTOINCREMENT,
    asis_estu_id INTEGER NOT NULL,
    asis_clas_id INTEGER NOT NULL,
    asis_fecha DATE NOT NULL,
    asis_estado TEXT CHECK (asis_estado IN ('presente', 'ausente')) DEFAULT 'ausente',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (asis_estu_id) REFERENCES estudiante(estu_id),
    FOREIGN KEY (asis_clas_id) REFERENCES clase(clas_id)
);

-- Tabla: codigo_qr
CREATE TABLE codigo_qr (
    codi_id INTEGER PRIMARY KEY AUTOINCREMENT,
    codi_valor TEXT NOT NULL,
    codi_url TEXT NOT NULL,
    codi_clas_id INTEGER NOT NULL,
    codi_qr_image TEXT, -- Aquí guardamos la imagen en formato Base64
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (codi_clas_id) REFERENCES clase(clas_id)
);
