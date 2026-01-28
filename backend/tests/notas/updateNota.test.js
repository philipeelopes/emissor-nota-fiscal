const request = require("supertest");
const app = require("../../src/app");
const mongoose = require("mongoose");
const Cliente = require("../../src/models/Cliente");
const NotaFiscal = require("../../src/models/NotaFiscal");

describe("PUT /notas/:id", () => {
  it("deve atualizar a descrição e os itens de uma nota emitida", async () => {
    // criar cliente
    const cliente = await Cliente.create({
      nome: "Empresa Update",
      email: "update@empresa.com",
      documento: "12345678900"
    });

    // criar nota
    const nota = await NotaFiscal.create({
      cliente: cliente._id,
      tipo: "SERVICO",
      descricao: "Descrição antiga",
      itens: [
        {
          descricao: "Item antigo",
          quantidade: 1,
          valorUnitario: 100
        }
      ],
      valorTotal: 100,
      numero: 1
    });

    // atualizar nota
    const response = await request(app)
      .put(`/notas/${nota._id}`)
      .send({
        descricao: "Descrição atualizada",
        itens: [
          {
            descricao: "Item novo",
            quantidade: 2,
            valorUnitario: 200
          }
        ]
      });

    expect(response.status).toBe(200);
    expect(response.body.descricao).toBe("Descrição atualizada");
    expect(response.body.itens).toHaveLength(1);
    expect(response.body.valorTotal).toBe(400);
  });
});



//======================================
// Teste: não atualizar nota cancelada
describe("PUT /notas/:id - nota cancelada", () => {
it("não deve permitir atualizar uma nota cancelada", async () => {
  const cliente = await Cliente.create({
    nome: "Empresa Cancelada",
    email: "cancelada@empresa.com",
    documento: "98765432100"
  });

  const nota = await NotaFiscal.create({
    cliente: cliente._id,
    tipo: "SERVICO",
    descricao: "Nota cancelada",
    itens: [
      {
        descricao: "Item",
        quantidade: 1,
        valorUnitario: 100
      }
    ],
    valorTotal: 100,
    numero: 2,
    status: "CANCELADA"
  });

  const response = await request(app)
    .put(`/notas/${nota._id}`)
    .send({
      descricao: "Tentativa de edição"
    });

  expect(response.status).toBe(404);
  expect(response.body.error).toBe("Nota não encontrada ou cancelada");
});
})


//==============================================
//Atualizar nota inexistente


describe("PUT /notas/:id - nota inexistente", () => {
  it("deve retornar erro ao tentar atualizar nota inexistente", async () => {
    const idInvalido = new mongoose.Types.ObjectId();

    const response = await request(app)
      .put(`/notas/${idInvalido}`)
      .send({
        descricao: "Tentativa de edição"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});


//=================================================
//Não permitir atualizar nota CANCELADA


describe("PUT /notas/:id - nota cancelada", () => {
  it("não deve permitir atualizar uma nota cancelada", async () => {
    const cliente = await Cliente.create({
      nome: "Empresa Teste",
      email: "teste@empresa.com",
      documento: "12345678000199"
    });

    const nota = await NotaFiscal.create({
      cliente: cliente._id,
      tipo: "SERVICO",
      descricao: "Nota original",
      itens: [
        { descricao: "Serviço", quantidade: 1, valorUnitario: 100 }
      ],
      valorTotal: 100,
      status: "CANCELADA",
      numero: 999
    });

    const response = await request(app)
      .put(`/notas/${nota._id}`)
      .send({
        descricao: "Tentativa de alteração"
      });

    expect(response.status).toBe(404);
    expect(response.body.error).toBeDefined();
  });
});