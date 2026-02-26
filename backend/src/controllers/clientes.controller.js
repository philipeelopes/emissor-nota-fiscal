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
        success: false,
        message: "Cliente não encontrado"
      });
    }

    if (!cliente.ativo) {
      return res.status(400).json({
        success: false,
        message: "Cliente já está inativo"
      });
    }

    // inativar (soft delete)
    await prisma.cliente.update({
      where: { id },
      data: { ativo: false }
    });

    return res.json({
      success: true,
      message: "Cliente inativado com sucesso"
    });

  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Erro ao inativar cliente"
    });
  }
}

module.exports = {
  deletarCliente
};