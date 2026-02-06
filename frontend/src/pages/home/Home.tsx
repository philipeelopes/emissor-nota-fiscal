
import styles from "./Home.module.css";



export default function Home() {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Bem-vindo ao Emissor de Nota Fiscal</h1>

            <p className={styles.subtitle}>
                Gerencie seus clientes, emita notas fiscais e acompanhe seus resultados.
            </p>

            <div className={styles.cards}>
                <div className={styles.card}>
                    <h3>Clientes</h3>
                    <p>Cadastre e gerencie seus clientes</p>
                </div>

                <div className={styles.card}>
                    <h3>Notas Fiscais</h3>
                    <p>Emita, visualize e cancele notas</p>
                </div>

                <div className={styles.card}>
                    <h3>Relatórios</h3>
                    <p>Acompanhe faturamento e status</p>
                </div>
            </div>
        </div>
    );
}

