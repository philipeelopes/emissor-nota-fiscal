const express = require("express");
const router = express.Router();

const { buscarEmpresa } = require("../controllers/empresa");


router.get("/empresa", buscarEmpresa);

module.exports = router;
