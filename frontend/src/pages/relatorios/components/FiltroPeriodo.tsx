import styles from "../Relatorio.module.css";

interface Props {
  dataInicio: string;
  dataFim: string;
  onChangeInicio: (value: string) => void;
  onChangeFim: (value: string) => void;
  onAplicar: () => void;
  onLimpar: () => void;
}

export function FiltroPeriodo({
  dataInicio,
  dataFim,
  onChangeInicio,
  onChangeFim,
  onAplicar,
  onLimpar,
}: Props) {
  return (
    <>
      <h2>Faturamento por período</h2>

      <div className={styles.filtro}>
        <div>
          <label>Data início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => onChangeInicio(e.target.value)}
          />
        </div>

        <div>
          <label>Data fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => onChangeFim(e.target.value)}
          />
        </div>

        <button onClick={onAplicar}>Aplicar</button>
      </div>

      <button className={styles.limpar} onClick={onLimpar}>Limpar filtro</button>
    </>
  );
}