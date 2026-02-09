const Cliente = require("../../models/Cliente");

async function totalClientes() {
  return await Cliente.countDocuments();
}

module.exports = { totalClientes };