import NotasPage from "./pages/notas/NotasPage";
import Header from "./components/Header";
import Container from "./components/Container";
import './App.css';
import { ClientesPage } from "./pages/clientes/ClientesPage";




export default function App() {
  return (
    

      <div>
        <Header />
        <Container>
          <NotasPage />
        </Container>
        <ClientesPage/>

      </div>
    

  )

}

