# 🧾 Emissor de Nota Fiscal – Backend API

API REST desenvolvida em **Node.js + Express + PostgreSQL**, simulando um sistema real de **emissão de notas fiscais**, com foco em **boas práticas**, **arquitetura escalável**, **testes automatizados** e **containerização com Docker**.

Este projeto foi desenvolvido para **portfólio**, seguindo padrões utilizados em **aplicações corporativas reais**.

---

## 🚀 Tecnologias Utilizadas

- Node.js
- Express
- PostgreSQL
- Prisma ORM
- Jest
- Supertest
- Docker & Docker Compose
- Nodemon
- Dotenv

---

## 📁 Estrutura do Projeto


src/
├── app.js
├── server.js
├── controllers/
│ ├── notas.controller.js
│ └── relatorios.controller.js
├── services/
│ ├── notas.service.js
│ ├── listarNotas.service.js
│ ├── atualizarNota.service.js
│ ├── cancelarNota.service.js
│ └── relatorios/
│ ├── faturamento.service.js
│ ├── mensal.service.js
│ └── status.service.js
├── routes/
│ ├── notas.routes.js
│ ├── clientes.routes.js
│ └── relatorios.routes.js
├── middlewares/
│ └── error.middleware.js
├── prisma/
│ ├── schema.prisma
│ └── migrations/
└── tests/


📌 Arquitetura baseada em **Controller + Service**, garantindo:
- Separação de responsabilidades
- Código testável
- Facilidade de manutenção
- Escalabilidade

---

## 🩺 Healthcheck

```http
GET /health

Usado para verificar se a API está online.

📌 Funcionalidades
🧾 Notas Fiscais

Criar nota fiscal

Listar notas com paginação e filtros

Buscar nota por ID

Atualizar nota

Cancelar nota (sem exclusão física)

📊 Relatórios

Faturamento mensal

Faturamento por cliente

Total de notas emitidas

Total de notas canceladas

Dashboard resumido

🧪 Testes Automatizados

O projeto possui testes automatizados, cobrindo:

Controllers

Services

Regras de negócio

Executar testes
npm test
Executar testes com cobertura
npm test -- --coverage
⚙️ Configuração do Ambiente (Local)
1️⃣ Clonar o repositório
git clone <url-do-repositorio>
cd backend
2️⃣ Instalar dependências
npm install
3️⃣ Criar arquivo .env
PORT=3333
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/emissor_nf
4️⃣ Executar migrations
npx prisma migrate dev
5️⃣ Rodar o projeto

Modo desenvolvimento:

npm run dev

Modo produção:

npm start
🐳 Executando com Docker

O projeto está preparado para rodar com Docker + Docker Compose, incluindo o banco PostgreSQL.

Subir a aplicação:
docker-compose up --build

A API ficará disponível em:

http://localhost:3333
🌐 Principais Rotas
Notas

POST /notas

GET /notas

GET /notas/:id

PUT /notas/:id

PATCH /notas/:id/cancelar

Relatórios

GET /relatorios/dashboard

GET /relatorios/mensal

GET /relatorios/por-cliente

GET /relatorios/status

🔐 Boas Práticas Aplicadas

Separação de responsabilidades

Regras de negócio isoladas

Padrão REST

Tratamento global de erros

ORM com migrations versionadas

Ambiente isolado com Docker

Testes automatizados

🚀 Deploy (Planejado)

A API está preparada para deploy em plataformas como:

Railway

Render

Fly.io

Bastando configurar as variáveis de ambiente:

DATABASE_URL

PORT

👨‍💻 Autor

Projeto desenvolvido por Philipe L

Backend focado em aprendizado avançado, arquitetura limpa e padrões profissionais.