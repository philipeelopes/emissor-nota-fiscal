const request = require("supertest");
const app = require("../../src/app");
const Cliente = require("../../src/models/Cliente");
const NotaFiscal = require("../../src/models/NotaFiscal");

describe("PUT /notas/:id - nota cancelada", () => {
  it("não deve permitir atualizar nota cancelada", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12345678000199"
    });

    const nota = await NotaFiscal.create({
      cliente: cliente._id,
      tipo: "SERVICO",
      descricao: "Nota cancelada",
      itens: [
        { descricao: "Serviço", quantidade: 1, valorUnitario: 100 }
      ],
      valorTotal: 100,
      status: "CANCELADA",
      numero: 1
    });

    const response = await request(app)
      .put(`/notas/${nota._id}`)
      .send({
        descricao: "Tentativa de edição"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});

//===============================================
//nota inexistente 



describe("PUT /notas/:id - nota inexistente", () => {
  it("deve retornar erro ao tentar atualizar nota inexistente", async () => {
    const idInexistente = "64f000000000000000000000";

    const response = await request(app)
      .put(`/notas/${idInexistente}`)
      .send({
        descricao: "Teste"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});


