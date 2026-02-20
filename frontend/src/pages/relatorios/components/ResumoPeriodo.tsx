import styles from "../Relatorio.module.css";
import type { FaturamentoResumo } from "../../../types/Relatorios";

interface Props {
  faturamento: FaturamentoResumo | null;
}

export function ResumoPeriodo({ faturamento }: Props) {
  if (!faturamento) return null;

  return (
    <div className={styles.resumoPeriodo}>
      <div>
        <strong>Total faturado</strong>
        <p>
          R$ {faturamento.totalFaturado.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      <div>
        <strong>Quantidade de notas</strong>
        <p>{faturamento.quantidadeDeNotas}</p>
      </div>
    </div>
  );
}