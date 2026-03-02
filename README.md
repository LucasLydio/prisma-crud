
# User CRUD with Profile — Express + Prisma

Tech documentation for a **CRUD system** that manages **Users** and **Profiles** using **Node.js + Express + Prisma ORM**.

This project satisfies the practical requirements:

- **Entities:** User + Profile  
- **Relationship:** **1:1 (User → Profile)**  
- **CRUD:** Full CRUD for **User** (and **Profile** routes included as requested)  
- **Create flow:** When creating a user, allow **creating the profile together**  
- **Email uniqueness:** Do **not** allow duplicate emails  
- **Listing:** List users including **profile data** using Prisma relation (`include`)  

---

## 1. Tech Stack

- **Runtime:** Node.js `X.Y.Z`
- **Framework:** Express `X.Y.Z`
- **ORM:** Prisma `X.Y.Z`
- **Database:** SQLite (dev) or PostgreSQL/MySQL (optional)

> Replace versions after installation:
```bash
node -v
npm -v
npx prisma -v
npm list express
```

---

## 2. Project Setup

### 2.1 Clone repository

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_FOLDER>
```

### 2.2 Install dependencies

```bash
npm install
```

### 2.3 Environment configuration

Create a `.env` file at the project root.

**Option A — SQLite (recommended for class/demo):**

```env
DATABASE_URL="file:./dev.db"
```

**Option B — PostgreSQL example:**

```env
DATABASE_URL="postgresql://user:pass@localhost:5432/crud_users?schema=public"
```

### 2.4 Prisma setup (generate + migrate)

```bash
npx prisma generate
npx prisma migrate dev
```

(Optional) Open Prisma Studio:

```bash
npx prisma studio
```

### 2.5 Run the API

Recommended scripts:

* `npm run dev` for development (nodemon/tsx/ts-node)
* `npm start` for production

Example:

```bash
npm run dev
```

Default URL:

* `http://localhost:3000`

---

## 3. Project Structure

Suggested structure (Controller / Service / Routes), aligned with a simple modular backend:

```txt
prisma/
  schema.prisma
  migrations/

src/
  server.ts
  app.ts

  prisma/
    client.ts

  routes/
    users.routes.ts
    profiles.routes.ts

  controllers/
    users.controller.ts
    profiles.controller.ts

  services/
    users.service.ts
    profiles.service.ts

  middlewares/
    error.middleware.ts

  utils/
    httpError.ts
```

### Responsibilities

