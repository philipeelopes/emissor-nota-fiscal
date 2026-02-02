import { api } from "../api/api"
import type { Cliente } from "../types/Cliente"

export async function listarClientes(): Promise<Cliente[]>{
    const response = await api.get("/clientes")
    return response.data
}

export async function criarCliente(
    cliente: Omit<Cliente, "_id">
): Promise<Cliente> {
    const response = await api.post("/clientes", cliente);
    return response.data;
}