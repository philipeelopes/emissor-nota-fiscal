🧾 Emissor de Notas Fiscais (NFS-e) – Projeto Full Stack

Projeto full stack de emissão de notas fiscais, desenvolvido com foco em arquitetura limpa, boas práticas, regras de negócio, testes automatizados e visualização de dados financeiros.

Simula um cenário real de aplicação corporativa, indo além de um CRUD simples, com backend robusto e frontend orientado a dados.

⚠️ Aviso Importante (Deploy – Render)

A API está hospedada no plano gratuito do Render.
Na primeira requisição, o backend pode levar alguns segundos para inicializar.
Após esse tempo inicial, a aplicação funciona normalmente.

🧩 Visão Geral

O sistema é composto por duas partes principais:

🔧 Backend – API REST

Responsável por toda a lógica de negócio, persistência de dados e geração de relatórios.

Node.js + Express

PostgreSQL com Prisma ORM

Arquitetura em camadas (Controller + Service)

Testes automatizados (Jest + Supertest)

Docker e Docker Compose

Pronto para ambiente de produção

Funcionalidades:

Emissão, atualização e cancelamento de notas fiscais

Cancelamento lógico (sem exclusão física)

Listagem com filtros e paginação

Relatórios financeiros e dashboard

Healthcheck da API

🎨 Frontend – Aplicação Web

Interface moderna e responsiva para consumo da API e visualização dos dados.

React + TypeScript + Vite

Dashboard com indicadores financeiros

Relatórios visuais com gráficos interativos

Navegação simples e intuitiva

Layout responsivo (desktop, tablet e mobile)

Funcionalidades:

Listagem e detalhamento de notas fiscais

Visualização de clientes

Dashboard resumido de negócio

Relatórios de faturamento e status

⭐ Destaques Técnicos

Arquitetura em camadas (Controller + Service)

Separação clara de responsabilidades

Regras de negócio isoladas e testáveis

Relatórios agregados diretamente no banco

Cancelamento lógico de registros

Tratamento global de erros

Ambiente isolado com Docker

Frontend orientado a dados e dashboards

🛠 Stack Tecnológica
Backend

Node.js

Express

PostgreSQL

Prisma ORM

Jest & Supertest

Docker & Docker Compose

Frontend

React

TypeScript

Vite

Axios

React Router DOM

Recharts

CSS Modules

🚀 Objetivo do Projeto

Este projeto foi desenvolvido com o objetivo de:

Consolidar conhecimentos em backend e frontend

Aplicar boas práticas utilizadas no mercado

Trabalhar com arquitetura escalável

Criar um projeto de portfólio full stack profissional

👨‍💻 Autor

Projeto desenvolvido individualmente por Philipe L
Estudante de Ciência da Computação
Desenvolvedor Frontend e Backend