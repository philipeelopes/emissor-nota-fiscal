import styles from "../we/We.module.css"
import { HiOutlineBolt, HiOutlineBanknotes, HiOutlineChartBar, HiOutlinePhone } from "react-icons/hi2";


export default function We() {
    return (
        <section className={styles.we}>
              <h1>Por Que Escolher Nossa Solução?</h1>
                <p>Benefícios que fazem a diferença no seu dia a dia</p>
            <div className={styles.nos}>
              

                <div className={styles.card}>
                    <div className={styles.iconbox}> <HiOutlineBolt className={styles.icons} />80% </div>
                    <h2> Economize Tempo  </h2>
                    <p>Reduza o tempo de emissão de notas em até 80% com nosso sistema automatizado.</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.iconbox}> <HiOutlineBanknotes className={styles.icons} /> R$ 0</div>
                    <h2> Reduza Custos </h2>
                    <p> Elimine gastos com papel, impressão e armazenamento físico de documentos.</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.iconbox}> <HiOutlineChartBar className={styles.icons} />100%</div>
                    
                    <h2> Aumente Controle </h2>
                    <p>Tenha visão completa do seu negócio com relatórios detalhados e dashboards.</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.iconbox}> <HiOutlinePhone className={styles.icons} /> 24/7</div>
                    
                    <h2>Suporte Dedicado</h2>
                    <p>Nossa equipe está sempre disponível para ajudar quando você precisar.</p>
                </div>

            </div>


            <div className={styles.dadosfinal}>
                <div className={styles.dados}>
                    <h2>5.000 +</h2>
                    <p>Notas emitidas</p>
                </div>

               <div className={styles.dados}>
                 <h2>1.200 +</h2>
                    <p>Empresas ativas</p>
               </div>

                 <div className={styles.dados}>
                 <h2>99.9%</h2>
                    <p>Uptime</p>
               </div>
               
            </div>



        </section>
    )

}