const express = require("express")
const notasController = require("../controllers/notas.controller");
const router = express.Router();




//================================================================
//notas fiscais
//================================================================

router.post("/", notasController.criar);
router.get("/", notasController.listar);
router.get("/:id", notasController.buscarPorId);
router.put("/:id", notasController.atualizar);
router.put("/:id/cancelar", notasController.cancelar);
router.delete("/:id", notasController.naoPermitirDelete);




module.exports = router;