const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function resumoDashboard() {
  const totalNotas = await prisma.notaFiscal.count();

  const notasCanceladas = await prisma.notaFiscal.count({
    where: { status: "CANCELADA" }
  });

  const valorEmitido = await prisma.notaFiscal.aggregate({
    where: { status: "EMITIDA" },
    _sum: {
      valorTotal: true
    }
  });

  const totalClientes = await prisma.cliente.count();

  return {
    totalNotas,
    notasCanceladas,
    valorEmitido: valorEmitido._sum.valorTotal ?? 0,
    totalClientes
  };
}

module.exports = { resumoDashboard };