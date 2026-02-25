const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function totalClientes() {
  return await prisma.cliente.count();
}

module.exports = { totalClientes };