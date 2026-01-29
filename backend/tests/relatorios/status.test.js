const request = require("supertest");
const app = require("../../src/app");
const NotaFiscal = require("../../src/models/NotaFiscal");
const Cliente = require("../../src/models/Cliente");

describe("Relatório de status", () => {
  beforeEach(async () => {
    await NotaFiscal.deleteMany({});
    await Cliente.deleteMany({});
  });

  it("deve retornar quantidade de notas por status", async () => {
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
  },
  {
    numero: 3,
    cliente: cliente._id,
    tipo: "SERVICO",
    status: "CANCELADA",
    valorTotal: 300
  }
]);

    const response = await request(app).get("/relatorios/status");

    expect(response.status).toBe(200);

    const emitidas = response.body.find(r => r._id === "EMITIDA");
    const canceladas = response.body.find(r => r._id === "CANCELADA");

    expect(emitidas.quantidade).toBe(2);
    expect(canceladas.quantidade).toBe(1);
  });
});
