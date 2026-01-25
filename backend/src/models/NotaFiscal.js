const mongoose = require("mongoose");

const NotaFiscalSchema = new mongoose.Schema(
    {
        cliente: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Cliente",
            required: true,
        },
        tipo: {
            type: String,
            enum: ["SERVICO", "PRODUTO"],
            required: true,
        },
        descricao: String,
        valorTotal: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            enum: ["emitida", "cancelada"],
            default: "EMITIDA",
        },
        numero: {
            type: Number,
            unique: true,
        },
        itens: {
            descricao: String,
            quantidade: Number,
            valorUnitario: Number,
        },
        dataEmissao: {
            type: Date,
            default: Date.now,
        },

    },
    { timestamps: true }
)

module.exports = mongoose.model("NotaFiscal", NotaFiscalSchema);
