const express = require("express")
const notaFiscal = require("../models/NotaFiscal");

const router = express.Router();

// criar nota fiscal

router.post("/", async (req, res ) => {
    try{
        const nota = await NotaFiscal.create(req.body);
        return res.status(201).json(nota)
    }catch (err){
        return res.status(400).json({ error: err.message })
    }
});



router.get("/", async (req, res ) => {
    try{
        const notas = await NotaFiscal.find().populate("cliente");
        return res.json(notas);
    }catch ( err){
        return res.status(500).json ({ error: err.message});
    }
});




router.get("/", async (req, res ) => {
    
})




router.put("/", async (req, res ) => {
    
})


router.delete("/", async (req, res ) => {
    
})