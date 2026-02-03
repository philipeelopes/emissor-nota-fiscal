import { useEffect, useState } from "react";
import { api } from "../../api/api";
import type { Cliente } from "../../types/Cliente";
import styles from "./Notas.module.css";
import type { ItemNota } from "../../types/ItemNota";
import { formToJSON } from "axios";


export function NovaNota() {
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [clienteId, setClienteId] = useState("");
    const [tipo, setTipo] = useState("SERVICO");
    const [loading, setLoading] = useState(false);
    const [itens, setItens] = useState<ItemNota[]>([]);

    useEffect(() => {
        api.get<Cliente[]>("/clientes").then((response) => {
            setClientes(response.data)
        });
    }, [])

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!clienteId) {
            alert("Selecione um cliente")
            return;
        }

        try {
            setLoading(true);

            await api.post("/notas", {
                cliente: clienteId,
                tipo,
                itens: [],
            });

            alert("Nota fiscal criada com sucesso");

            setClienteId("")
            setTipo("SERVICO");
        } catch (error) {
            console.error(error);
            alert("Erro ao criar nota");
        } finally {
            setLoading(false);
        }
    }

    //adicionar item
    function adicionarItem() {
        setItens([
            ...itens,
            { descricao: "", quantidade: 1, valorUnitario: 0 }
        ])
    }

    //atualizar item
    function atualizarItem(
        index: number,
        campo: keyof ItemNota,
        valor: string | number
    ) {
        const novosItens = [...itens];
        novosItens[index][campo] = valor as never;
        setItens(novosItens);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Nova Nota Fiscal</h2>

            <select value={clienteId} onChange={(e) => setClienteId(e.target.value)}>
                <option value="">Selecione um Cliente</option>
                {clientes.map((cliente) => (
                    <option key={cliente._id} value={cliente._id}>
                        {cliente.nome}
                    </option>
                ))}
            </select>

            <h3>Itens da Nota</h3>

            {itens.map((item, index) => (
                <div key={index}>
                    <input
                        placeholder="Descrição"
                        value={item.descricao}
                        onChange={(e) =>
                            atualizarItem(index, "descricao", e.target.value)
                        }
                    />

                    
                    <input
                        type="number"
                        placeholder="Quantidade"
                        value={item.quantidade}
                        onChange={(e) =>
                            atualizarItem(index, "quantidade", Number(e.target.value))
                        }
                    />

                    <input
                        type="number"
                        placeholder="Valor Unitário"
                        value={item.valorUnitario}
                        onChange={(e) =>
                            atualizarItem(index, "valorUnitario", Number(e.target.value))
                        }
                    />
                </div>
            ))}

            <button type="button" onClick={adicionarItem}>
                + Adicionar Item
            </button>

            <select value={tipo} onChange={(e) => setTipo(e.target.value)}>
                <option value="SERVICO">Serviços</option>
                <option value="PRODUTO">Produtos</option>
            </select>

            <button type="submit" disabled={loading}>
                {loading ? "salvando..." : "Emitir nota"}
            </button>
        </form>
    )
}