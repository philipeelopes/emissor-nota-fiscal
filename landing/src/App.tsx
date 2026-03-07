import styles from "./App.module.css"
import Features from "./components/features/Features";
import Functions from "./components/functions/Functions";
import We from "./components/we/We"
import Cta from "./components/cta/Cta"
import Home from "./pages/home/Home"
import Footer from "./components/footer/Footer";


export default function App() {
  return (
    <main className={styles.main}>

      <Home />
      <Features />
      <Functions />
      <We/>
      <Cta/>
      <Footer/>
    </main>




  );
}