const faturamentoService = require("../services/relatorios/faturamento.service");
const porClienteService = require("../services/relatorios/porCliente.service");
const statusService = require("../services/relatorios/status.service");
const mensalService = require("../services/relatorios/mensal.service");
const totalService = require("../services/relatorios/total");


async function faturamento(req, res) {
  try {
    const resultado = await faturamentoService.faturamento(req.query);
    return res.json(resultado);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function porCliente(req, res) {
  try {
    const resultado = await porClienteService.porCliente();
    return res.json(resultado);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function status(req, res) {
  try {
    const resultado = await statusService.status();
    return res.json(resultado);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function mensal(req, res) {
  try {
    const resultado = await mensalService.mensal();
    return res.json(resultado);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}


async function totalClientes(req, res, next) {
  try {
    const total = await totalService.total();

    return res.status(200).json({
      success: true,
      total,
    });
  } catch (error) {
    next(error);
  }
}






module.exports = {
  faturamento,
  porCliente,
  status,
  mensal,
  totalClientes
};
