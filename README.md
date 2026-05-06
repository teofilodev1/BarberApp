# ✂️ Barbearia API

> API REST completa para gerenciamento de barbearia — agendamentos, barbeiros, serviços e autenticação JWT.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)

---

## 📋 Índice

- [Sobre o Projeto](#-sobre-o-projeto)
- [Tecnologias](#-tecnologias)
- [Arquitetura do Banco de Dados](#-arquitetura-do-banco-de-dados)
- [Instalação](#-instalação)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Rodando o Projeto](#-rodando-o-projeto)
- [Rotas da API](#-rotas-da-api)
- [Autenticação](#-autenticação)
- [Estrutura de Pastas](#-estrutura-de-pastas)

---

## 💈 Sobre o Projeto

API desenvolvida para gerenciar uma barbearia completa. O sistema permite:

- Cadastro e login de **clientes** e **barbeiros** com autenticação JWT
- Gerenciamento de **serviços** (cortes, químicas, etc.)
- **Agendamentos** vinculados a clientes, barbeiros e serviços
- **Histórico** de atendimentos realizados
- Controle de **horários de funcionamento**

---

## 🚀 Tecnologias

| Tecnologia | Uso |
|---|---|
| **Node.js** | Runtime JavaScript |
| **Express** | Framework HTTP |
| **Prisma ORM** | Comunicação com banco de dados |
| **PostgreSQL** | Banco de dados relacional |
| **JWT** | Autenticação via token |
| **Bcrypt** | Hash de senhas |
| **Helmet** | Segurança HTTP |
| **CORS** | Controle de origem das requisições |
| **Dotenv** | Variáveis de ambiente |

---

## 🗄️ Arquitetura do Banco de Dados

```
User 1 ──────────── N Agendamento
Servico 1 ────────── N Agendamento
Barbeiro 1 ────────── N Agendamento
Agendamento 1 ─────── 1 Historico
```

### Models

#### `User`
| Campo | Tipo | Descrição |
|---|---|---|
| id | Int | Chave primária |
| email | String | Único |
| nome | String? | Opcional |
| telefone | String | Único |
| senha | String | Hash bcrypt |
| role | String | Padrão: `"cliente"` |
| createdAt | DateTime | Automático |

#### `Barbeiro`
| Campo | Tipo | Descrição |
|---|---|---|
| id | Int | Chave primária |
| nome | String | Obrigatório |
| email | String | Único |
| senha | String | Hash bcrypt |
| especialidade | String | Ex: "Corte", "Barba" |
| experiencia | String? | Opcional |
| imageUrl | String? | Foto do barbeiro |
| isActive | Boolean | Padrão: `true` |

#### `Servico`
| Campo | Tipo | Descrição |
|---|---|---|
| id | String | UUID |
| name | String | Nome do serviço |
| price | Decimal | Ex: `49.90` |
| durationMin | Int | Duração em minutos |
| category | String? | Ex: "quimica", "corte" |
| imageUrl | String? | Foto do serviço |
| isActive | Boolean | Padrão: `true` |

#### `Agendamento`
| Campo | Tipo | Descrição |
|---|---|---|
| id | Int | Chave primária |
| horario | DateTime | Data e hora |
| forma_pagamento | Enum | `PIX`, `CARTAO`, `DINHEIRO` |
| status | Enum | `PENDENTE`, `CONCLUIDO`, `CANCELADO` |
| userId | Int | FK → User |
| servicoId | String | FK → Servico |
| barbeiroId | Int? | FK → Barbeiro (opcional) |

#### `Horarios`
| Campo | Tipo | Descrição |
|---|---|---|
| diaSemana | String | Ex: "segunda" |
| abertura | Int | Minutos desde meia-noite (ex: 480 = 08:00) |
| fechamento | Int | Ex: 1080 = 18:00 |
| ativo | Boolean | Se o dia está funcionando |

---

## ⚙️ Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/barbearia-api.git

# Entre na pasta
cd barbearia-api

# Instale as dependências
npm install
```

---

## 🔑 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/barbearia"
JWT_SECRET="sua_chave_secreta_aqui"
PORT=3000
```

---

## ▶️ Rodando o Projeto

```bash
# Rodar as migrations do banco
npx prisma migrate dev

# Visualizar o banco no Prisma Studio
npx prisma studio

# Rodar em desenvolvimento
npm run dev

# Rodar em produção
npm start
```

---

## 📡 Rotas da API

### 👤 Usuários — `/api`

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| POST | `/api/register` | Cadastrar usuário | ❌ |
| POST | `/api/login` | Login do usuário | ❌ |

### ✂️ Serviços — `/api`

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/servicos` | Listar serviços | ❌ |
| POST | `/api/servicos` | Criar serviço | ✅ |
| DELETE | `/api/servicos` | Deletar serviço | ✅ |

### 💈 Barbeiros — `/api`

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/barbeiros` | Listar barbeiros | ❌ |
| POST | `/api/barbeiros` | Cadastrar barbeiro | ✅ |
| POST | `/api/barbeiros/login` | Login do barbeiro | ❌ |
| DELETE | `/api/barbeiros` | Deletar barbeiro | ✅ |

### 📅 Horários — `/api`

| Método | Rota | Descrição | Auth |
|---|---|---|---|
| GET | `/api/horarios` | Listar horários | ❌ |

---

## 🔐 Autenticação

A API usa **JWT (JSON Web Token)**. Após o login, inclua o token no header de todas as rotas protegidas:

```
Authorization: Bearer <seu_token_aqui>
```

O token expira em **3 horas**.

### Exemplo de login — Barbeiro

```json
POST /api/barbeiros/login

{
  "email": "joao@barbearia.com",
  "senha": "123456"
}
```

Resposta:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "barbeiro": {
    "id": 1,
    "nome": "João",
    "email": "joao@barbearia.com",
    "especialidade": "Corte de cabelo"
  }
}
```

---

## 📁 Estrutura de Pastas

```
barbearia-api/
├── prisma/
│   ├── schema.prisma        # Models do banco de dados
│   └── migrations/          # Histórico de migrations
├── src/
│   ├── controllers/         # Lógica das rotas
│   ├── routes/              # Definição das rotas
│   ├── middleware/          # Auth middleware (JWT)
│   └── lib/
│       └── prisma.js        # Instância do Prisma + conexão
├── .env                     # Variáveis de ambiente
├── server.js                # Entry point
└── package.json
```

---

## 🛡️ Segurança

- Senhas armazenadas com **hash bcrypt** (salt rounds: 10)
- Dados sensíveis dos barbeiros (email, senha) **nunca retornados** nas listagens
- Headers de segurança via **Helmet**
- Token JWT com expiração de **3 horas**
- Validação de campos obrigatórios em todas as rotas

---

<p align="center">Feito com ☕ e muito código</p>