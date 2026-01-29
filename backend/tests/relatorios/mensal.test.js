const request = require("supertest");
const app = require("../../src/app");
const NotaFiscal = require("../../src/models/NotaFiscal");
const Cliente = require("../../src/models/Cliente");

describe("Relatório mensal", () => {
  beforeEach(async () => {
    await NotaFiscal.deleteMany({});
    await Cliente.deleteMany({});
  });

  it("deve retornar faturamento mensal", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12345678900"
    });

    await NotaFiscal.create([
      {
        numero: 1, 
        cliente: cliente._id,
        tipo: "SERVICO",
        status: "EMITIDA",
        valorTotal: 100,
        dataEmissao: new Date("2024-01-10")
      },
      {
        numero: 2, 
        cliente: cliente._id,
        tipo: "SERVICO",
        status: "EMITIDA",
        valorTotal: 200,
        dataEmissao: new Date("2024-01-20")
      }
    ]);

    const response = await request(app).get("/relatorios/mensal");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].totalFaturado).toBe(300);
  });
});
