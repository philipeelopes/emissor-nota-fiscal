
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function Empresa() {
  let empresa = await prisma.empresa.findFirst();

  if (!empresa) {
    empresa = await prisma.empresa.create({
      data: {
        razaoSocial: "Minha Empresa LTDA",
        nomeFantasia: "Coral Vidros",
        cnpj: "12.345.678/0001-90",
        inscricaoMunicipal: "88495-000",
        endereco: "Rua Central, 123",
        municipio: "Garopaba",
        uf: "SP",
        telefone: "(11) 99999-9999",
        email: "contato@empresa.com"
      }
    });
  }

  return empresa;
}

module.exports = {
  Empresa
};