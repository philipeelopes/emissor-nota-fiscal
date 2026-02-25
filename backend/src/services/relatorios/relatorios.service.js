const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function comparacaoFaturamento(anoInicial, anoFinal) {
  const inicio = new Date(anoInicial, 0, 1);
  const fim = new Date(anoFinal, 11, 31, 23, 59, 59);

  const notas = await prisma.notaFiscal.findMany({
    where: {
      status: "EMITIDA",
      dataEmissao: {
        gte: inicio,
        lte: fim
      }
    },
    select: {
      valorTotal: true,
      dataEmissao: true
    }
  });

  // Mapa: ano-mes => total
  const mapa = {};

  for (const nota of notas) {
    const ano = nota.dataEmissao.getFullYear();
    const mes = nota.dataEmissao.getMonth() + 1; // 1 a 12
    const chave = `${ano}-${mes}`;

    mapa[chave] = (mapa[chave] || 0) + nota.valorTotal;
  }

  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return meses.map((mesNome, index) => {
    const mes = index + 1;

    return {
      mes: mesNome,
      anoAnterior: mapa[`${anoInicial}-${mes}`] || 0,
      anoAtual: mapa[`${anoFinal}-${mes}`] || 0
    };
  });
}

module.exports = { comparacaoFaturamento };