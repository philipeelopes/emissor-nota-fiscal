import { Link } from "react-router-dom";
import styles from "./Header.module.css";
import { Suspense, lazy } from "react";




export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Emissor NFS-e</h1>

      <nav className={styles.menu}>
        <Link to="/home" className={styles.home}>Home</Link>
        <Link to="/notas" className={styles.nota}>Notas</Link>
        <Link to="/clientes" className={styles.clientes}>Clientes</Link>
        <Link to="/relatorios" className={styles.relatorios}>Relatórios</Link>
        
      </nav>
    </header>
  );
}
