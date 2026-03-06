import styles from "./App.module.css"
import Features from "./components/features/Features";
import Functions from "./components/functions/Functions";
import Home from "./pages/home/Home"


export default function App() {
  return (
    <main className={styles.main}>

      <Home />
      <Features />
      <Functions />
    </main>




  );
}