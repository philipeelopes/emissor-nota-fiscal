import { Link, useLocation } from "react-router-dom";
import styles from "./Header.module.css";
import logo from "../assets/logo.png";
import { FaHome, FaFileInvoice, FaUsers, FaChartBar } from "react-icons/fa";



export default function Header() {
  const location = useLocation();
  const isAbout = location.pathname === "/about";

  return (

    <header className={`${styles.header} ${isAbout ? styles.transparent : ""}`}>

      <div className={styles.left}>

        <nav className={styles.menu}>
          <h1>Emissor NFS-e</h1>
          <Link to="/home" className={styles.home}> <FaHome/> Home</Link>
          <Link to="/notas" className={styles.nota}> <FaFileInvoice/> Notas</Link>
          <Link to="/clientes" className={styles.clientes}> <FaUsers/> Clientes</Link>
          <Link to="/relatorios" className={styles.relatorios}> <FaChartBar/> Relatórios</Link>
        </nav>
      </div>
      <img className={styles.logo} src={logo} alt="Logo" />


        
   


    </header >
  );
}
