# Teste da Fernanda

## Servidor

O servidor foi criado utilizando o [Feathers](http://feathersjs.com).

### Para rodar

npm start

### Rotas

- /login [autenticação com email e senha]
- /me [pega as informações do usuário logado a partir do token]
- POST /user [adiciona usuário]
- PATCH /user/:id [edita usuário]
- DELETE /user/:id [exclui usuário]
- POST /pet [adiciona pet]
- PATCH /pet/:id [edita pet]
- DELETE /pet/:id [exclui pet]
- GET users/?campo[operador]=valor [pega a lista de usuários, pode usar filtros]

## Cliente

O cliente foi criado utilizando o [Angular CLI](https://github.com/angular/angular-cli) version 10.1.6.

### Para rodar

ng serve --open

### Rotas

- /login [autenticação com email e senha]
- /user [inserção de usuário e seus pets]
- /user/:id [edição e exclusão de usuários, alteração dos pets]
- /users [lista de usuários e seus pets]

* O cadastro pode ser realizado na tela de login preenchendo os dados e clicando em cadastrar