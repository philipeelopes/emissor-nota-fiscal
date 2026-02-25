const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function porCliente(dataInicio, dataFim) {
  const where = {
    status: "EMITIDA"
  };

  if (dataInicio || dataFim) {
    where.dataEmissao = {};

    if (dataInicio) {
      where.dataEmissao.gte = new Date(dataInicio);
    }

    if (dataFim) {
      const fim = new Date(dataFim);
      fim.setHours(23, 59, 59, 999);
      where.dataEmissao.lte = fim;
    }
  }

  const notas = await prisma.notaFiscal.findMany({
    where,
    include: {
      cliente: {
        select: {
          nome: true
        }
      }
    }
  });

  const mapa = {};

  for (const nota of notas) {
    const clienteNome = nota.cliente?.nome ?? "Cliente removido";

    if (!mapa[clienteNome]) {
      mapa[clienteNome] = {
        cliente: clienteNome,
        totalFaturado: 0,
        quantidadeNotas: 0
      };
    }

    mapa[clienteNome].totalFaturado += nota.valorTotal;
    mapa[clienteNome].quantidadeNotas += 1;
  }

  return Object.values(mapa).sort(
    (a, b) => b.totalFaturado - a.totalFaturado
  );
}

module.exports = { porCliente };