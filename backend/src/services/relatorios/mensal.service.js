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

  return resultado;
}

module.exports = { mensal };
