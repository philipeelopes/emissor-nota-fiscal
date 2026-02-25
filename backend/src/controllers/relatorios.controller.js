const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

/* =========================
   FATURAMENTO
========================= */
async function faturamento(req, res) {
  try {
    const { dataInicio, dataFim } = req.query;

    const filtros = { status: "EMITIDA" };

    if (dataInicio || dataFim) {
      filtros.dataEmissao = {};
      if (dataInicio) filtros.dataEmissao.gte = new Date(dataInicio);
      if (dataFim) {
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);
        filtros.dataEmissao.lte = fim;
      }
    }

    const resultado = await prisma.notaFiscal.aggregate({
      _sum: { valorTotal: true },
      _count: { id: true },
      where: filtros
    });

    return res.json({
      totalFaturado: resultado._sum.valorTotal || 0,
      quantidadeDeNotas: resultado._count.id || 0
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   FATURAMENTO POR CLIENTE
========================= */
async function porCliente(req, res) {
  try {
    const { dataInicio, dataFim } = req.query;

    const filtros = { status: "EMITIDA" };
    if (dataInicio || dataFim) {
      filtros.dataEmissao = {};
      if (dataInicio) filtros.dataEmissao.gte = new Date(dataInicio);
      if (dataFim) {
        const fim = new Date(dataFim);
        fim.setHours(23, 59, 59, 999);
        filtros.dataEmissao.lte = fim;
      }
    }

    const resultado = await prisma.notaFiscal.groupBy({
      by: ["clienteId"],
      where: filtros,
      _sum: { valorTotal: true },
      _count: { id: true },
      orderBy: { _sum: { valorTotal: "desc" } }
    });

    // Adicionar nome do cliente
    const dados = await Promise.all(
      resultado.map(async r => {
        const cliente = await prisma.cliente.findUnique({ where: { id: r.clienteId } });
        return {
          cliente: cliente?.nome || "Cliente removido",
          totalFaturado: r._sum.valorTotal || 0,
          quantidadeNotas: r._count.id || 0
        };
      })
    );

    return res.json(dados);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   STATUS
========================= */
async function status(req, res) {
  try {
    const resultado = await prisma.notaFiscal.groupBy({
      by: ["status"],
      _count: { id: true }
    });

    return res.json(resultado.map(r => ({ status: r.status, quantidade: r._count.id })));
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   FATURAMENTO MENSAL
========================= */
async function mensal(req, res) {
  try {
    console.log("Query recebida:", req.query); // ver o que o frontend mandou
    const todasNotas = await prisma.notaFiscal.findMany({
      where: { status: "EMITIDA" },
      select: { valorTotal: true, dataEmissao: true }
    });
    console.log("Notas encontradas:", todasNotas.length); // ver se retornou algo

    const meses = {};
    todasNotas.forEach(n => {
      if (!n.dataEmissao) {
        console.log("Nota sem dataEmissao:", n);
        return;
      }
      meses[`${n.dataEmissao.getMonth() + 1}/${n.dataEmissao.getFullYear()}`] =
        (meses[`${n.dataEmissao.getMonth() + 1}/${n.dataEmissao.getFullYear()}`] || 0) +
        n.valorTotal;
    });

    const resultado = Object.entries(meses).map(([mes, total]) => ({ mes, total }));
    return res.json(resultado);
  } catch (err) {
    console.error("Erro no mensal:", err);
    return res.status(500).json({ error: err.message });
  }
}

/* =========================
   TOTAL DE CLIENTES
========================= */
async function totalClientes(req, res) {
  try {
    const total = await prisma.cliente.count();
    return res.status(200).json({ success: true, total: total ?? 0 });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: "Erro ao carregar total do dashboard" });
  }
}

/* =========================
   DASHBOARD
========================= */
async function dashboard(req, res) {
  try {
    const totalNotas = await prisma.notaFiscal.count();
    const notasCanceladas = await prisma.notaFiscal.count({ where: { status: "CANCELADA" } });
    const valorEmitidoAgg = await prisma.notaFiscal.aggregate({
      _sum: { valorTotal: true },
      where: { status: "EMITIDA" }
    });

    return res.status(200).json({
      totalNotas,
      notasCanceladas,
      valorTotal: valorEmitidoAgg._sum.valorTotal || 0
    });
  } catch (err) {
    console.error(err);
    return res.status(400).json({ success: false, message: "Erro ao carregar dados do dashboard" });
  }
}

/* =========================
   COMPARAÇÃO DE FATURAMENTO
========================= */
async function comparacaoFaturamento(req, res) {
  try {
    const anoInicial = Number(req.query.anoInicial);
    const anoFinal = Number(req.query.anoFinal);

    const todasNotas = await prisma.notaFiscal.findMany({
      where: {
        status: "EMITIDA",
        dataEmissao: {
          gte: new Date(anoInicial, 0, 1),
          lte: new Date(anoFinal, 11, 31, 23, 59, 59)
        }
      },
      select: { valorTotal: true, dataEmissao: true }
    });

    const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

    const resultado = meses.map((mesNome, index) => {
      const mes = index + 1;

      const anoAnt = todasNotas.filter(
        n => n.dataEmissao.getFullYear() === anoInicial && n.dataEmissao.getMonth() + 1 === mes
      ).reduce((acc, n) => acc + n.valorTotal, 0);

      const anoAtual = todasNotas.filter(
        n => n.dataEmissao.getFullYear() === anoFinal && n.dataEmissao.getMonth() + 1 === mes
      ).reduce((acc, n) => acc + n.valorTotal, 0);

      return { mes: mesNome, anoAnterior: anoAnt, anoAtual: anoAtual };
    });

    return res.json(resultado);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Erro ao obter comparação de faturamento" });
  }
}

module.exports = {
  faturamento,
  porCliente,
  status,
  mensal,
  totalClientes,
  dashboard,
  comparacaoFaturamento
};