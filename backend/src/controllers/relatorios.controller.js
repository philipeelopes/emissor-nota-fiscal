
const faturamentoService = require("../services/relatorios/faturamento.service");
const porClienteService = require("../services/relatorios/porCliente.service");
const statusService = require("../services/relatorios/status.service");
const mensalService = require("../services/relatorios/mensal.service");
const totalService = require("../services/relatorios/total.service");
const totalClientesService = require("../services/relatorios/totalClientes.service");
const dashboardService = require("../services/relatorios/dashboard.service");


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


async function totalClientes(req, res) {
  try {
    const total = await totalService.total();

    return res.status(200).json({
      success: true,
      total: total ?? 0
    });
  } catch (error) {
    console.error("Erro ao obter total de clientes:", error);
    return res.status(400).json({
      success: false,
      message: "Erro ao carregar total do dashboard"
    });
  }
}

async function totalClientes(req, res) {
  try {
    const total = await totalClientesService.totalClientes(); 

    return res.status(200).json({
      success: true,
      total
    });
  }catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Erro ao carregar total de clientes"
    });
  }
}


async function dashboard(req, res) {
  try{
    const resumo = await dashboardService.rusumoDashboard();
    return res.status(200).json(resumo);
  }catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: "Erro ao carregar dados do dashboard"
    });
  }
}






module.exports = {
  faturamento,
  porCliente,
  status,
  mensal,
  totalClientes,
  dashboard
};
