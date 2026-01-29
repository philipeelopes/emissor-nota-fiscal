const express = require("express")
const notasController = require("../controllers/notas.controller");
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

router.post("/", notasController.criar);
router.get("/", notasController.listar);
router.get("/:id", notasController.buscarPorId);
router.put("/:id", notasController.atualizar);
router.put("/:id/cancelar", notasController.cancelar);
router.delete("/:id", notasController.naoPermitirDelete);




module.exports = router;