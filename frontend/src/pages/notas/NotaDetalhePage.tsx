import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarNotaPorId } from "../../services/notas.service";
import type { NotaFiscal } from "../../types/NotaFiscal";
import styles from "./NotaDetalhes.module.css";
import { CancelarNota  } from "../../services/notas.service";

export default function DetalhesNota() {
  const { id } = useParams<{ id: string }>();
  const [nota, setNota] = useState<NotaFiscal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    buscarNotaPorId(id)
      .then((data) =>
        setNota({
          ...data,
          itens: data.itens ?? [],
        })
      )
      .catch(() => alert("Erro ao carregar nota"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!nota) return <p>Nota não encontrada</p>;


  const totalCalculado =
  nota?.itens?.reduce(
    (total, item) =>
      total + Number(item.quantidade) * Number(item.valorUnitario),
    0
  ) ?? 0;


  async function handleCancelar() {
    if (!nota) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta nota fiscal?"
    );
    if (!confirmar) return;

    try {
      await CancelarNota(nota._id);
      alert("Nota cancelada com sucesso!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao cancelar nota");
    }
  };


  return (
    <div className={styles.container}>
      <h2>Nota Fiscal Nº {nota.numero}</h2>

      <p>
        <strong>Cliente:</strong>{" "}
        {nota?.cliente && typeof nota.cliente === "object"
          ? nota.cliente.nome
          : "Cliente não carregado"}
      </p>
      <p><strong>Status:</strong> {nota.status}</p>
      <p><strong>Tipo:</strong> {nota.tipo}</p>
      <p><strong>Data:</strong> {new Date(nota.dataEmissao).toLocaleDateString()}</p>

      <h3>Itens</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Valor Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(nota.itens) && nota.itens.length > 0 ? (
            nota.itens.map((item, index) => (
              <tr key={index}>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td>R$ {Number(item.valorUnitario).toFixed(2)}</td>
                <td>
                  R$ {(Number(item.quantidade) * Number(item.valorUnitario)).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum item encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

     <h3>Total da Nota: R$ {totalCalculado.toFixed(2)}</h3>

      { nota.status !== "CANCELADA" && (
      <button className={styles.cancelButton} onClick={handleCancelar}>
        Cancelar Nota
      </button>
     )}
    </div>
  );
}
