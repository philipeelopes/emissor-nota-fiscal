import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import styles from "../components/ComparacaoFaturamento.module.css";
import { useEffect, useState } from "react";
import { comparacaoFaturamentoAnual } from "../services/dashboard.service";

type DadosComparacao = {
    mes: string;
    anoAnterior: number;
    anoAtual: number;
};

export default function ComparacaoFaturamentoChart() {
    const anoAtual = new Date().getFullYear();
    const [dados, setDados] = useState<DadosComparacao[]>([]);

    useEffect(() => {
        comparacaoFaturamentoAnual(anoAtual - 1, anoAtual)
            .then((res) => {
                console.log(" dados comparação:", res);
                setDados(res);
            })
            .catch(() => console.error("Erro ao carregar comparação"));
    }, []);
    return (
        <div className={styles.container}>
            <h3 className={styles.titulo}>
                Comparação de Faturamento ({anoAtual - 1} x {anoAtual})
            </h3>

            <ResponsiveContainer width="100%" height={360}>
                <LineChart data={dados}
                 margin={{ top: 20, right: 20, left: 20, bottom: 30 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mes" 
                    
                    />
                    <YAxis
                        tickFormatter={(v) =>
                            `R$ ${Number(v).toLocaleString("pt-BR", {
                                notation: "compact",
                            })}`
                        }
                    />
                    <Tooltip
                        formatter={(value) =>
                            `R$ ${Number(value).toLocaleString("pt-BR", {
                                minimumFractionDigits: 2
                            })}`
                        }
                    />
                    <Legend />

                    <Line
                        type="monotone"
                        dataKey="anoAnterior"
                        name={`${anoAtual - 1}`}
                        stroke="#64748b"
                        strokeWidth={2}
                    />

                    <Line
                        type="monotone"
                        dataKey="anoAtual"
                        name={`${anoAtual}`}
                        stroke="#16a34a"
                        strokeWidth={3}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}