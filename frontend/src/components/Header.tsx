import styles from "../components/Header.module.css"

export default function Header(){
    return(
        <header className={styles.header}>
            <h1>Emissor de Nota Fiscal</h1>
        </header>
    )
}