const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function mensal() {
  const notas = await prisma.notaFiscal.findMany({
    where: {
      status: "EMITIDA"
    },
    select: {
      dataEmissao: true,
      valorTotal: true
    }
  });

  const mapa = {};

  for (const nota of notas) {
    const data = new Date(nota.dataEmissao);
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = data.getFullYear();
    const chave = `${ano}-${mes}`;

    if (!mapa[chave]) {
      mapa[chave] = 0;
    }

    mapa[chave] += nota.valorTotal;
  }

  return Object.entries(mapa)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([chave, total]) => {
      const [ano, mes] = chave.split("-");
      return {
        mes: `${mes}/${ano}`,
        total
      };
    });
}

module.exports = { mensal };