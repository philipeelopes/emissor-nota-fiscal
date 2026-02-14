const  mongoose = require ("mongoose");

const EmpresaSchema = new mongoose.Schema({

  razaoSocial: { type: String, required: true },
  nomeFantasia: { type: String, required: true },
  cnpj: { type: String, required: true },
  inscricaoMunicipal: { type: String, required: true },
  endereco: { type: String, required: true },
  municipio: { type: String, required: true },
  uf: { type: String, required: true },
  telefone: String,
  email: String,
}, {
    timestamps: true
});


module.exports = mongoose.model("Empresa", EmpresaSchema);