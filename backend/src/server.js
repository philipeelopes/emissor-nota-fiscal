require("dotenv").config();
const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json()); // para ler JSON no corpo das requests

const prisma = new PrismaClient();
const PORT = process.env.PORT || 3333;

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// Exemplo de rota para listar clientes
app.get("/clientes", async (req, res) => {
  const clientes = await prisma.cliente.findMany({
    include: { notas: true } // traz as notas de cada cliente
  });
  res.json(clientes);
});

app.listen(PORT, () => {
  console.log("Servidor rodando na porta", PORT);
});