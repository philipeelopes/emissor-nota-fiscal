require("dotenv").config();
const moongoose = require("mongoose");
const app = require ("./app");

moongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB conectado")
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`)
        });
    })
    .catch((err) => console.log("Erro no mongoBD ". err))