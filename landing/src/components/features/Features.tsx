import {
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineLockClosed,
  HiOutlineClock,
  HiOutlineDeviceMobile,
} from "react-icons/hi"
import styles from "../features/Features.module.css"
import { useInView } from "react-intersection-observer"

export default function Features() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  })

  return (
    <section ref={ref} className={styles.features} id="features">
      <h1
        style={
          inView
            ? { opacity: 1, transform: "translateY(0)" }
            : { opacity: 0, transform: "translateY(-15px)" }
        }
      >
        Recursos Completos
      </h1>
      <p
        className={styles.principal}
        style={
          inView
            ? { opacity: 1, transform: "translateY(0)" }
            : { opacity: 0, transform: "translateY(15px)" }
        }
      >
        Tudo que você precisa para gerenciar suas notas fiscais de forma
        profissional
      </p>

      <div className={styles.box}>
        <div
          className={styles.pages}
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
          <HiOutlineDocumentText className={styles.icons} />
          <h2>Emissão Rápida</h2>
          <p>
            Emita notas fiscais em segundos com nosso sistema intuitivo e
            automatizado.
          </p>
        </div>

        <div
          className={styles.pages}
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
          <HiOutlineUsers className={styles.icons} />
          <h2>Gestão de Clientes</h2>
          <p>
            Mantenha todos os dados dos seus clientes organizados e acessíveis.
          </p>
        </div>

        <div
          className={styles.pages}
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
          <HiOutlineChartBar className={styles.icons} />
          <h2>Acompanhamento de Faturamento</h2>
          <p>
            Visualize seu faturamento em tempo real com relatórios detalhados.
          </p>
        </div>

        <div
          className={styles.pages}
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
          <HiOutlineLockClosed className={styles.icons} />
          <h2>Segurança Total</h2>
          <p>
            Seus dados protegidos com criptografia de ponta e backups
            automáticos.
          </p>
        </div>

        <div
          className={styles.pages}
          style={
            inView
              ? {
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.75s",
                }
              : { opacity: 0, transform: "translateY(15px)" }
          }
        >
          <HiOutlineClock className={styles.icons} />
          <h2>Disponível 24/7</h2>
          <p>
            Acesse de qualquer lugar, a qualquer hora. Sempre disponível quando
            precisar.
          </p>
        </div>

        <div
          className={styles.pages}
          style={
            inView
              ? {
                  opacity: 1,
                  transform: "translateY(0)",
                  transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1) 0.85s",
                }
              : { opacity: 0, transform: "translateY(15px)" }
          }
        >
          <HiOutlineDeviceMobile className={styles.icons} />
          <h2>Multi-dispositivo</h2>
          <p>Use em desktop, tablet ou smartphone. Totalmente responsivo.</p>
        </div>
      </div>
    </section>
  )
}