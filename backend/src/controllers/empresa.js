
const Empresa = require("../models/empresa")


  async function buscarEmpresa(req, res) {
    try {
        let empresa = await Empresa.findOne();

        if (!empresa) {
            empresa = await Empresa.create({
            razaoSocial: "Minha Empresa LTDA",
            nomeFantasia: "Coral Vidros",
            cnpj: "12.345.678/0001-90",
            inscricaoMunicipal: "88495-000",
            endereco: "Rua Central, 123",
            municipio: "Garopaba",
            uf: "SP",
            telefone: "(11) 99999-9999",
            email: "contato@empresa.com"
        })
        }
         res.json(empresa);
    }catch (error){
        return res.status(500).json({ error: "Erro ao buscar empresa"})
    }
}
module.exports = { buscarEmpresa };