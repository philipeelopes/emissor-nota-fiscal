const NotaFiscal = require("../models/NotaFiscal")


async function cancelarNota(id) {
    const nota = await NotaFiscal.findById(id);

    if(!nota){
        throw new Error("Nota não encontrada")
    }

    if (nota.status === "CANCELADA"){
        throw new Error("Nota ja esta cancelada");
    }

    nota.status = "CANCELADA";  
    await nota.save();

    return nota;
    
}

module.exports = { cancelarNota };