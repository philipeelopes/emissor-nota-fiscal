import { api } from "../api/api"
import type { NotaFiscal } from "../types/NotaFiscal"


export async function buscarNotaPorId(
  id: string
): Promise<NotaFiscal> {
  const response = await api.get(`/notas/${id}`);
  return response.data.data;
}


export async function listarNotas(): Promise<NotaFiscal[]> {
    const response = await api.get("/notas");
    return response.data;
}

export async function criarNota(data: {
    clienteId: string;
    descricao: string;
    valorTotal: number;
}): Promise<NotaFiscal> {
    const response = await api.post("/notas", data);
    return response.data;
}

export async function CancelarNota(id: string){
  const response = await api.put(`/notas/cancelar/${id}`);
  return response.data;

}