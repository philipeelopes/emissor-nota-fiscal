const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function atualizarNota(id, { descricao, itens }) {
  // Validação dos itens
  if (itens && (!Array.isArray(itens) || itens.length === 0)) {
    throw new Error("A nota deve ter ao menos um item");
  }

  if (itens) {
    for (const item of itens) {
      if (item.quantidade <= 0 || item.valorUnitario <= 0) {
        throw new Error(
          "Itens devem ter quantidade e valor unitário maiores que zero"
        );
      }
    }
  }

  // Busca a nota e verifica se não está cancelada
  const nota = await prisma.notaFiscal.findUnique({ where: { id } });

  if (!nota || nota.status === "CANCELADA") {
    throw new Error("Nota não encontrada ou cancelada");
  }

  // Monta os dados de atualização
  const updateData = {};
  if (descricao !== undefined) updateData.descricao = descricao;
  if (itens) {
    updateData.itens = itens; // Prisma aceita Json para arrays de objetos
    updateData.valorTotal = itens.reduce(
      (total, item) => total + item.quantidade * item.valorUnitario,
      0
    );
  }

  // Atualiza a nota
  const notaAtualizada = await prisma.notaFiscal.update({
    where: { id },
    data: updateData,
  });

  return notaAtualizada;
}

module.exports = { atualizarNota };