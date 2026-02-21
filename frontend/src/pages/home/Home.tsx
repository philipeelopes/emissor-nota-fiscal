import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { buscarDashboard } from "../../services/dashboard.service";
import styles from "./Home.module.css";
import FaturamentoMensalChart from "../../components/FaturamentoMensal";
import ComparacaoFaturamentoChart from "../../components/ComparacaoFaturamento";

type DashboardDados = {
  totalNotas: number;
  notasCanceladas: number;
  valorEmitido: number;
  totalClientes: number;
}

export default function Home() {
  const [graficoAtivo, setGraficoAtivo] = useState<"mensal" | "comparacao">("mensal");

  const [dados, setDados] = useState<DashboardDados>({
    totalNotas: 0,
    notasCanceladas: 0,
    valorEmitido: 0,
    totalClientes: 0
  });

  useEffect(() => {
    buscarDashboard()
      .then(setDados)
      .catch(() => alert("Erro ao carregar dashboard"));
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Bem vindo ao Emissor de Notas</h1>
        <h2>Dashboard</h2>
        <p>Visão geral do emissor de notas</p>
      </div>

      <div className={styles.dashboard}>

        <div className={styles.cards}>
          <Link to="/notas" className={styles.card}>
            <div className={styles.icon}>📄</div>
            <h3>{dados.totalNotas}</h3>
            <p>Notas emitidas</p>
          </Link>

          <div className={styles.card}>
            <div className={styles.icon}>❌</div>
            <h3>{dados.notasCanceladas}</h3>
            <p>Notas canceladas</p>
          </div>

          <div className={styles.card}>
            <div className={styles.icon}>💰</div>
            <h3>
              R$ {(dados.valorEmitido ?? 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </h3>
            <p>Valor total emitido</p>
          </div>

          <Link to="/clientes" className={styles.card}>
            <div className={styles.icon}>👥</div>
            <h3>{dados.totalClientes}</h3>
            <p>Clientes cadastrados</p>
          </Link>

        </div>


        <div className={styles.grafico}>
          <div className={styles.graficoToggle}>
            <button
              className={graficoAtivo === "mensal" ? styles.ativo : ""}
              onClick={() => setGraficoAtivo("mensal")}
            >
              📈 Faturamento Mensal
            </button>

            <button
              className={graficoAtivo === "comparacao" ? styles.ativo : ""}
              onClick={() => setGraficoAtivo("comparacao")}
            >
              📊 Comparação Anual
            </button>
          </div>
          {graficoAtivo === "mensal" && <FaturamentoMensalChart />}
          {graficoAtivo === "comparacao" && <ComparacaoFaturamentoChart />}
        </div>
      </div>
    </div>






  );
}