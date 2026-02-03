import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <h1>Emissor NF</h1>

      <nav>
        <Link to="/notas">Notas</Link>
        <Link to="/clientes">Clientes</Link>
      </nav>
    </header>
  );
}
