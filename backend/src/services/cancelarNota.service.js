const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function cancelarNota(id) {
  // Busca a nota pelo id
  const nota = await prisma.notaFiscal.findUnique({
    where: { id },
  });

  if (!nota) {
    throw new Error("Nota não encontrada");
  }

  if (nota.status === "CANCELADA") {
    throw new Error("Nota já está cancelada");
  }

  // Atualiza o status para CANCELADA
  const notaAtualizada = await prisma.notaFiscal.update({
    where: { id },
    data: {
      status: "CANCELADA",
      updatedAt: new Date(), // Prisma atualiza updatedAt automaticamente se você usar @updatedAt, mas pode deixar explicitamente
    },
  });

  return notaAtualizada;
}

module.exports = { cancelarNota };