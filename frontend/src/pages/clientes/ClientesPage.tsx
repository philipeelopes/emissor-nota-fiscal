import { useEffect, useState } from "react";
import { listarClientes } from "../../services/clientes.service";
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
       
    

    if (loading) {
        return <p>Carregando Clientes...</p>
    }

    return (
        <div className={styles.container}>
            <NovoCliente onClienteCriado={carregarClientes} />
            <h2>Clientes</h2>

            {clientes.length === 0 && <p>Nenhum cliente cadastrado.</p>}

            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>Email</th>
                        <th>Documento</th>
                    </tr>
                </thead>
                <tbody>
                    {clientes.map((cliente) => (
                        <tr key={cliente._id}>
                            <td>{cliente.nome}</td>
                            <td>{cliente.email}</td>
                            <td>{cliente.documento}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );

}