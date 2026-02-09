const NotaFiscal = require("../../models/NotaFiscal");

async function total() {
  const resultado = await NotaFiscal.aggregate([
    { $match: { status: "EMITIDA" } },
    {
      $group: {
        _id: null,
        totalFaturado: { $sum: "$valorTotal" }
      }
    }
  ]);

  // Se não houver notas, retorna 0
  return resultado.length > 0 ? resultado[0].totalFaturado : 0;
}

module.exports = { total };
