export interface NotaDanfe {

    numero: string;
    dataEmissao: string;

    prestador: {
        nome: string;
        cnpj: string;
        endereco: string;
    };

    cliente: {
        nome: string;
        documento: string;
        endereco?: string;
    };

    itens: {
        descricao: string;
        quantidade: number;
        valorUnitario: number;
    }[];

    iss: number;
}