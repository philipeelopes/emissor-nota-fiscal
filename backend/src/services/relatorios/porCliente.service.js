const NotaFiscal = require("../../models/NotaFiscal");

async function porCliente(dataInicio, dataFim) {
  const match = {
    status: "EMITIDA"
  };

  if (dataInicio || dataFim) {
    match.dataEmissao = {};

    if (dataInicio) {
      match.dataEmissao.$gte = new Date(dataInicio);
    }

    if (dataFim) {
      const fim = new Date(dataFim);
      fim.setHours(23, 59, 59, 999);
      match.dataEmissao.$lte = fim;
    }
  }

  const resultado = await NotaFiscal.aggregate([
    { $match: match },
    {
      $group: {
        _id: "$cliente",
        totalFaturado: { $sum: "$valorTotal" },
        quantidadeDeNotas: { $sum: 1 }
      }
    },
    {
      $lookup: {
        from: "clientes",
        localField: "_id",
        foreignField: "_id",
        as: "cliente"
      }
    },
    { $unwind: "$cliente" },
    {
      $project: {
        _id: 0,
        cliente: "$cliente.nome",
        totalFaturado: 1,
        quantidadeNotas: "$quantidadeDeNotas"
      }
    },
    { $sort: { totalFaturado: -1 } }
  ]);

  return resultado;
}

module.exports = { porCliente };
