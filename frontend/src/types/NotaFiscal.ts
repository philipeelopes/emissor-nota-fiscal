

export type Cliente = {
  _id: string;
  nome: string;
  email: string;
  documento: string;
};

export type ItemNota = {
  descricao: string;
  quantidade: string;
  valorUnitario: string;
};

export type NotaFiscal = {
  _id: string;
  numero: number;
  cliente: Cliente; 
  tipo: "SERVICO" | "PRODUTO";
  descricao?: string;
  itens: ItemNota[];
  valorTotal: number;
  status: "EMITIDA" | "CANCELADA";
  dataEmissao: string;
};