import { useEffect } from "react";
import styles from "../about/About.module.css"
import videoBg from "../../assets/videos/fundo5.mp4";




export default function About() {

      useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, []);
 return(
  
    
     <main className={styles.container}>
      {/* vídeo de fundo */}
      <video
        className={styles.video}
        src={videoBg}
        autoPlay
        muted
        loop
        playsInline
      />
      <section className={styles.about}>
      
      </section>
    </main>


 
 

 )

}
