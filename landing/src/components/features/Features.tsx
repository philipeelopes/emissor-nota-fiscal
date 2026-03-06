
import { HiOutlineDocumentText,  HiOutlineUsers, HiOutlineChartBar, HiOutlineLockClosed, HiOutlineClock,  HiOutlineDeviceMobile } from "react-icons/hi";
import styles from "../features/Features.module.css"



export default function Features(){
    return(
        <section className={styles.features}>
            <h1>Rescuros Completos</h1>
            <p className={styles.principal}>Tudo que você precisa para gerenciar suas notas fiscais de forma profissional</p>

            <div className={styles.box}>
                <div className={styles.pages}>
                    < HiOutlineDocumentText  className={styles.icons}/>
                    <h2>Emissão Rápida</h2>
                    <p>Emita notas fiscais em segundos com nosso sistema intuitivo e automatizado.</p>
                </div>

                <div className={styles.pages}>
                    <HiOutlineUsers className={styles.icons}/>
                    <h2>Gestão de Clientes</h2>
                    <p>Mantenha todos os dados dos seus clientes organizados e acessíveis.</p>
                </div>

                <div className={styles.pages}>
                    <HiOutlineChartBar   className={styles.icons}/>
                    <h2>Acompanhamento de Faturamento</h2>
                    <p>Visualize seu faturamento em tempo real com relatórios detalhados.</p>
                </div>

                <div className={styles.pages}>
                    <HiOutlineLockClosed    className={styles.icons}/>
                    <h2>Segurança Total</h2>
                    <p>Seus dados protegidos com criptografia de ponta e backups automáticos.</p>
                </div>

                <div className={styles.pages}>
                    < HiOutlineClock  className={styles.icons} />
                    <h2>Disponível 24/7</h2>
                    <p>Acesse de qualquer lugar, a qualquer hora. Sempre disponível quando precisar.</p>
                </div>

                <div className={styles.pages}>
                    <HiOutlineDeviceMobile className={styles.icons}/>
                    <h2>Multi-dispositivo</h2>
                    <p>Use em desktop, tablet ou smartphone. Totalmente responsivo.</p>
                </div>



            </div>


        </section>


    )


}