export interface NotaDanfe {
  totalServicos: any;
  numero: string;
  dataEmissao: string;

  competencia: string; // MM/AAAA
  municipioIncidencia: string;
  naturezaOperacao: string;
  discriminacao: string;

  prestador: {
    nome: string;
    cnpj: string;
    endereco: string;
  };

  cliente: {
    nome: string;
    documento: string;
    endereco: string;
  };

  itens: {
    descricao: string;
    quantidade: number;
    valorUnitario: number;
  }[];

  baseCalculo: number;
  aliquotaISS: number;
  iss: number;
  issRetido: boolean;
}
