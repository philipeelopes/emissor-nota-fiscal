const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function status() {
  const resultado = await prisma.notaFiscal.groupBy({
    by: ["status"],
    _count: {
      _all: true
    }
  });

  return resultado.map(item => ({
    status: item.status,
    quantidade: item._count._all
  }));
}

module.exports = { status };