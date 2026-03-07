import styles from "../cta/Cta.module.css"
import { FaArrowRight } from "react-icons/fa6"
import { FiCheckCircle } from "react-icons/fi"
import { useInView } from "react-intersection-observer"

export default function CTA() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  })

  return (
    <section ref={ref} className={styles.cta}>
      <h2
        style={
          inView
            ? {
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.1s",
              }
            : {
                opacity: 0,
                transform: "translateY(-15px)",
              }
        }
      >
        Comece a Emitir Notas Hoje
      </h2>

      <p
        className={styles.subtitle}
        style={
          inView
            ? {
                opacity: 0.9,
                transform: "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.2s",
              }
            : {
                opacity: 0,
                transform: "translateY(15px)",
              }
        }
      >
        Experimente gratuitamente por 30 dias. Sem cartão de crédito.
        Sem compromisso.
      </p>

      <div
        className={styles.benefits}
        style={
          inView
            ? {
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.3s",
              }
            : {
                opacity: 0,
                transform: "translateY(15px)",
              }
        }
      >
        <span>
          {" "}
          <FiCheckCircle className={styles.icons} /> Teste grátis{" "}
        </span>
        <span>
          {" "}
          <FiCheckCircle className={styles.icons} /> Sem taxa de instalação
        </span>
        <span>
          {" "}
          <FiCheckCircle className={styles.icons} /> Cancele quando quiser
        </span>
      </div>

      <a
        href="https://emissor-nota-fiscal-kh8r.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        className={styles.button}
        style={
          inView
            ? {
                opacity: 1,
                transform: "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.4s",
              }
            : {
                opacity: 0,
                transform: "translateY(15px)",
              }
        }
      >
        Testar Aplicação
        <FaArrowRight className={styles.iconArrow} />
      </a>

      <p
        className={styles.login}
        style={
          inView
            ? {
                opacity: 0.75,
                transform: "translateY(0)",
                transition: "all 0.6s cubic-bezier(0.4, 0, 0.2, 1) 0.5s",
              }
            : {
                opacity: 0,
                transform: "translateY(15px)",
              }
        }
      >
        Já possui uma conta? <a href="#">Faça login</a>
      </p>
    </section>
  )
}