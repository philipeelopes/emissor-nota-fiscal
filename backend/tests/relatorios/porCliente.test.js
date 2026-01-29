const request = require("supertest");
const app = require("../../src/app");
const NotaFiscal = require("../../src/models/NotaFiscal");
const Cliente = require("../../src/models/Cliente");

describe("Relatório por cliente", () => {
  beforeEach(async () => {
    await NotaFiscal.deleteMany({});
    await Cliente.deleteMany({});
  });

  it("deve retornar faturamento agrupado por cliente", async () => {
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
        valorTotal: 100
      },
      {
        numero: 2, 
        cliente: cliente._id,
        tipo: "SERVICO",
        status: "EMITIDA",
        valorTotal: 200
      }
    ]);

    const response = await request(app).get("/relatorios/por-cliente");

    expect(response.status).toBe(200);
    expect(response.body.length).toBe(1);
    expect(response.body[0].cliente).toBe("Empresa Teste");
    expect(response.body[0].totalFaturado).toBe(300);
  });
});
