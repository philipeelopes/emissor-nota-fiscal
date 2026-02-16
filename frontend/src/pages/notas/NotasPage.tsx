import { useState, useEffect } from "react";
import { api } from "../../api/api";
import type { NotaFiscal } from "../../types/NotaFiscal";
import { Link } from "react-router-dom";
import { NovaNota } from "./NovaNota";
import styles from "../notas/Notas.module.css"

export default function NotasPage() {
  const [notas, setNotas] = useState<NotaFiscal[]>([]);

  useEffect(() => {
    api.get<{ notas: NotaFiscal[] }>("/notas").then((response) => {
      setNotas(response.data.notas);
    });
  }, []);


  return (
    <div className={styles.container}>

      <NovaNota />

      <h2 className={styles.title}>Notas Fiscais</h2>

      {notas.length === 0 && (
        <p className={styles.empty}>Nenhuma nota cadastrada.</p>
      )}

      {notas.length > 0 && (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Status</th>
              <th>Valor</th>
            </tr>
          </thead>
          <tbody>
            {notas.map((nota) => (
              <tr
                key={nota._id}
              >
                <td >
                  <Link className={styles.cliente} to={`/notas/${nota._id}`}>
                    {nota.cliente?.nome ?? "Cliente não iformado"}
                  </Link>
                </td>
                <td>
                  <span
                    className={
                      nota.status === "CANCELADA"
                        ? styles.statusCancelada
                        : styles.statusEmitida
                    }
                  >
                    {nota.status}
                  </span>
                </td>
                <td>R$ {nota.valorTotal.toFixed(2)}</td>

                <td>
                  <Link
                    to={`/notas/${nota._id}`}
                    className={styles.link}
                  >
                    Ver detalhes
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}