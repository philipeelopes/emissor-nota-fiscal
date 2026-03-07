import styles from "../we/We.module.css"
import { HiOutlineBolt, HiOutlineBanknotes, HiOutlineChartBar, HiOutlinePhone } from "react-icons/hi2"
import CountUp from "react-countup"
import { useInView } from "react-intersection-observer"

export default function We() {
  const { ref: refSection, inView: inViewSection } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  const { ref: refCards, inView: inViewCards } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <section ref={refSection} className={styles.we}>
      <h1 style={inViewSection ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(-15px)" }}>
        Por Que Escolher Nossa Solução?
      </h1>
      <p 
        className={styles.textprincipal}
        style={inViewSection ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(15px)" }}
      >
        Benefícios que fazem a diferença no seu dia a dia
      </p>

      <div ref={refCards} className={styles.nos}>
        <div 
          className={styles.card}
          style={inViewCards ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(15px)" }}
        >
          <div className={styles.iconbox}>
            <HiOutlineBolt className={styles.icons} />
            <span className={styles.info}>
              <h3>{inViewCards && <CountUp end={80} duration={2} separator="." />}%</h3>
              <p>mais rápido</p>
            </span>
          </div>
          <h2>Economize Tempo</h2>
          <p>
            Reduza o tempo de emissão de notas em até 80% com nosso sistema
            automatizado.
          </p>
        </div>

        <div 
          className={styles.card}
          style={inViewCards ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(15px)" }}
        >
          <div className={styles.iconbox}>
            <HiOutlineBanknotes className={styles.icons} />
            <span className={styles.info}>
              <h3>R$ 0</h3>
              <p>papel impresso</p>
            </span>
          </div>
          <h2>Reduza Custos</h2>
          <p>
            Elimine gastos com papel, impressão e armazenamento físico de
            documentos.
          </p>
        </div>

        <div 
          className={styles.card}
          style={inViewCards ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(15px)" }}
        >
          <div className={styles.iconbox}>
            <HiOutlineChartBar className={styles.icons} />
            <span className={styles.info}>
              <h3>{inViewCards && <CountUp end={100} duration={2} separator="." />}%</h3>
              <p>visibilidade</p>
            </span>
          </div>
          <h2>Aumente Controle</h2>
          <p>
            Tenha visão completa do seu negócio com relatórios detalhados e
            dashboards.
          </p>
        </div>

        <div 
          className={styles.card}
          style={inViewCards ? { opacity: 1, transform: "translateY(0)" } : { opacity: 0, transform: "translateY(15px)" }}
        >
          <div className={styles.iconbox}>
            <HiOutlinePhone className={styles.icons} />
            <span className={styles.info}>
              <h3>{inViewCards && <CountUp end={27} duration={2} />}/7</h3>
              <p>disponível</p>
            </span>
          </div>
          <h2>Suporte Dedicado</h2>
          <p>
            Nossa equipe está sempre disponível para ajudar quando você
            precisar.
          </p>
        </div>
      </div>

      <div className={styles.dadosfinal}>
        <div className={styles.dados}>
          <h3>{inViewSection && <CountUp end={5000} duration={2} separator="." />}+</h3>
          <p>Notas emitidas</p>
        </div>

        <div className={styles.dados}>
          <h3>{inViewSection && <CountUp end={1200} duration={2} separator="." />}+</h3>
          <p>Empresas ativas</p>
        </div>

        <div className={styles.dados}>
          <h3>{inViewSection && <CountUp end={99.9} duration={2} decimals={1} />}%</h3>
          <p>Uptime</p>
        </div>
      </div>
    </section>
  )
}