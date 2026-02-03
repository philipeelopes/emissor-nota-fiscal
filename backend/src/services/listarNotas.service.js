const NotaFiscal = require("../models/NotaFiscal");


async function listarNotas(query) {
  const {
    status,
    cliente,
    tipo,
    numero,
    dataInicio,
    dataFim,
    page = 1,
    limit = 10,
    sortBy = "numero",
    order = "desc"
  } = query;

  const filtros = {};

  if (status) filtros.status = status;
  if (cliente) filtros.cliente = cliente;
  if (tipo) filtros.tipo = tipo;
  if (numero) filtros.numero = Number(numero);

  if (dataInicio || dataFim) {
    filtros.dataEmissao = {};
    if (dataInicio) filtros.dataEmissao.$gte = new Date(dataInicio);
    if (dataFim) filtros.dataEmissao.$lte = new Date(dataFim);
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const sort = {};
  sort[sortBy] = order === "asc" ? 1 : -1;

  const total = await NotaFiscal.countDocuments(filtros);

  const notas = await NotaFiscal.find(filtros)
    .populate("cliente")
    .sort(sort)
    .skip(skip)
    .limit(limitNumber);

  return {
    total,
    page: pageNumber,
    limit: limitNumber,
    totalPages: Math.ceil(total / limitNumber),
    sortBy,
    order,
    notas
  };
}




module.exports = { listarNotas };

