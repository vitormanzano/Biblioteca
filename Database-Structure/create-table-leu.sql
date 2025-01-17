CREATE TABLE LEU (
    FK_USUARIO_cpf CHAR(11),
    FK_LIVRO_GUID CHAR(36),
    PRIMARY KEY (FK_USUARIO_cpf, FK_LIVRO_GUID),
    FOREIGN KEY (FK_USUARIO_cpf) REFERENCES USUARIO(cpf),
    FOREIGN KEY (FK_LIVRO_GUID) REFERENCES LIVRO(guid)
);