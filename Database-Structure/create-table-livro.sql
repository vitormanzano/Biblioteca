CREATE TABLE LIVRO (
    GUID CHAR(36) PRIMARY KEY,
    titulo VARCHAR2(100) NOT NULL,
    autor_guid VARCHAR2(100),
    paginas INTEGER,
    FOREIGN KEY (autor_guid) REFERENCES autor(guid)
);