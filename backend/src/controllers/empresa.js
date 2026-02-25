const { buscarOuCriarEmpresa } = require("../services/empresa.service");

async function buscarEmpresa(req, res) {
  try {
    const empresa = await buscarOuCriarEmpresa();
    return res.json(empresa);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Erro ao buscar empresa" });
  }
}

module.exports = {
  buscarEmpresa
};