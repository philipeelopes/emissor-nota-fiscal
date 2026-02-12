const NotaFiscal = require("../../models/NotaFiscal");

async function comparacaoFaturamento(anoInicial, anoFinal) {
  const resultado = await NotaFiscal.aggregate([
    {
      $match: {
        status: "EMITIDA",
        dataEmissao: {
          $gte: new Date(anoInicial, 0, 1),
          $lte: new Date(anoFinal, 11, 31, 23, 59, 59)
        }
      }
    },
    {
      $group: {
        _id: {
          ano: { $year: "$dataEmissao" },
          mes: { $month: "$dataEmissao" }
        },
        total: { $sum: "$valorTotal" }
      }
    }
  ]);

  // Base com 12 meses
  const meses = [
    "Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
    "Jul", "Ago", "Set", "Out", "Nov", "Dez"
  ];

  return meses.map((mesNome, index) => {
    const mes = index + 1;

    const anoAnt = resultado.find(
      r => r._id.ano === anoInicial && r._id.mes === mes
    );

    const anoAtual = resultado.find(
      r => r._id.ano === anoFinal && r._id.mes === mes
    );

    return {
      mes: mesNome,
      anoAnterior: anoAnt?.total || 0,
      anoAtual: anoAtual?.total || 0
    };
  });
}

module.exports = {
  comparacaoFaturamento
};
