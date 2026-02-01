import type { ReactNode } from "react";
import styles from "../components/Container.module.css"

interface ContainerProps {
    children: ReactNode;
}

export default function Container({ children }: ContainerProps){
    return(
        <main className={styles.container}>
             {children}

        </main>
      
    )
}