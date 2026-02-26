const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function buscarEmpresa(req, res) {
  try {
    const empresa = await prisma.empresa.findFirst();

    // fallback fictício (se não existir no banco)
    if (!empresa) {
      return res.status(200).json({
        success: true,
        data: {
          nomeFantasia: "Coral Vidros",
          cnpj: "00.123.456/0001-00",
          endereco: "Rua João Manoel Gomes",
          municipio: "Garopaba"
        }
      });
    }

    // empresa real do banco
    return res.status(200).json({
      success: true,
      data: {
        nomeFantasia: empresa.nome,
        cnpj: empresa.cnpj,
        endereco: empresa.endereco ?? "-",
        municipio: "Não informado"
      }
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Erro ao buscar empresa"
    });
  }
}

module.exports = { buscarEmpresa };