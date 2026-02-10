import { api } from "../api/api";

export async function buscarResumoDashboard() {
  const response = await api.get("/notas/dashboard/resumo");
  return response.data;
}

export async function buscarTotalClientes() {
  const response = await api.get("/relatorios/total");
  return response.data.total;
}

export async function buscarDashboard() {
  const response = await api.get("/relatorios/dashboard");
  return{
    totalNotas: response.data.totalNotas,
    notasCanceladas: response.data.notasCanceladas,
    valorEmitido: response.data.valorEmitido, 
    totalClientes: response.data.totalClientes
  };
}

export async function buscarFaturamentoMensal(ano: number) {
  const response = await api.get(`/relatorios/mensal?ano=${ano}`);
  return response.data;
}


