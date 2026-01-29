const NotaFiscal = require("../../models/NotaFiscal");

async function status() {
  const resultado = await NotaFiscal.aggregate([
    {
      $group: {
        _id: "$status",
        quantidade: { $sum: 1 }
      }
    }
  ]);

  return resultado;
}

module.exports = { status };
