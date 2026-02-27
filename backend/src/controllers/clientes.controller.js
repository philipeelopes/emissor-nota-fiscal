const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function deletarCliente(req, res) {
  try {
    const { id } = req.params;

    const cliente = await prisma.cliente.findUnique({
      where: { id }
    });

    if (!cliente) {
      return res.status(404).json({
        error: "Cliente não encontrado"
      });
    }

    // Verificar se existem notas vinculadas
    const possuiNotas = await prisma.notaFiscal.count({
      where: { clienteId: id }
    });

    if (possuiNotas > 0) {
      return res.status(409).json({
        error: "Não é possível excluir este cliente pois ele possui notas fiscais cadastradas."
      });
    }

    //Exclusão lógica
    await prisma.cliente.update({
      where: { id },
      data: { ativo: false }
    });

    return res.json({
      message: "Cliente excluído com sucesso"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      error: "Erro interno ao excluir cliente"
    });
  }
}

module.exports = { deletarCliente };