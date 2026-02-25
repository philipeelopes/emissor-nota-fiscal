const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function total() {
  const resultado = await prisma.notaFiscal.aggregate({
    where: {
      status: "EMITIDA",
      valorTotal: {
        not: null
      }
    },
    _sum: {
      valorTotal: true
    }
  });

  return resultado._sum.valorTotal ?? 0;
}

module.exports = { total };