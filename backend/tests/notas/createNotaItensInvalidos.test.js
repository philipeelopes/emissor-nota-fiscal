const request = require("supertest");
const app = require("../../src/app");
const Cliente = require("../../src/models/Cliente");

describe("POST /notas - itens inválidos", () => {
  it("não deve criar nota com quantidade negativa", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12345678000199"
    });

    const response = await request(app)
      .post("/notas")
      .send({
        cliente: cliente._id,
        tipo: "SERVICO",
        descricao: "Nota inválida",
        itens: [
          {
            descricao: "Serviço errado",
            quantidade: -1,
            valorUnitario: 100
          }
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body.error).toBeDefined();
  });
});
