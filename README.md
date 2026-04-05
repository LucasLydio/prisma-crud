# Todo List API (Express + TypeScript + Prisma + Postgres)

API base para um todo-list, pensada para ser consumida por um frontend e por outros serviços (logs, analytics/contagens, etc.).

## Stack

- Node.js 20+
- Express + TypeScript
- Prisma + PostgreSQL
- JWT auth (`Authorization: Bearer <token>`)
- CORS adapter (configurado via `.env`)

## Quick Start (Local)

1) Instalar dependências

```bash
cd prisma-crud
npm install
```

2) Configurar variáveis de ambiente

Crie `.env` (baseado em `.env.example`) e ajuste os valores.

3) Subir Postgres (Docker)

```bash
npm run db:up
```

4) Criar tabelas + seeds (migrations Prisma)

```bash
npm run prisma:generate
npm run prisma:migrate
```

As migrations criam:
- Tabelas: `User`, `Profile`, `Task`
- Perfis seed: `admin` e `user`
- Usuário admin seed: `user@user.com` / `user1234`

5) Rodar a API

```bash
npm run dev
```

URL padrão: `http://localhost:3000`

## Padrão do Projeto (DTO + Repository + Service + Controller)

```txt
prisma/
  schema.prisma
  migrations/

src/
  server.ts
  prismaClient.ts

  config/
    env.ts
    database.ts

  adapters/
    http/
      cors.ts

  dtos/
    userDtos.ts
    profileDtos.ts
    taskDtos.ts

  repositories/
    userRepository.ts
    profileRepository.ts
    taskRepository.ts

  services/
    usersService.ts
    profilesService.ts
    tasksService.ts

  controllers/
    userController.ts
    profileController.ts
    taskController.ts

  routes/
    users.ts
    profiles.ts
    tasks.ts

  middlewares/
    auth.ts
    errorHandler.ts
```

Responsabilidades:
- `controllers/`: camada HTTP (DTO in/out, status codes)
- `services/`: regras de negócio
- `repositories/`: persistência (Prisma)
- `dtos/`: contratos de request/response + mappers
- `adapters/`: concerns HTTP (CORS)
- `config/`: env + database

## Variáveis de Ambiente

- `PORT` (default: `3000`)
- `DATABASE_URL` (Postgres connection string)
- `JWT_SECRET` (obrigatório)
- `CORS_ORIGINS` (default: `*`, aceita lista separada por vírgula e wildcards)

## Auth (JWT)

As rotas de `/tasks` exigem `Authorization: Bearer <jwt>`.

O middleware lê o user id do token via:
- `sub` (recomendado), ou
- `userId`

Para descobrir o `id` do usuário seed (`user@user.com`), use o Prisma Studio:

```bash
npm run prisma:studio
```

Para assinar um token (exemplo):

```bash
node -e "const jwt=require('jsonwebtoken'); console.log(jwt.sign({}, 'YOUR_JWT_SECRET', { subject: 'USER_ID', expiresIn: '1d' }))"
```

## Rotas

### Users
- `POST /users` `{ name, email, password }`
- `GET /users`
- `GET /users/:id`
- `PUT /users/:id` `{ name?, email?, password? }`
- `DELETE /users/:id`

### Profiles
- `POST /profiles` `{ profileName }`
- `GET /profiles`
- `GET /profiles/:id`
- `PUT /profiles/:id` `{ profileName? }`
- `DELETE /profiles/:id`

### Tasks (Autenticado)
- `POST /tasks` `{ title, done? }`
- `GET /tasks` (somente tasks do usuário autenticado)
- `GET /tasks/:id` (somente se for do usuário autenticado)
- `PUT /tasks/:id` `{ title?, done? }` (somente se for do usuário autenticado)
- `DELETE /tasks/:id` (somente se for do usuário autenticado)

## Exemplos (cURL)

Criar task:

```bash
curl -X POST http://localhost:3000/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <JWT>" \
  -d "{\"title\":\"Buy milk\"}"
```

Listar tasks:

```bash
curl http://localhost:3000/tasks -H "Authorization: Bearer <JWT>"
```
