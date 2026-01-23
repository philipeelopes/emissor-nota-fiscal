const express = require("express");
const cors = require("cors");


const app = express();

app.use(cors());
app.use(express.json());

app.get("/health", (req, res) => {
    return res.json( {stutus : "OK"})
});

module.exports = app;