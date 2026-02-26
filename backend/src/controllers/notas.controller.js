const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* =========================
   CRIAR NOTA
========================= */
async function criar(req, res) {
  try {
    const { clienteId, tipo, itens, descricao, observacao } = req.body;

    if (!itens || itens.length === 0) {
      return res.status(400).json({ error: "A nota precisa ter ao menos um item" });
    }

    const valorTotal = itens.reduce(
      (total, item) => total + item.quantidade * item.valorUnitario,
      0
    );

    const ultimaNota = await prisma.notaFiscal.findFirst({
      orderBy: { numero: "desc" }
    });

    const novoNumero = ultimaNota ? ultimaNota.numero + 1 : 1;

    const nota = await prisma.notaFiscal.create({
      data: {
        clienteId,
        tipo,
        descricao,
        observacao,
        itens,
        valorTotal,
        numero: novoNumero,
        status: "EMITIDA"
      }
    });

    return res.status(201).json({
      success: true,
      data: nota
    });
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

/* =========================
   LISTAR NOTAS
========================= */
async function listar(req, res) {
  try {
    const {
      status,
      cliente,
      tipo,
      numero,
      page = 1,
      limit = 10
    } = req.query;

    const filtros = {};

    if (status) filtros.status = status;
    if (tipo) filtros.tipo = tipo;
    if (numero) filtros.numero = Number(numero);
    if (cliente) filtros.clienteId = cliente;

    const skip = (Number(page) - 1) * Number(limit);

    const [total, notas] = await Promise.all([
      prisma.notaFiscal.count({ where: filtros }),
      prisma.notaFiscal.findMany({
        where: filtros,
        include: {
          cliente: true
        },
        orderBy: { numero: "desc" },
        skip,
        take: Number(limit)
      })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
        notas
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   BUSCAR POR ID
========================= */
async function buscarPorId(req, res) {
  try {
    const nota = await prisma.notaFiscal.findUnique({
      where: { id: req.params.id },
      include: { cliente: true }
    });

    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }

    return res.status(200).json({
      success: true,
      data: nota
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   ATUALIZAR NOTA
========================= */
async function atualizar(req, res) {
  try {
    const { descricao, itens } = req.body;

    if (itens && itens.length === 0) {
      return res.status(400).json({ error: "A nota deve ter ao menos um item" });
    }

    let valorTotal;
    if (itens) {
      valorTotal = itens.reduce(
        (total, item) => total + item.quantidade * item.valorUnitario,
        0
      );
    }

    const nota = await prisma.notaFiscal.update({
      where: { id: req.params.id },
      data: {
        descricao,
        itens,
        valorTotal
      }
    });

    return res.status(201).json({
      success: true,
      data: nota
    });
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

/* =========================
   CANCELAR NOTA
========================= */
async function cancelar(req, res) {
  try {
    const nota = await prisma.notaFiscal.update({
      where: { id: req.params.id },
      data: { status: "CANCELADA" }
    });

    return res.status(200).json({
      success: true,
      data: nota
    });
  } catch (err) {
    return res.status(404).json({ error: "Nota não encontrada" });
  }
}

/* =========================
   DELETE BLOQUEADO
========================= */
function naoPermitirDelete(req, res) {
  return res.status(405).json({
    success: false,
    error: "Notas fiscais não podem ser deletadas. Utilize o cancelamento."
  });
}

/* =========================
   RESUMO DASHBOARD
========================= */
async function resumoDashboard(req, res) {
  try {
    const [totalNotas, notasCanceladas, valorEmitido] = await Promise.all([
      prisma.notaFiscal.count(),
      prisma.notaFiscal.count({ where: { status: "CANCELADA" } }),
      prisma.notaFiscal.aggregate({
        where: { status: "EMITIDA" },
        _sum: { valorTotal: true }
      })
    ]);

    return res.status(200).json({
      success: true,
      data: {
        totalNotas,
        notasCanceladas,
        valorTotal: valorEmitido._sum?.valorTotal ?? 0
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  cancelar,
  naoPermitirDelete,
  resumoDashboard
};