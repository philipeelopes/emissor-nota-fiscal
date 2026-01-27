const express = require("express")
const notaFiscal = require("../models/NotaFiscal");
const NotaFiscal = require("../models/NotaFiscal");

const router = express.Router();

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



//atualizar por id
router.put("/:id", async (req, res) => {
    try {
        const nota = await NotaFiscal.findById(req.params.id);

        if (!nota) {
            return res.status(404).json({ error: "Nota não encontrada" });
        }
        if (nota.status === "CANCELADA") {
            return res.status(400).json({
                error: "Não é possivel editar uma nota já cancelada"
            });
        }

        Object.assign(nota, req.body);
        await nota.save();

        return res.json(nota);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }

})


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


//===============================================================
//relatorio
//=============================================================


router.get("/relatorios/faturamento", async (req, res) => {
    try{
        const { dataInicio, dataFim } = req.query;

        const match = { status: "EMITIDA "};

        if (dataInicio || dataFim){
            match.dataEmissao = {};
            if (dataInicio) match.dataEmissao.$gte = new Date(dataInicio);
            if (dataFim) match.dataEmissao.$lte = new Date(dataFim);
        }
        
        const resultado = await NotaFiscal.aggregate([
            { $match: match },
            {
                $group: {
                    _id: null,
                    totalFaturado: { $sum: "$valorTotal"},
                    quantidadeDeNotas: {$num: 1}
                }
            }
        ]);
        return res.json(resultado[0] || { totalFaturado: 0, quantidadeDeNotas: 0});
        
    }catch(err){
        return res.status(404).json( {error: err.message}) 
    }
})






module.exports = router;