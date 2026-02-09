const NotaFiscal = require("../../models/NotaFiscal");

async function total() {
  const resultado = await NotaFiscal.aggregate([
    {
      $match: {
        status: "EMITIDA",
        valorTotal: { $exists: true, $ne: null }
      }
    },
    {
      $group: {
        _id: null,
        total: { $sum: "$valorTotal" }
      }
    }
  ]);

  return resultado.length > 0 ? resultado[0].total : 0;
}

module.exports = { total };

