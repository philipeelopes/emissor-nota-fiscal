import styles from "./Footer.module.css"
import { HiOutlineDocumentText } from "react-icons/hi"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div className={styles.brand}>
          <h3 className={styles.nfe}>
            <HiOutlineDocumentText className={styles.icon} />
            NFS-e
          </h3>

          <p>
            A solução completa para emissão de notas fiscais eletrônicas. Simples,
            rápida e profissional.
          </p>
        </div>

        <div>
          <h4>Produto</h4>

          <ul>
            <li>Recursos</li>
            <li>Preços</li>
            <li>Tutoriais</li>
            <li>Atualizações</li>
          </ul>
        </div>

        <div>
          <h4>Empresa</h4>

          <ul>
            <li>Sobre nós</li>
            <li>Blog</li>
            <li>Carreiras</li>
            <li>Contato</li>
          </ul>
        </div>

        <div>
          <h4>Contato</h4>

          <ul>
            <li>contato@nfse.com.br</li>
            <li>(11) 3000-0000</li>
            <li>São Paulo, SP</li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© 2026 Emissor NFS-e. Todos os direitos reservados.</p>

        <div className={styles.links}>
          <a href="#">Privacidade</a>
          <a href="#">Termos</a>
          <a href="#">Cookies</a>
        </div>
      </div>
    </footer>
  )
}