* **routes/**: maps endpoints to controllers
* **controllers/**: HTTP layer (req/res), validation orchestration, status codes
* **services/**: business logic + Prisma queries
* **prisma/**: Prisma client instance and schema
* **middlewares/**: centralized error handler

---

## 4. Expected Database Modeling

### 4.1 Entities

#### User

* `id`
* `name`
* `email`
* `password`
* `profileId`

#### Profile

* `id`
* `profileName`

### 4.2 Constraints (Mandatory)

* `User.email` must be **unique**
* Relationship must be **1:1** (one user → one profile)

### 4.3 Prisma Modeling (Recommended)

This schema enforces:

* `email` unique
* `profileId` unique (guarantees 1:1)

```prisma
model User {
  id        String   @id @default(uuid())
  name      String
  email     String   @unique
  password  String
  profileId String   @unique
  profile   Profile  @relation(fields: [profileId], references: [id], onDelete: Cascade)

  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Profile {
  id          String @id @default(uuid())
  profileName String
  user        User?

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}
```

> Notes:

* `profileId @unique` makes the relationship truly **1:1**
* `onDelete: Cascade` ensures user deletion can remove profile relationship safely (you can adjust to your preference)

---

## 5. API Routes

Base URL:

* `http://localhost:3000`

### 5.1 Users (Required CRUD)

| Method | Route        | Description                                    |
| ------ | ------------ | ---------------------------------------------- |
| POST   | `/users`     | Create user (allows profile creation together) |
| GET    | `/users`     | List users (must include profile)              |
| GET    | `/users/:id` | Get user details (include profile)             |
| PUT    | `/users/:id` | Update user (optional profile update)          |
| DELETE | `/users/:id` | Delete user                                    |

### 5.2 Profiles (Included CRUD)

| Method | Route           | Description                                   |
| ------ | --------------- | --------------------------------------------- |
| POST   | `/profiles`     | Create profile                                |
| GET    | `/profiles`     | List profiles                                 |
| GET    | `/profiles/:id` | Get profile details (optionally include user) |
| PUT    | `/profiles/:id` | Update profile                                |
| DELETE | `/profiles/:id` | Delete profile                                |

---

## 6. Request/Response Examples

### 6.1 Create User with Profile (Required)

**POST** `/users`

Request:

```json
{
  "name": "John Doe",
  "email": "john@email.com",
  "password": "123456",
  "profile": {
    "profileName": "admin"
  }
}
```

Expected response (example):

```json
{
  "id": "0db46d6d-6e8d-4d5c-9f3a-9bbdd8b7e1d7",
  "name": "John Doe",
  "email": "john@email.com",
  "profile": {
    "id": "58a1dba9-0d18-4f46-9b2a-5cdd3aa3ed8a",
    "profileName": "admin"
  },
  "createdAt": "2026-03-02T12:00:00.000Z",
  "updatedAt": "2026-03-02T12:00:00.000Z"
}
```

Implementation notes:

* Use Prisma nested create:

  * `profile: { create: { profileName } }`
* Hash the password before saving (bcrypt)
* Handle duplicate email with Prisma error `P2002`

---

### 6.2 Duplicate Email Error (Required)

If a user tries to register using an email that already exists, the API must reject it.

Suggested error response:

```json
{
  "message": "Email already in use",
  "code": "EMAIL_DUPLICATE"
}
```

> Prisma will throw `P2002` for unique constraint violation.

---

### 6.3 List Users with Profile (Required)

**GET** `/users`

Expected response:

```json
[
  {
    "id": "0db46d6d-6e8d-4d5c-9f3a-9bbdd8b7e1d7",
    "name": "John Doe",
    "email": "john@email.com",
    "profile": {
      "id": "58a1dba9-0d18-4f46-9b2a-5cdd3aa3ed8a",
      "profileName": "admin"
    }
  }
]
```

Implementation notes:

* Use Prisma relation include:

  * `prisma.user.findMany({ include: { profile: true } })`

---

### 6.4 Get User by ID with Profile

**GET** `/users/:id`

Example:
**GET** `/users/0db46d6d-6e8d-4d5c-9f3a-9bbdd8b7e1d7`

Response:

```json
{
  "id": "0db46d6d-6e8d-4d5c-9f3a-9bbdd8b7e1d7",
  "name": "John Doe",
  "email": "john@email.com",
  "profile": {
    "id": "58a1dba9-0d18-4f46-9b2a-5cdd3aa3ed8a",
    "profileName": "admin"
  }
}
```

---

### 6.5 Update User (Optional profile update)

**PUT** `/users/:id`

Request (update name + profile name):

```json
{
  "name": "John Updated",
  "profile": {
    "profileName": "manager"
  }
}
```

Response:

```json
{
  "id": "0db46d6d-6e8d-4d5c-9f3a-9bbdd8b7e1d7",
  "name": "John Updated",
  "email": "john@email.com",
  "profile": {
    "id": "58a1dba9-0d18-4f46-9b2a-5cdd3aa3ed8a",
    "profileName": "manager"
  }
}
```

Implementation notes:

* Update user fields with `prisma.user.update(...)`
* Update profile through nested update:

  * `profile: { update: { profileName } }`

---

### 6.6 Delete User

**DELETE** `/users/:id`

Response:

```json
{
  "message": "User deleted successfully"
}
```

---

### 6.7 Create Profile (Profiles CRUD)

**POST** `/profiles`

Request:

```json
{
  "profileName": "admin"
}
```

Response:

```json
{
  "id": "b9cfe6d9-70bf-41a2-9d8e-3fd3b4c845f7",
  "profileName": "admin"
}
```

---

### 6.8 List Profiles

**GET** `/profiles`

Response:

```json
[
  {
    "id": "b9cfe6d9-70bf-41a2-9d8e-3fd3b4c845f7",
    "profileName": "admin"
  }
]
```

---

## 7. Quick Testing (cURL)

### Create user with profile

```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@email.com","password":"123456","profile":{"profileName":"admin"}}'
```

### List users

```bash
curl http://localhost:3000/users
```

### Create profile

```bash
curl -X POST http://localhost:3000/profiles \
  -H "Content-Type: application/json" \
  -d '{"profileName":"admin"}'
```

---

## 8. Delivery Checklist

* [ ] README includes: setup steps, dependencies, runtime version, ORM version
* [ ] User CRUD complete
* [ ] Profile routes included (CRUD)
* [ ] Create user with profile in same request
* [ ] Unique email enforced (Prisma unique + `P2002` handling)
* [ ] List users includes profile (Prisma `include`)

```
```
