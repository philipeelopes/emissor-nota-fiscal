import { useEffect, useState } from "react";
import {
  getDashboard,
  getFaturamento,
  getPorCliente
} from "../../services/relatorios.service";
import styles from "../relatorios/Relatorio.module.css"
import { DashboardCards } from "./components/DashboardCards";

import type { DashboardResumo, FaturamentoPorCliente, FaturamentoResumo } from "../../types/Relatorios";
import { FiltroPeriodo } from "./components/FiltroPeriodo";
import { TabelaPorCliente } from "./components/TabelaPorCliente";
import { ResumoPeriodo } from "./components/ResumoPeriodo";

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

      {dashboard && <DashboardCards dashboard={dashboard} />}



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


      <FiltroPeriodo
        dataInicio={dataInicio}
        dataFim={dataFim}
        onChangeInicio={setDataInicio}
        onChangeFim={setDataFim}
        onAplicar={buscarFaturamento}
        onLimpar={async () => {
          const cli = await getPorCliente();
          setClientes(cli);
          setDataInicio("");
          setDataFim("");
          setFaturamento(null);
        }}
      />

      <ResumoPeriodo faturamento={faturamento} />

      <h2>Por cliente</h2>
      <TabelaPorCliente clientes={clientes} />




    </div >


  );
}
