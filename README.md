### Repositório voltado para desafio

## To Do Olhar180 - Desafio Backend

- Descrição do desafio no arquivo `olhar180.txt`

## Como rodar o projeto

1. Clone o repositório
2. Entre na pasta `todo-backend`
3. Configura o arquivo `.env` com as variáveis de ambiente

```env
{
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/taskdb"
JWT_SECRET='olhar180'
JWT_EXPIRES_IN='8h'
}
```

4. Execute o comando `sudo docker-compose up --build` ou `docker-compose up --build` caso esteja no Windows
5. Existem 2 usuários, um ADMIN e um USER

###### Usuário admin

```json
{
  "name": "admin@olhar180.com",
  "password": "admin123"
}
```

###### Usuário padrão

```json
{
  "name": "user@olhar180.com",
  "password": "user123"
}
```

## Tecnologias utilizadas

- TypeScript
- Node.js
- Nest.js
- Prisma
- Docker
- Postgres
