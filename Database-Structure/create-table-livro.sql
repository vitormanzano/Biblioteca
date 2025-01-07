CREATE TABLE LIVRO (
    GUID CHAR(36) PRIMARY KEY,
    titulo VARCHAR2(100) NOT NULL,
    autor_guid CHAR(36),
    paginas INTEGER,
    FOREIGN KEY (autor_guid) REFERENCES autor(guid)
);