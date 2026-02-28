# 🎨 Frontend – Emissor de Notas Fiscais (NFS-e)

Aplicação frontend do sistema **Emissor de Notas Fiscais**, desenvolvida com **React** e **TypeScript**, focada em **usabilidade**, **responsividade** e **visualização de dados financeiros**.

Este frontend consome uma **API REST** própria, exibindo informações de notas fiscais, clientes e relatórios através de dashboards e gráficos interativos.

---

## 📸 Visão Geral

- Interface moderna e responsiva
- Dashboard com indicadores financeiros
- Listagem e detalhamento de notas fiscais
- Relatórios visuais por gráficos
- Navegação simples e intuitiva

---

## 🚀 Funcionalidades

### 🧾 Notas Fiscais
- Listagem de notas fiscais
- Visualização detalhada da nota
- Cancelamento de notas
- Exibição de status (Ativa / Cancelada)

### 👥 Clientes
- Listagem de clientes
- Visualização de clientes ativos
- Integração com notas fiscais

### 📊 Dashboard
- Total de notas emitidas
- Total de notas canceladas
- Valor total faturado
- Indicadores rápidos de negócio

### 📈 Relatórios
- Faturamento mensal
- Faturamento por cliente
- Comparativo de períodos
- Gráficos interativos (barras e linhas)

---

## 🛠 Tecnologias Utilizadas

- React
- TypeScript
- Vite
- React Router DOM
- Axios
- Recharts
- CSS Modules

---

## 🧱 Estrutura de Pastas

```text
src/
├── assets/
├── components/
├── pages/
│   ├── dashboard/
│   ├── notas/
│   ├── clientes/
│   └── relatorios/
├── services/
├── styles/
├── types/
└── main.tsx

⚙️ Configuração do Ambiente
Pré-requisitos

Node.js 18+

Gerenciador de pacotes (npm ou yarn)

Instalação
npm install
Variáveis de Ambiente

Crie um arquivo .env na raiz do frontend:

VITE_API_URL=http://localhost:3333
▶️ Executando o Projeto
Ambiente de Desenvolvimento
npm run dev

A aplicação estará disponível em:

http://localhost:5173
🌐 Integração com Backend

O frontend consome uma API REST responsável por:

Notas fiscais

Clientes

Dashboard

Relatórios

O backend deve estar em execução para que os dados sejam exibidos corretamente.

📱 Responsividade

A interface foi desenvolvida pensando em:

Desktop

Tablets

Smartphones

Permitindo acesso completo ao sistema através de dispositivos móveis.

🚀 Deploy (planejado)

O frontend está preparado para deploy em plataformas como:

Vercel

Netlify

Com simples configuração da variável:

VITE_API_URL=https://sua-api-em-producao.com
📌 Observações

Este frontend faz parte de um projeto maior e está em constante evolução.
Novas melhorias de UX, performance e validações estão previstas.

👨‍💻 Autor

Philipe L.
Estudante de Ciência da Computação
Desenvolvedor Frontend e Backend