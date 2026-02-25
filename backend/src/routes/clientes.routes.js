const express = require("express");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();
const router = express.Router();

//=============
// Criar Cliente
router.post("/", async (req, res) => {
  try {
    const cliente = await prisma.cliente.create({
      data: { ...req.body, ativo: true }
    });
    return res.status(201).json(cliente);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

//===============
// Listar clientes
router.get("/", async (req, res) => {
  try {
    const clientes = await prisma.cliente.findMany({
      where: { ativo: true }
    });
    return res.json(clientes);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//=====================
// Buscar cliente por id
router.get("/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: req.params.id }
    });

    if (!cliente || !cliente.ativo) {
      return res.status(404).json({ error: "Cliente não encontrado" });
    }

    return res.json(cliente);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

//========================
// Atualizar cliente por id
router.put("/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.update({
      where: { id: req.params.id },
      data: req.body
    });

    return res.json(cliente);
  } catch (err) {
    if (err.code === "P2025") {
      // Prisma erro quando o registro não existe
      return res.status(404).json({ error: "Cliente não encontrado" });
    }
    return res.status(400).json({ error: err.message });
  }
});

//===============
// "Deletar" cliente (inativar)
router.delete("/:id", async (req, res) => {
  try {
    const cliente = await prisma.cliente.findUnique({
      where: { id: req.params.id }
    });

    if (!cliente) return res.status(404).json({ error: "Cliente não encontrado" });
    if (!cliente.ativo) return res.status(400).json({ error: "Cliente já está inativo" });

    await prisma.cliente.update({
      where: { id: req.params.id },
      data: { ativo: false }
    });

    return res.json({ message: "Cliente deletado com sucesso" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

module.exports = router;