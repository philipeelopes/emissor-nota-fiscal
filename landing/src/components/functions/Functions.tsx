import styles from "../functions/Functions.module.css"
import { HiOutlineUserPlus, HiOutlinePencilSquare, HiOutlinePaperAirplane, HiOutlineCheckCircle } from "react-icons/hi2";


export default function Functions() {
    return (
        <section className={styles.container}>

            
                <h1>Como Funciona</h1>
                <p>Processo simples e direto em apenas 4 passos</p>

                <div className={styles.pages}>
                    <div className={styles.cards}>
                        <HiOutlineUserPlus className={styles.icons} />
                        <h1>Cadastre seus clientes</h1>
                        <p>Adicione os dados dos seus clientes de forma rápida e simples no sistema</p>
                    </div>

                    <div className={styles.cards}>
                        <HiOutlinePencilSquare className={styles.icons} />
                        <h1>Preencha os dados</h1>
                        <p> Insira as informações da nota fiscal com nosso formulário intuitivo.</p>
                    </div>

                    <div className={styles.cards}>
                        <HiOutlinePaperAirplane className={styles.icons} />
                        <h1>Emita e envie</h1>
                        <p>Gere a nota fiscal e envie automaticamente para o cliente por e-mail.</p>
                    </div>

                    <div className={styles.cards}>
                        <HiOutlineCheckCircle className={styles.icons} />
                        <h1>Acompanhe tudo</h1>
                        <p>Monitore todas as notas emitidas e seu faturamento em tempo real.</p>
                    </div>
                </div>
            

        </section>
    )

}