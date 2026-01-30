/**
 * @swagger
 * tags:
 *   name: Notas
 *   description: Endpoints relacionados a notas fiscais
 */
const express = require("express")
const notasController = require("../controllers/notas.controller");
const router = express.Router();




//================================================================
//notas fiscais
//================================================================



/**
 * @swagger
 * /notas:
 *   post:
 *     summary: Criar uma nova nota fiscal
 *     tags: [Notas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - cliente
 *               - tipo
 *               - itens
 *             properties:
 *               cliente:
 *                 type: string
 *               tipo:
 *                 type: string
 *                 example: SERVICO
 *               descricao:
 *                 type: string
 *               itens:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - descricao
 *                     - quantidade
 *                     - valorUnitario
 *                   properties:
 *                     descricao:
 *                       type: string
 *                     quantidade:
 *                       type: number
 *                     valorUnitario:
 *                       type: number
 *     responses:
 *       201:
 *         description: Nota criada com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post("/", notasController.criar);



/**
 * @swagger
 * /notas:
 *   get:
 *     summary: Listar notas fiscais com paginação
 *     tags: [Notas]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página atual
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Quantidade por página
 *     responses:
 *       200:
 *         description: Lista de notas
 */
router.get("/", notasController.listar);



/**
 * @swagger
 * /notas/{id}:
 *   get:
 *     summary: Buscar nota fiscal por ID
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota encontrada
 *       404:
 *         description: Nota não encontrada
 */
router.get("/:id", notasController.buscarPorId);




/**
 * @swagger
 * /notas/{id}:
 *   put:
 *     summary: Atualizar uma nota fiscal
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Nota atualizada
 *       404:
 *         description: Nota não encontrada ou cancelada
 */
router.put("/:id", notasController.atualizar);





/**
 * @swagger
 * /notas/{id}/cancelar:
 *   put:
 *     summary: Cancelar uma nota fiscal
 *     tags: [Notas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Nota cancelada com sucesso
 *       404:
 *         description: Nota não encontrada
 */
router.put("/:id/cancelar", notasController.cancelar);


router.delete("/:id", notasController.naoPermitirDelete);




module.exports = router;