const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");


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

module.exports = app;