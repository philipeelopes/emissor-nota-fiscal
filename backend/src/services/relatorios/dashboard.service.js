const NotaFiscal = require("../../models/NotaFiscal");
const Cliente = require("../../models/Cliente");

async function rusumoDashboard() {
    const totalNotas = await NotaFiscal.countDocuments();
    const notasCanceladas = await NotaFiscal.countDocuments({ status: "CANCELADA" });
  
    const valorEmitido = await NotaFiscal.aggregate([
        { $match: { status: "EMITIDA" } },
        { $group: { _id: null, total: { $sum: "$valorTotal" } } }
    ]);

    const totalClientes = await Cliente.countDocuments();
    
    return {
        totalNotas,
        notasCanceladas,
        valorEmitido: valorEmitido[0]?.total ?? 0,
        totalClientes
    };
}

module.exports = { rusumoDashboard };