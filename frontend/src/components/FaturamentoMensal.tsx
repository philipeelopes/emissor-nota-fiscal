import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { useEffect, useState } from "react";
import { buscarFaturamentoMensal } from "../services/dashboard.service";
import styles from "./FaturamnetoMensal.module.css";

type FaturamentoMensal = {
    mes: string;
    total: number;
};

export default function FaturamentoMensalChart() {
    const [dados, setDados] = useState<FaturamentoMensal[]>([]);
    const anoAtual = new Date().getFullYear();
    const [ano, setAno] = useState<number>(anoAtual);


    useEffect(() => {
        buscarFaturamentoMensal(ano)
            .then(setDados)
            .catch(() => console.error("Erro ao carregar faturamento"));
    }, [ano]);


    return (
        <div className={styles.container}>
            <h3 className={styles.titulo}>Faturamento mensal</h3>

            <div className={styles.filtro}>
                <label> Ano </label>
                <select value={ano}
                    onChange={(e) => setAno(Number(e.target.value))}
                >
                    <option value={2024}>2024</option>
                    <option value={2025}>2025</option>
                    <option value={2026}>2026</option>
                </select>
            </div>

            {dados.length === 0 ? (
                <p className={styles.vazio}>Nenhum faturamento encontrado para este ano</p>
            ) : (


                <ResponsiveContainer
                width="100%"
                height={300}
            >



                    <LineChart data={dados}
                        margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="mes" />

                        <YAxis
                            tickFormatter={(value) =>
                                `R$ ${Number(value).toLocaleString("pt-BR", {
                                    notation: "compact",
                                })}`
                            }
                        />

                        <Tooltip
                            formatter={(value) => [
                                `R$ ${Number(value).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2
                                })}`,
                                "Faturamento"
                            ]}
                        />

                        <Line
                            type="monotone"
                            dataKey="total"
                            stroke="#3a73ee"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>

                </ResponsiveContainer>
            )}
        </div>
    );
}