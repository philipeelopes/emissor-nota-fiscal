const NotaFiscal = require("../models/NotaFiscal");
const { criarNota } = require("../services/notas.service");
const { cancelarNota } = require("../services/cancelarNota.service");
const { atualizarNota } = require("../services/atualizarNota.service");
const { listarNotas } = require("../services/listarNotas.service");

async function criar(req, res) {
  try {
    const nota = await criarNota(req.body);
    return res.status(201).json(nota);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

async function listar(req, res) {
  const resultado = await listarNotas(req.query);
  return res.status(200).json(resultado);
}

async function buscarPorId(req, res) {
  try {
    const nota = await NotaFiscal.findById(req.params.id).populate("cliente");
    if (!nota) {
      return res.status(404).json({ error: "Nota não encontrada" });
    }
    return res.json(nota);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}

async function atualizar(req, res) {
  try {
    const nota = await atualizarNota(req.params.id, req.body);
    return res.json(nota);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}

async function cancelar(req, res) {
  try {
    const nota = await cancelarNota(req.params.id);
    return res.json(nota);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
}

function naoPermitirDelete(req, res) {
  return res.status(405).json({
    error: "Notas fiscais não podem ser deletadas. Utilize o cancelamento."
  });
}

module.exports = {
  criar,
  listar,
  buscarPorId,
  atualizar,
  cancelar,
  naoPermitirDelete
};
