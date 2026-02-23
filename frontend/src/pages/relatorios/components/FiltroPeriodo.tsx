import styles from "../Relatorio.module.css";


interface Props {
  dataInicio: string;
  dataFim: string;
  loading: boolean,
  onChangeInicio: (value: string) => void;
  onChangeFim: (value: string) => void;
  onAplicar: () => void;
  onLimpar: () => void;
}

export function FiltroPeriodo({
  dataInicio,
  dataFim,
  loading,
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
            disabled={loading}
          />
        </div>

        <div>
          <label>Data fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => onChangeFim(e.target.value)}
            disabled={loading}
          />
        </div>

        <button onClick={onAplicar} disabled={loading}>
          {loading ? "Aplicando..." : "Aplicar"}</button>
      </div>

      <button 
      className={styles.limpar} 
      onClick={onLimpar}
      disabled={loading}
      >
      Limpar filtro</button>
    </>
  );
}