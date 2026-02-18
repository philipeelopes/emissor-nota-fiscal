export interface DashboardResumo {
  totalNotas: number;
  notasCanceladas: number;
  valorEmitido: number;
  totalClientes: number;
}

export interface FaturamentoPorCliente {
  cliente: string;
  totalFaturado: number;
  quantidadeNotas: number;
}

export interface FaturamentoResumo {
  totalFaturado: number;
  quantidadeDeNotas: number;
  porCliente: FaturamentoPorCliente[];
}

export interface FaturamentoMensal {
  mes: string;
  total: number;
}
