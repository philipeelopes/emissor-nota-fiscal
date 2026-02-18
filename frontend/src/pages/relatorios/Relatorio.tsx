import { useEffect, useState } from "react";
import {
  getDashboard,
  getFaturamento,
  getPorCliente
} from "../../services/relatorios.service";
import styles from "../relatorios/Relatorio.module.css"

import type { DashboardResumo, FaturamentoPorCliente, FaturamentoResumo } from "../../types/Relatorios";

export default function Relatorios() {
  const [dashboard, setDashboard] = useState<DashboardResumo | null>(null);
  const [clientes, setClientes] = useState<FaturamentoPorCliente[]>([]);
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");
  const [faturamento, setFaturamento] = useState<FaturamentoResumo | null>(null);






  useEffect(() => {
    async function carregar() {
      const dash = await getDashboard();
      const cli = await getPorCliente();

      setDashboard(dash);
      setClientes(cli);
    }

    carregar();
  }, []);

  async function buscarFaturamento() {
    if (!dataInicio || !dataFim) {
      alert("Selecione data início e data fim");
      return;
    }
    if (new Date(dataInicio) > new Date(dataFim)) {
      alert("Data início não pode ser maior que data fim");
      return;
    }

    const fat = await getFaturamento({
      dataInicio,
      dataFim,
    });

    setFaturamento(fat);
  }

  return (
    <div>
      <h1>Relatórios</h1>

      <h2>Resumo</h2>


      {dashboard && (
        <div className={styles.cards}>
          <div className={styles.card}>
            <strong>Total de notas</strong>
            <p>{dashboard.totalNotas ?? 0}</p>
          </div>

          <div className={styles.card}>
            <strong>Canceladas</strong>
            <p>{dashboard.notasCanceladas ?? 0}</p>
          </div>

          <div className={styles.card}>
            <strong>Faturamento</strong>
            <p>
              R$ {(dashboard.valorEmitido ?? 0).toLocaleString("pt-BR", {
                minimumFractionDigits: 2
              })}
            </p>
          </div>

          <div className={styles.card}>
            <strong>Clientes</strong>
            <p>{dashboard.totalClientes ?? 0}</p>
          </div>
        </div>
      )
      }


      <section className={styles.porCliente}>
        <h2>Por cliente</h2>
        <ul>
          {Array.isArray(clientes) && clientes.map((c, index) => (
            <li key={index}>
              {c.cliente} — R$ {c.totalFaturado}
            </li>
          ))}
        </ul>
      </section>


      <h2>Faturamento por período</h2>

      <div className={styles.filtro}>
        <div>
          <label>Data início</label>
          <input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
          />
        </div>

        <div>
          <label>Data fim</label>
          <input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
          />
        </div>

        <button onClick={buscarFaturamento}>
          Aplicar
        </button>
      </div>

      <button
        onClick={async () => {
          const cli = await getPorCliente();
          setClientes(cli);
          setDataInicio("");
          setDataFim("");
          setFaturamento(null);
        }}
      >
        Limpar filtro
      </button>

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
                  minimumFractionDigits: 2
                })}
              </td>
              <td>{c.quantidadeNotas}</td>
            </tr>
          ))}
        </tbody>
      </table>



      {
        faturamento && (
          <div>
            <p>Total faturado: R$ {faturamento.totalFaturado}</p>
            <p>Quantidade de notas: {faturamento.quantidadeDeNotas}</p>
          </div>
        )
      }
    </div >


  );
}
