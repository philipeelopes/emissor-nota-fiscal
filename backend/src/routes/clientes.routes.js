const express = require("express");
const Cliente = require("../models/Cliente")


const router = express.Router();

//=============
//Criar Cliente
router.post("/", async (req, res) => {
    try{
        const cliente = await Cliente.create({...req.body, ativo: true});
        return res.status(201).json(cliente);
    }catch ( err){
        return res.status(400).json({ error: err.message});
    }
});

//===============
//listar clientes
router.get("/", async (req, res) => {
    try {
        const clientes = await Cliente.find({ ativo: true});
        return res.json(clientes);
    }catch (error){
        return res.status(500).json({ error: err.message});
    }
})



//=====================
//buscar cliente por id
router.get("/:id", async (req, res) => {
    try{
        const cliente = await Cliente.findOne({_id: req.params.id, ativo: true});
        if (!cliente){
            return res.status(404).json({ error: "Cliente não encontrado"});
        }
        return res.json(cliente);
    }catch (err) {
        return res.status(500).json({ error: err.message });
    }
})

//========================
//atualizar cliente por id 
router.put("/:id" , async (req, res) => {
    try{
        const cliente = await Cliente.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true}
        );
        if (!cliente){
            return res.status(404).json({ error: "Cliente não encontrado"});
        }
        return res.json(cliente);
    }catch(err){
        return res.status(400).json({ error: err.message});
    }
});


//===============
//deletar cliente 
router.delete("/:id" , async (req, res) => {
    try{
        const cliente = await Cliente.findById(req.params.id);

        if(!cliente){
            return res.status(404).json({ error: "Cliente não encontrado"});
        }

        if (!cliente.ativo) {
            return res.status(400).json({ error: "Cliente já está inativo"})
        }

        cliente.ativo = false;
        await cliente.save();
        
        return res.json({ message: "Cliente deletado com sucesso" })
    }catch (err){
        return res.status(500).json({ error: err.message});
    }
});



module.exports = router;