const swaggerJSDoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "API Emissor de Nota Fiscal",
    version: "1.0.0",
    description:
      "API para emissão e gerenciamento de notas fiscais",
  },
  servers: [
    {
      url: "http://localhost:3333",
      description: "Servidor local",
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"],
};

module.exports = swaggerJSDoc(options);
