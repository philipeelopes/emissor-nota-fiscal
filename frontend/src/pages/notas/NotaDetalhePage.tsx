import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarNotaPorId } from "../../services/notas.service";
import type { NotaFiscal } from "../../types/NotaFiscal";
import styles from "./NotaDetalhes.module.css";

export default function DetalhesNota() {
  const { id } = useParams<{ id: string }>();
  const [nota, setNota] = useState<NotaFiscal | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    buscarNotaPorId(id)
      .then(setNota)
      .catch(() => alert("Erro ao carregar nota"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!nota) return <p>Nota não encontrada</p>;

  return (
    <div className={styles.container}>
      <h2>Nota Fiscal Nº {nota.numero}</h2>

      <p><strong>Cliente:</strong> {nota.cliente.nome}</p>
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
          {nota.itens.map((item, index) => (
            <tr key={index}>
              <td>{item.descricao}</td>
              <td>{item.quantidade}</td>
              <td>R$ {item.valorUnitario.toFixed(2)}</td>
              <td>R$ {(item.quantidade * item.valorUnitario).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Total da Nota: R$ {nota.valorTotal.toFixed(2)}</h3>
    </div>
  );
}
