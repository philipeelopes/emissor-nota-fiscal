import { api } from "../api/api"
import type {
    DashboardResumo,
    FaturamentoResumo,
    FaturamentoPorCliente,
    FaturamentoMensal
}from "../types/Relatorios"



export const getDashboard = async (): Promise<DashboardResumo> => {
    const { data } = await api.get("/relatorios/dashboard")
    return data;
}

export const getFaturamento = async (
    params?: { dataInicio?: string; dataFim?: string}
): Promise<FaturamentoResumo> =>{
    const { data } = await api.get("/relatorios/faturamento", { params });
    return data;
}

export const getPorCliente = async (): Promise<FaturamentoPorCliente[]> => {
  const { data } = await api.get("/relatorios/por-cliente");
  
  return Array.isArray(data) ? data : [];
};

export const getMensal = async (): Promise<FaturamentoMensal[]> => {
  const { data } = await api.get("/relatorios/mensal");
  return data;
};