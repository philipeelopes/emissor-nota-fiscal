const express = require("express");
const cors = require("cors");
const clientesRoutes = require("./routes/clientes.routes");
const notasRoutes = require("./routes/notas.routes")
const relatoriosRoutes = require("./routes/relatorios.routes");
const empresaRoutes = require("./routes/empresa")
const errorMiddleware = require("./middlewares/error.middleware");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");



const app = express();


app.use(cors());
app.use(express.json());

app.get("/teste", (req, res) => {
  res.json({ ok: true });
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.get("/", (req, res) => {
  res.json({
    status: "OK",
    message: "API Emissor de Nota Fiscal rodando"
  });
});

app.use(empresaRoutes)

app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/clientes", clientesRoutes);
app.use("/notas", notasRoutes);


//relatorios
app.use("/relatorios", relatoriosRoutes);

app.use(errorMiddleware);

module.exports = app;