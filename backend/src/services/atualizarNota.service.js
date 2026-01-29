const NotaFiscal = require("../models/NotaFiscal")


async function atualizarNota(id, { descricao, itens }) {
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

  const update = {};

  if (descricao !== undefined) update.descricao = descricao;

  if (itens) {
    update.itens = itens;
    update.valorTotal = itens.reduce(
      (total, item) => total + item.quantidade * item.valorUnitario,
      0
    );
  }

  const notaAtualizada = await NotaFiscal.findOneAndUpdate(
    { _id: id, status: { $ne: "CANCELADA" } },
    { $set: update },
    { new: true, runValidators: true }
  );

  if (!notaAtualizada) {
    throw new Error("Nota não encontrada ou cancelada");
  }

  return notaAtualizada;
}

module.exports = { atualizarNota };