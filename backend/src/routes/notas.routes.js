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
        const notas = await NotaFiscal.find().populate("cliente");
        return res.json(notas);
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
        const nota = await NotaFiscal.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!nota) return res.status(404).json({ error: "Nota não encontrada" });
        return res.json(nota);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})


//===================================================
// Cancelar nota fiscal
router.put("/:id/cancelar", async (req, res) => {
    try {
        const nota = await NotaFiscal.findByIdAndUpdate(
            req.params.id,
            { status: "CANCELADA" },
            { new: true }
        );

        if (!nota) {
            return res.status(404).json({ error: "Nota não encontrada" });
        }

        return res.json(nota);
    } catch (err) {
        return res.status(400).json({ error: err.message });
    }
});
//=========================================================




//deletar nota por id
router.delete("/", async (req, res) => {
    try {
        const nota = await NotaFiscal.findByIdAndDelete(req.params.id);
        if (!nota) return res.status(404).json({ error: "Nota não encontrada" });
        return res.json(nota);

    } catch (err) {
        return res.status(500).json({ error: err.message });
    }

})


module.exports = router;