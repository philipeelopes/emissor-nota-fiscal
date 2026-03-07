import styles from "../functions/Functions.module.css"
import {
  HiOutlineUserPlus,
  HiOutlinePencilSquare,
  HiOutlinePaperAirplane,
  HiOutlineCheckCircle,
} from "react-icons/hi2"
import { useInView } from "react-intersection-observer"

export default function Functions() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section ref={ref} className={styles.container}>
      <div className={styles.content}>
        <div className={styles.blurBall}></div>

        <h1
          className={styles.title}
          style={
            inView
              ? { opacity: 1, transform: "translateY(0)" }
              : { opacity: 0, transform: "translateY(-15px)" }
          }
        >
          Como Funciona
        </h1>
        <p
          className={styles.par}
          style={
            inView
              ? { opacity: 1, transform: "translateY(0)" }
              : { opacity: 0, transform: "translateY(15px)" }
          }
        >
          Processo simples e direto em apenas 4 passos
        </p>

        <div className={styles.pages}>
          <div className={styles.line}></div>

          <div
            className={styles.cards}
            style={
              inView
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.35s",
                  }
                : { opacity: 0, transform: "translateY(15px)" }
            }
          >
            <div className={styles.iconBox}>
              <HiOutlineUserPlus className={styles.icons} />
            </div>
            <span className={styles.step}>01</span>
            <h1>Cadastre seus clientes</h1>
            <p>
              Adicione os dados dos seus clientes de forma rápida e simples no
              sistema
            </p>
          </div>

          <div
            className={styles.cards}
            style={
              inView
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.45s",
                  }
                : { opacity: 0, transform: "translateY(15px)" }
            }
          >
            <div className={styles.iconBox}>
              <HiOutlinePencilSquare className={styles.icons} />
            </div>
            <span className={styles.step}>02</span>
            <h1>Preencha os dados</h1>
            <p>
              Insira as informações da nota fiscal com nosso formulário
              intuitivo.
            </p>
          </div>

          <div
            className={styles.cards}
            style={
              inView
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.55s",
                  }
                : { opacity: 0, transform: "translateY(15px)" }
            }
          >
            <div className={styles.iconBox}>
              <HiOutlinePaperAirplane className={styles.icons} />
            </div>
            <span className={styles.step}>03</span>
            <h1>Emita e envie</h1>
            <p>
              Gere a nota fiscal e envie automaticamente para o cliente por
              e-mail.
            </p>
          </div>

          <div
            className={styles.cards}
            style={
              inView
                ? {
                    opacity: 1,
                    transform: "translateY(0)",
                    transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.65s",
                  }
                : { opacity: 0, transform: "translateY(15px)" }
            }
          >
            <div className={styles.iconBox}>
              <HiOutlineCheckCircle className={styles.icons} />
            </div>
            <span className={styles.step}>04</span>
            <h1>Acompanhe tudo</h1>
            <p>
              Monitore todas as notas emitidas e seu faturamento em tempo real.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}