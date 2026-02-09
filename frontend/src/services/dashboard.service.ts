import { api } from "../api/api";

export async function buscarResumoDashboard() {
  const response = await api.get("/notas/dashboard/resumo");
  return response.data;
}

export async function buscarTotalClientes() {
  const response = await api.get("/relatorios/total");
  return response.data.total;
}