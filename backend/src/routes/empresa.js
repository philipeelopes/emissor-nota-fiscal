const express = require("express");
const router = express.Router();
const { buscarEmpresa } = require("../controllers/empresa");

router.get("/", buscarEmpresa);

module.exports = router;