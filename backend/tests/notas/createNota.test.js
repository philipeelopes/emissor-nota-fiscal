const request = require("supertest");
const app = require("../../src/app");
const Cliente = require("../../src/models/Cliente");

describe("POST /notas", () => {
  it("deve criar uma nota fiscal válida", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12.345.678/0001-99", // CNPJ fake para teste
    });

    const response = await request(app)
      .post("/notas")
      .send({
        cliente: cliente._id,
        tipo: "SERVICO",
        descricao: "Serviço prestado",
        itens: [
          { descricao: "Dev", quantidade: 2, valorUnitario: 100 },
        ],
      });

    expect(response.status).toBe(201);
    expect(response.body.valorTotal).toBe(200);
    expect(response.body.itens.length).toBe(1);
  });
});


  it("não deve criar nota sem itens", async () => {
   const cliente = await Cliente.create({
    nome: "Empresa Teste",
    email: "teste@empresa.com",
    documento: "12.345.678/0001-99"
  });

  const response = await request(app)
    .post("/notas")
    .send({
      cliente: cliente._id,
      tipo: "SERVICO",
      descricao: "Teste sem itens"
    });

  expect(response.status).toBe(400);
  expect(response.body.error).toBeDefined();
});
