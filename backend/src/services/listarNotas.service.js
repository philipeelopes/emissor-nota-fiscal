const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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

  // Monta os filtros
  const filtros = {};

  if (status) filtros.status = status;
  if (cliente) filtros.clienteId = cliente; // Prisma relaciona pelo id
  if (tipo) filtros.tipo = tipo;
  if (numero) filtros.numero = Number(numero);

  if (dataInicio || dataFim) {
    filtros.dataEmissao = {};
    if (dataInicio) filtros.dataEmissao.gte = new Date(dataInicio);
    if (dataFim) filtros.dataEmissao.lte = new Date(dataFim);
  }

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

  // Prisma usa { field: 'asc' | 'desc' }
  const orderBy = {};
  orderBy[sortBy] = order.toLowerCase() === "asc" ? "asc" : "desc";

  // Conta total de registros
  const total = await prisma.notaFiscal.count({
    where: filtros
  });

  // Busca notas com cliente
  const notas = await prisma.notaFiscal.findMany({
    where: filtros,
    include: {
      cliente: {
        select: {
          id: true,
          nome: true,
          email: true,
          documento: true,
          endereco: true
        }
      }
    },
    orderBy,
    skip,
    take: limitNumber
  });

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