import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    AreaChart,
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

    useEffect(() => {
        buscarFaturamentoMensal().then(setDados);
    }, []);

    return (
        <div className={styles.container}>
            <h3 className={styles.titulo}>Faturamento mensal</h3>

            <ResponsiveContainer>

              

                    <LineChart data={dados}
                        margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />

                        <XAxis dataKey="mes" />

                        <YAxis
                            tickFormatter={(value) =>
                                `R$ ${Number(value).toLocaleString("pt-BR", {
                                    minimumFractionDigits: 2
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
                            stroke="#2563eb"
                            strokeWidth={3}
                            dot={{ r: 5 }}
                            activeDot={{ r: 7 }}
                        />
                    </LineChart>
                    
            </ResponsiveContainer>
        </div>
    );
}