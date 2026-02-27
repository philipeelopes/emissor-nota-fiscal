import { useEffect, useState } from "react";
import { listarClientes, deletarCliente } from "../../services/clientes.service";
import { NovoCliente } from "../clientes/NovoCliente"
import type { Cliente } from "../../types/Cliente";
import styles from "./ClientesPage.module.css";


export default function ClientesPage() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [loading, setLoading] = useState(true);



    async function carregarClientes() {
        try {
            const data = await listarClientes();
            setClientes(data);
        } catch (error) {
            console.error("Erro ao carregar clientes", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        carregarClientes();
    }, []);

    async function handleExcluirCliente(id: string) {
        const confirmação = window.confirm(" Tem certeza de deseja excluir este Cliente? ")

        if (!confirmação) return;

        try {
            await deletarCliente(id);
            alert("Cliente excluído com sucesso");
            carregarClientes();
        } catch (error: any) {
            const mensagem =
                error.response?.data?.error ||
                "Erro inesperado ao excluir cliente";

            alert(mensagem);
        }
    }






    if (loading) {
        return <p>Carregando Clientes...</p>
    }

    return (
        <div className={styles.container}>
            <NovoCliente onClienteCriado={carregarClientes} />
            <h2>Clientes</h2>

            {clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}

            <div className={styles.tableContainer}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Documento</th>
                            <th>Endereço</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clientes.map((cliente) => (
                            <tr key={cliente.id}>
                                <td>{cliente.nome}</td>
                                <td>{cliente.email}</td>
                                <td>{cliente.documento}</td>
                                <td>{cliente.endereco}</td>
                                <td>
                                    <button
                                        className={styles.btnExcluir}
                                        onClick={() => handleExcluirCliente(cliente.id)}
                                    >
                                        Excluir
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}