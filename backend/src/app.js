const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");
const notasRoutes = require("./routes/notas.routes")
const relatoriosRoutes = require("./routes/relatorios.routes");


console.log("APP.JS CARREGADO");

const app = express();


app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});


app.get("/health", (req, res) => {
    return res.json( {status : "OK"})
});


app.use("/clientes", clientesRoutes);
app.use("/notas", notasRoutes);


//relatorios
app.use("/relatorios", relatoriosRoutes);

module.exports = app;