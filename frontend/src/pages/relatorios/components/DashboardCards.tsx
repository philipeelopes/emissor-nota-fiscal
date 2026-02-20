import styles from "../Relatorio.module.css";
import type { DashboardResumo } from "../../../types/Relatorios";

interface Props {
  dashboard: DashboardResumo;
}

export function DashboardCards({ dashboard }: Props) {
  return (
    <div className={styles.cards}>
      <div className={styles.card}>
        <strong>Total de notas</strong>
        <p>{dashboard.totalNotas}</p>
      </div>

      <div className={styles.card}>
        <strong>Canceladas</strong>
        <p>{dashboard.notasCanceladas}</p>
      </div>

      <div className={styles.card}>
        <strong>Faturamento</strong>
        <p>
          R$ {dashboard.valorEmitido.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}
        </p>
      </div>

      <div className={styles.card}>
        <strong>Clientes</strong>
        <p>{dashboard.totalClientes}</p>
      </div>
    </div>
  );
}