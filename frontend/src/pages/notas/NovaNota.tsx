import { useEffect, useState } from "react";
import { api } from "../../api/api";
import type { Cliente } from "../../types/Cliente";
import styles from "./NovaNota.module.css";
import type { ItemNota } from "../../types/NotaFiscal";




export function NovaNota() {
    const [clientes, setClientes] = useState<Cliente[]>([]);
    const [clienteId, setClienteId] = useState("");
    const [tipo, setTipo] = useState<"SERVICO" | "PRODUTO">("SERVICO");
    const [itens, setItens] = useState<ItemNota[]>([
        { descricao: "", quantidade: "", valorUnitario: "" },
    ]);
    const [observacao, setObservacao] = useState("");
    const [loading, setLoading] = useState(false);



    useEffect(() => {
        api.get<Cliente[]>("/clientes").then((response) => {
            setClientes(response.data);
        });
    }, []);

    function adicionarItem() {
        setItens([...itens, { descricao: "", quantidade: "1", valorUnitario: "0" }]);
    }




    function atualizarItem<K extends keyof ItemNota>(
        index: number,
        campo: K,
        valor: ItemNota[K]
    ) {
        const novosItens = [...itens];
        novosItens[index][campo] = valor;
        setItens(novosItens);
    }


    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!clienteId) {
            alert("Selecione um cliente");
            return;
        }

        try {
            setLoading(true);



            await api.post("/notas", {
                cliente: clienteId,
                tipo,
                itens,
                observacao,
            });

            alert("Nota emitida com sucesso!");

            setClienteId("");
            setItens([{ descricao: "", quantidade: "1", valorUnitario: "0", }]);
        } catch (error) {
            console.error(error);
            alert("Erro ao emitir nota");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Emitir Nota Fiscal</h2>

            <select
                value={clienteId}
                onChange={(e) => setClienteId(e.target.value)}
            >
                <option value="">Selecione um cliente</option>
                {clientes.map((cliente) => (
                    <option key={cliente._id} value={cliente._id}>
                        {cliente.nome}
                    </option>
                ))}
            </select>

            <select value={tipo} onChange={(e) => setTipo(e.target.value as any)}>
                <option value="SERVICO">Serviço</option>
                <option value="PRODUTO">Produto</option>
            </select>

            <h3>Itens</h3>

            {itens.map((item, index) => (
                <div key={index} className={styles.item}>
                    <input
                        type="text"
                        placeholder="Descrição"
                        value={item.descricao}
                        onChange={(e) =>
                            atualizarItem(index, "descricao", e.target.value)
                        }
                    />

                    <input
                        type="number"
                        placeholder="Quantidade"
                        min={1}
                        value={item.quantidade}
                        onChange={(e) =>
                            atualizarItem(index, "quantidade", String(e.target.value))
                        }
                    />

                    <input
                        type="number"
                        placeholder="Valor Unitário"
                        min={0}
                        step="0.01"
                        value={item.valorUnitario}
                        onChange={(e) =>
                            atualizarItem(index, "valorUnitario", String(e.target.value))
                        }
                    />
                </div>


            ))}

            <div>

                <h3 className={styles.descricao}>
                    Observações(opcional)
                </h3>

                <textarea
                    placeholder="Observaçõesa adicionais a nota"
                    value={observacao}
                    onChange={(e) => setObservacao(e.target.value)}
                    rows={4}
                />
            </div>

            <button className={styles.adicionarItem} type="button" onClick={adicionarItem}>
                + Adicionar Item
            </button>

            <button className={styles.emitir} type="submit" disabled={loading}>
                {loading ? "Emitindo..." : "Emitir Nota"}
            </button>
        </form >
    );
}
