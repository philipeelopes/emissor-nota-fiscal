import styles from "../Relatorio.module.css";
import type { FaturamentoPorCliente } from "../../../types/Relatorios";

interface Props {
  clientes: FaturamentoPorCliente[];
}

export function TabelaPorCliente({ clientes }: Props) {
  if (!clientes || clientes.length === 0) {
    return <p>Nenhum dado encontrado para o período selecionado.</p>;
  }

  return (
    <table className={styles.tabela}>
      <thead>
        <tr>
          <th>Cliente</th>
          <th>Total faturado</th>
          <th>Notas</th>
        </tr>
      </thead>

      <tbody>
        {clientes.map((c, index) => (
          <tr key={index}>
            <td>{c.cliente}</td>
            <td>
              R$ {c.totalFaturado.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </td>
            <td>{c.quantidadeNotas}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}