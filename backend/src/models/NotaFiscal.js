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
        valor: {
            type: Number,
            required: true,
        },
        status: {
            type: String,
            default: "EMITIDA"
        },
        numero: {
            type: Number,
            unique: true,
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model("NotaFiscal", NotaFiscalSchema);
