const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function faturamento({ dataInicio, dataFim }) {
  const where = {
    status: "EMITIDA"
  };

  if (dataInicio || dataFim) {
    where.dataEmissao = {};

    if (dataInicio) where.dataEmissao.gte = new Date(dataInicio);
    if (dataFim) where.dataEmissao.lte = new Date(dataFim);
  }

  const resultado = await prisma.notaFiscal.aggregate({
    where,
    _sum: {
      valorTotal: true
    },
    _count: {
      id: true
    }
  });

  return {
    totalFaturado: resultado._sum.valorTotal ?? 0,
    quantidadeDeNotas: resultado._count.id ?? 0
  };
}

module.exports = { faturamento };