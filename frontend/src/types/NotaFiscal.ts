import type { ItemNota } from "./ItemNota";



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