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


async function listar(req, res, next) {
  try {
    const resultado = await listarNotas(req.query);
    return res.status(200).json(resultado);
  } catch (err) {
    next(err);
  }
}


async function buscarPorId(req, res, next) {
  try {
    const nota = await NotaFiscal.findById(req.params.id).populate("cliente");

    if (!nota) {
      const error = new Error("Nota não encontrada");
      error.statusCode = 404;
      throw error;
    }

    return res.status(200).json({
      success: true,
      data: nota
    });
  } catch (err) {
    next(err);
  }
}



async function atualizar(req, res) {
  try {
    const nota = await atualizarNota(req.params.id, req.body);
    return res.status(200).json(nota);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}







async function cancelar(req, res) {
  try {
    const nota = await cancelarNota(req.params.id);
    return res.status(200).json(nota);
  } catch (err) {
    return res.status(404).json({ error: err.message });
  }
}






function naoPermitirDelete(req, res) {
  return res.status(405).json({
    success: false,
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
