# Biblioteca
Uma API que funciona como uma biblioteca onde temos o CRUD de livros, pensando em arquitetura, como estruturar um projeto simples, mas que leva dentro de si, uma arquitetura onde nós sabemos onde procurar o que queremos, e que seja facíl de entender o que cada rota faz. Por enquanto não foi acabado a parte de livros lidos, ou como seria o modelo da livraria/biblioteca.

## Tecnologias utilizadas

- Node.js
- Typescript
- Express
- Oracle

## Modelagem Banco

![Modelagem Conceitual do projeto](Database-Structure/ConceptualModel.png)
![Modelagem lógica do projeto](Database-Structure/LogicModel.png)

## Rotas

<b>https://localhost:3333</b>
<i><b>Todas as rotas tem um /api antes </b></i>

- GET /books - Retorna todos os livros.
- GET /books/:guid - Retorna um livro com o guid do parâmetro.
- GET /books/search/:title - Retorna um livro com o título do parâmetro.

- DELETE /books/:guid - Deleta um livro com o guid do parâmetro.

- POST /books - Insere/Cria um livro.

- PATCH /books/:guid - Modifica um livro com o guid do parâmetro.
