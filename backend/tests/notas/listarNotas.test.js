const request = require("supertest");
const app = require("../../src/app");
const Cliente = require("../../src/models/Cliente");
const NotaFiscal = require("../../src/models/NotaFiscal");

describe("Listar notas", () => {
  it("deve listar notas com paginação", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12345678900"
    });

    await NotaFiscal.create({
      cliente: cliente._id,
      tipo: "SERVICO",
      descricao: "Teste",
      numero: 1,
      valorTotal: 100,
      itens: [
        {
          descricao: "Item",
          quantidade: 1,
          valorUnitario: 100
        }
      ]
    });

    const response = await request(app).get("/notas");

    expect(response.status).toBe(200);
    expect(response.body.total).toBe(1);
    expect(response.body.notas.length).toBe(1);
  });
});
