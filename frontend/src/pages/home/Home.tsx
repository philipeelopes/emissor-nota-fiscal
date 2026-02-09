import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { buscarResumoDashboard, buscarTotalClientes } from "../../services/dashboard.service";
import styles from "./Home.module.css";


export default function Home() {
  const [dados, setDados] = useState({
    totalNotas: 0,
    notasCanceladas: 0,
    valorTotal: 0,
    totalClientes: 0
  });

  useEffect(() => {
    async function carregarDashboard() {
      try {
        const resumo = await buscarResumoDashboard();
        const totalClientes = await buscarTotalClientes();

        setDados({
          totalNotas: resumo.totalNotas,
          notasCanceladas: resumo.notasCanceladas,
          valorTotal: resumo.valorTotal,
          totalClientes
        });
      } catch {
        alert("Erro ao carregar dashboard");
      }
    }

    carregarDashboard();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1>Dashboard</h1>
        <p>Visão geral do emissor de notas</p>
      </div>

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
            R$ {dados.valorTotal.toFixed(2)}
          </h3>
          <p>Valor total emitido</p>
        </div>

        <Link to="/clientes" className={styles.card}>
          <div className={styles.icon}>👥</div>
          <h3>{dados.totalClientes}</h3>
          <p>Clientes cadastrados</p>
        </Link>
      </div>
    </div>
  );
}