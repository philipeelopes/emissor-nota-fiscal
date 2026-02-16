
const NotaFiscal = require("../models/NotaFiscal");




// criar nota fiscal
async function criarNota({ cliente, tipo, itens, descricao }) {
  if (!itens || itens.length === 0) {
    throw new Error("A nota precisa ter ao menos um item");
  }

  for (const item of itens) {
    if (item.quantidade <= 0 || item.valorUnitario <= 0) {
      throw new Error(
        "Itens devem ter quantidade e valor unitário maiores que zero"
      );
    }
  }

  const valorTotal = itens.reduce(
    (total, item) => total + item.quantidade * item.valorUnitario,
    0
  );

  const ultimaNota = await NotaFiscal.findOne().sort({ numero: -1 });
  const novoNumero = ultimaNota ? ultimaNota.numero + 1 : 1;

  return NotaFiscal.create({
    cliente,
    tipo,
    descricao,
    itens,
    valorTotal,
    numero: novoNumero,
  });
}


async function buscarNotaPorId(id) {
  const nota = await NotaFiscal.findById(req.params.id)
    .populate({
      path: "cliente",
      select: "nome email documento endereco"
    });

  if (!nota) {
    return res.status(404).json({ error: "Nota não encontrada" });
  }

  // 🔒 defesa extra
  if (!nota.cliente) {
    nota.cliente = {
      nome: "Cliente removido",
      email: "-",
      documento: "-",
      endereco: "-"
    };
  }
}

  module.exports = {
    criarNota,
    buscarNotaPorId,
  };

