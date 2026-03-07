import styles from "../hero/Hero.module.css"
import video from "../../assets/videos/teste3.mp4"
import { FaArrowRight, FaCircle } from "react-icons/fa6"

export default function Hero() {
  return (
    <section className={styles.hero}>
      <video
        className={styles.video}
        src={video}
        autoPlay
        loop
        muted
        playsInline
      />

      <div className={styles.overlay}></div>

      <div className={styles.container}>
        <h1>Emissor de Nota Fiscal</h1>

        <p>
          Gerencie clientes, emita notas fiscais e{" "}
          <span>acompanhe seu faturamento</span> de forma simples, rápida e
          profissional.
        </p>

        <div className={styles.buttons}>
          <a
            href="https://emissor-nota-fiscal-kh8r.vercel.app/"
            className={styles.primary}
          >
            Testar Aplicação
            <FaArrowRight className={styles.iconArrow} />
          </a>

          <a href="#features" className={styles.secondary}>
            Ver recursos
          </a>
        </div>

        <div className={styles.dados}>
          <p>
            <FaCircle className={styles.icon} />
            100% em nuvem
          </p>
          <p>
            <FaCircle className={styles.icon} />
            Segurança certificada
          </p>
          <p>
            <FaCircle className={styles.icon} />
            Suporte dedicado
          </p>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div className={styles.mouse}>
          <div className={styles.wheel}></div>
        </div>
      </div>
    </section>
  )
}