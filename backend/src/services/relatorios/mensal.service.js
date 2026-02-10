const NotaFiscal = require("../../models/NotaFiscal");

async function mensal() {
  const resultado = await NotaFiscal.aggregate([
    { $match: { status: "EMITIDA" } },
    {
      $group: {
        _id: {
          ano: { $year: "$dataEmissao" },
          mes: { $month: "$dataEmissao" }
        },
        totalFaturado: { $sum: "$valorTotal" }
      }
    },
    { $sort: { "_id.ano": 1, "_id.mes": 1 } }
  ]);

  return resultado.map(item => ({
    mes: `${String(item._id.mes).padStart(2, "0")}/${item._id.ano}`,
    total: item.totalFaturado
  }))
}

module.exports = { mensal };
