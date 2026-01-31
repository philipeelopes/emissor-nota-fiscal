# 🧾 Emissor de Nota Fiscal – Backend API

API REST desenvolvida em **Node.js + Express + MongoDB**, simulando um sistema real de **emissão de notas fiscais**, com foco em **boas práticas**, **arquitetura escalável**, **testes automatizados** e pronta para uso em **ambiente corporativo**.

Este projeto foi construído para **portfólio**, mas seguindo padrões de um **sistema real utilizado por empresas**.

---

## 🚀 Tecnologias Utilizadas

* Node.js
* Express
* MongoDB + Mongoose
* Jest (testes automatizados)
* Supertest (testes de API)
* Nodemon (ambiente de desenvolvimento)
* Dotenv

---

## 📁 Estrutura do Projeto

```
src/
├── app.js
├── server.js
├── controllers/
│   ├── notas.controller.js
│   └── relatorios.controller.js
├── services/
│   ├── notas.service.js
│   ├── listarNotas.service.js
│   ├── atualizarNota.service.js
│   ├── cancelarNota.service.js
│   └── relatorios/
│       ├── faturamento.service.js
│       ├── mensal.service.js
│       └── status.service.js
├── models/
│   ├── NotaFiscal.js
│   └── Cliente.js
├── routes/
│   ├── notas.routes.js
│   ├── clientes.routes.js
│   └── relatorios.routes.js
├── middlewares/
│   └── error.middleware.js
└── tests/
```

### Healthcheck
GET /health


📌 **Arquitetura baseada em Controller + Service**, garantindo separação de responsabilidades e escalabilidade.

---

## 📌 Funcionalidades

### ✔️ Notas Fiscais

* Criar nota fiscal
* Listar notas com paginação, ordenação e filtros
* Buscar nota por ID
* Atualizar nota
* Cancelar nota (não permite exclusão física)

### ✔️ Relatórios

* Faturamento mensal
* Faturamento por cliente
* Quantidade de notas emitidas x canceladas

---

## 🧪 Testes Automatizados

O projeto possui **testes automatizados cobrindo regras de negócio, controllers e serviços**.

Executar testes:

```bash
npm test
```

Executar testes com cobertura:

```bash
npm test -- --coverage
```

📊 Cobertura atual inclui:

* Criação de notas
* Atualização
* Cancelamento
* Listagem com paginação
* Relatórios

---

## ⚙️ Configuração do Ambiente

### 1️⃣ Clonar o repositório

```bash
git clone <url-do-repositorio>
cd backend
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Criar arquivo `.env`

```env
PORT=3333
MONGO_URI=mongodb://localhost:27017/emissor-nota
```

### 4️⃣ Rodar o projeto

Modo desenvolvimento:

```bash
npm run dev
```

Modo produção:

```bash
npm start
```

---


## 🐳 Executando com Docker

O projeto está preparado para rodar via **Docker + Docker Compose**, incluindo MongoDB.

### Subir a aplicação:
```bash
docker-compose up --build

---



## 🌐 Rotas Principais

### Notas

* `POST /notas` → Criar nota
* `GET /notas` → Listar notas
* `GET /notas/:id` → Buscar nota por ID
* `PUT /notas/:id` → Atualizar nota
* `PATCH /notas/:id/cancelar` → Cancelar nota

### Relatórios

* `GET /relatorios/mensal`
* `GET /relatorios/por-cliente`
* `GET /relatorios/status`

---

## 📚 Documentação da API (Swagger)

A API possui documentação interativa gerada com **Swagger / OpenAPI**.

Após rodar o projeto, acesse:

http://localhost:3333/docs

Nela é possível:
- Visualizar todas as rotas
- Testar endpoints diretamente pelo navegador
- Ver exemplos de payloads e respostas

---

## 🧠 Boas Práticas Aplicadas

* Separação de responsabilidades (Controller / Service)
* Regras de negócio isoladas
* Testes automatizados desde o início
* Código preparado para escalar
* Padrão REST
* Tratamento de erros

---


## 👨‍💻 Autor

Projeto desenvolvido por **Philipe L**

🔗 Backend focado em aprendizado avançado, arquitetura limpa e padrões profissionais.

---

🚀 **Projeto pronto para uso real e apresentação em portfólio**
