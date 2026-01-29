const NotaFiscal = require ("../../models/NotaFiscal")

async function faturamento({ dataInicio, dataFim}) {
    const match = { status : "EMITIDA"};

    if (dataInicio || dataFim){
        match.dataEmissao = {};

        if(dataInicio) match.dataEmissao.$gte = new Date(dataInicio)
        if(dataFim) match.dataEmissao.$gte = new Date(dataFim)
    }

    const resultado = await NotaFiscal.aggregate([
        { $match: match},
        {
            $group:{
                id: null,
                totalFaturado: { $sum: "$valorTotal"},
                quantidadeDeNotas : { $sum: 1 }
            }
        }
    ]);

    return resultado[0] || { totalFaturado: 0, quantidadeDeNotas: 0};
}

module.exports = { faturamento }