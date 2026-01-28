const express = require("express")
const notaFiscal = require("../models/NotaFiscal");
const NotaFiscal = require("../models/NotaFiscal");

const router = express.Router();




//===============================================================
//relatorio
//=============================================================


router.get("/relatorios/faturamento", async (req, res) => {
    try {
        const { dataInicio, dataFim } = req.query;

        const match = { status: "EMITIDA" };

        if (dataInicio || dataFim) {
            match.dataEmissao = {};
            if (dataInicio) match.dataEmissao.$gte = new Date(dataInicio);
            if (dataFim) match.dataEmissao.$lte = new Date(dataFim);
        }

        const resultado = await NotaFiscal.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalFaturado: { $sum: "$valorTotal" },
                    quantidadeDeNotas: { $sum: 1 }
                }
            }
        ]);
        return res.json(resultado[0] || { totalFaturado: 0, quantidadeDeNotas: 0 });

    } catch (err) {
        return res.status(404).json({ error: err.message })
    }
})

//relatorio de faturamento por cliente
router.get("/relatorios/por-cliente", async (req, res) => {
    try {
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
                    quantidadeNotas: 1
                }
            },
            { $sort: { totalFaturado: -1 } }

        ]);

        return res.json(resultado)
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

//relatorio de emitidas X canceladas

router.get("/relatorios/status", async (req, res) => {
    try {
        const resultado = await NotaFiscal.aggregate([
            {
                $group: {
                    _id: "$status",
                    quantidade: { $sum: 1 }
                }
            }
        ]);

        return res.json(resultado);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});


// faturamento mensal 

router.get("/relatorios/mensal", async (req, res) => {
    try {
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

        return res.json(resultado);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});






















//================================================================
//notas fiscais
//================================================================


//atualizar por id
router.put("/:id", async (req, res) => {


  try {

      if (!req.body) {
      return res.status(400).json({
        error: "Body da requisição não recebido. Envie JSON válido."
      });
    }


    const { descricao, itens } = req.body;
 

    

    if (itens && (!Array.isArray(itens) || itens.length === 0)) {
      return res.status(400).json({
        error: "A nota deve ter ao menos um item"
      });
    }

    if (itens) {
      for (const item of itens) {
        if (item.quantidade <= 0 || item.valorUnitario <= 0) {
          return res.status(400).json({
            error: "Itens devem ter quantidade e valor unitário maiores que zero"
          });
        }
      }
    }

    const update = {};

    if (descricao !== undefined) update.descricao = descricao;

    if (itens) {
      update.itens = itens;
      update.valorTotal = itens.reduce(
        (total, item) => total + item.quantidade * item.valorUnitario,
        0
      );
    }

    const notaAtualizada = await NotaFiscal.findOneAndUpdate(
      { _id: req.params.id, status: { $ne: "CANCELADA" } },
      { $set: update },
      { new: true, runValidators: true }
    );

    if (!notaAtualizada) {
      return res.status(404).json({ error: "Nota não encontrada ou cancelada" });
    }

    return res.json(notaAtualizada);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});




// criar nota fiscal
router.post("/", async (req, res) => {
    try {
        const { cliente, tipo, itens, descricao } = req.body;

        if (!itens || itens.length === 0) {
            return res.status(400).json({ error: "A nota precisa ter ao menos um item" });
        }

        for (const item of itens) {
            if (item.quantidade <= 0 || item.valorUnitario <= 0) {
                return res.status(400).json({
                    error: "Itens devem ter quantidade e valor Unitario maior que zero"
                })
            }
        }

        //calcular valor da nota
        const valorTotal = itens.reduce((total, item) => {
            return total + item.quantidade * item.valorUnitario;
        }, 0)



        //gerar numero automatico
        const ultimaNota = await NotaFiscal.findOne().sort({ numero: -1 });
        const novoNumero = ultimaNota ? ultimaNota.numero + 1 : 1;

        const nota = await NotaFiscal.create({
            cliente,
            tipo,
            valorTotal,
            itens,
            descricao,
            numero: novoNumero,
        });
        return res.status(201).json(nota)
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});


//listas todas as notas
router.get("/", async (req, res) => {
    try {

        const { status, cliente, tipo, numero, dataInicio, dataFim, page = 1, limit = 10, sortBy = "numero", order = "desc" } = req.query;
        const filtros = {};

        if (status) filtros.status = status;
        if (cliente) filtros.cliente = cliente;
        if (tipo) filtros.tipo = tipo;
        if (numero) filtros.numero = Number(numero);

        if (dataInicio || dataFim) {
            filtros.dataEmissao = {};

            if (dataInicio) filtros.dataEmissao.$gte = new Date(dataInicio)
            if (dataFim) filtros.dataEmissao.$lte = new Date(dataFim)
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


        return res.json({
            total,
            page: pageNumber,
            limit: limitNumber,
            totalPages: Math.ceil(total / limitNumber),
            sortBy,
            order,
            notas
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});



//buscar nota por id
router.get("/:id", async (req, res) => {
    try {
        const nota = await NotaFiscal.findById(req.params.id).populate("cliente")
        if (!nota) return res.status(404).json({ error: "Nota não encontrada" });
        return res.json(nota);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});




//===================================================
// Cancelar nota fiscal
router.put("/:id/cancelar", async (req, res) => {
    try {
        const nota = await NotaFiscal.findById(req.params.id);

        if (!nota) {
            return res.status(404).json({ error: "Nota não encontrada" });
        }
        if (nota.status === "CANCELADA") {
            return res.status(400).json({ error: "Nota já está cancelada" })
        }

        nota.status = "CANCELADA";
        await nota.save();

        return res.json(nota);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
//=========================================================




//deletar nota
router.delete("/:id", async (req, res) => {
    return res.status(405).json({
        error: "Notas fiscais não podem ser deletadas. Utilize o cancelamento."
    })
})




module.exports = router;