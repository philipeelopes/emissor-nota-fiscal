const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function criarNota({ clienteId, tipo, itens, descricao, observacao }) {
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

  // Último número de nota
  const ultimaNota = await prisma.notaFiscal.findFirst({
    orderBy: { numero: "desc" }
  });
  const novoNumero = ultimaNota ? ultimaNota.numero + 1 : 1;

  return prisma.notaFiscal.create({
    data: {
      clienteId,
      tipo,
      descricao,
      itens,      // Prisma permite JSON
      valorTotal,
      numero: novoNumero,
      observacao,
    }
  });
}

async function buscarNotaPorId(id) {
  const nota = await prisma.notaFiscal.findUnique({
    where: { id },
    include: {
      cliente: true, // traz os dados do cliente relacionado
    }
  });

  if (!nota) {
    throw new Error("Nota não encontrada");
  }

  if (!nota.cliente) {
    nota.cliente = {
      nome: "Cliente removido",
      email: "-",
      documento: "-",
      endereco: "-",
    };
  }

  return nota;
}

module.exports = {
  criarNota,
  buscarNotaPorId,
};