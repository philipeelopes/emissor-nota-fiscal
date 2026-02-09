const express = require("express")
const relatoriosController = require("../controllers/relatorios.controller")

const router = express.Router();

router.get("/faturamento", relatoriosController.faturamento);
router.get("/por-cliente", relatoriosController.porCliente);
router.get("/status", relatoriosController.status);
router.get("/mensal", relatoriosController.mensal);
router.get("/total", relatoriosController.totalClientes);



module.exports = router;