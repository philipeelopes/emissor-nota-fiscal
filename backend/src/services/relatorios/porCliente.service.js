const NotaFiscal = require("../../models/NotaFiscal");




async function porCliente() {
  const resultado = await NotaFiscal.aggregate([
    { $match: { status: "EMITIDA" } },
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