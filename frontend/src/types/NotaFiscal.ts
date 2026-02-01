export interface ItemNota{
    descricao: string;
    quantidade: number;
    valorUnitario: number;
}

export interface NotaFiscal{
    _id: string;
    cliente: string;
    tipo: string;
    descricao?: string;
    status: "ATIVA" | "CANCELADA";
    itens: ItemNota[];
    valorTotal: number;
    createdAt: string;
}