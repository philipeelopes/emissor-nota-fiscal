import { api } from "../api/api";
import type { DashboardDTO } from "../types/Dashboard";

export async function buscarResumoDashboard() {
  const response = await api.get("/notas/dashboard/resumo");
  return response.data;
}

export async function buscarTotalClientes() {
  const response = await api.get("/relatorios/total");
  return response.data.total;
}


export async function buscarDashboard(): Promise<DashboardDTO> {
  const { data } = await api.get("/relatorios/dashboard");

  return {
    totalNotas: data.totalNotas ?? 0,
    notasCanceladas: data.notasCanceladas ?? 0,
    valorEmitido: data.valorEmitido ?? 0,
    totalClientes: data.totalClientes ?? 0,
  };
}

export async function buscarFaturamentoMensal(ano: number) {
  const response = await api.get(`/relatorios/mensal?ano=${ano}`);
  return response.data;
}


export async function comparacaoFaturamentoAnual(
  anoInicial: number,
  anoFinal: number
) {
  const response = await api.get(
    `/relatorios/comparacao?anoInicial=${anoInicial}&anoFinal=${anoFinal}`
  );
  return response.data;
}
