
require("dotenv").config();

const app = require("./app"); // importa seu app.js com todas as rotas

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});