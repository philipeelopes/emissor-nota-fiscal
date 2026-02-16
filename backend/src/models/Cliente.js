const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema(
    {
        nome: {
            type: String,
            require: true,
        },
        documento: {
            type: String, //CPF ou CNPJ
            required: true,
        },
        email: String,
        telefone: String,
        endereco: String,

        ativo:{
            type: Boolean,
            default: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Cliente", ClientSchema);