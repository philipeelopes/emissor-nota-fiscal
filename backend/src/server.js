require("dotenv").config();
console.log("MONGO_URI =", process.env.MONGO_URI);
console.log("PORT =", process.env.PORT);
const mongoose = require("mongoose");
const app = require ("./app");


console.log("SERVER.JS CARREGADO"); 


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB conectado")
        app.listen(process.env.PORT, () => {
            console.log(`Servidor rodando na porta ${process.env.PORT}`)
        });
    })
    .catch((err) => console.log("Erro no mongoBD ", err))