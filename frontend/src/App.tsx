import { Routes, Route } from "react-router-dom";
import  Home  from "./pages/home/Home";
import NotasPage from "./pages/notas/NotasPage";
import Header from "./components/Header";
import Container from "./components/Container";
import { ClientesPage } from "./pages/clientes/ClientesPage";
import NotaDetalhePage from "./pages/notas/NotaDetalhePage";
import Relatorio from "./pages/relatorios/Relatorio";

import './App.css';



export default function App() {
  return (

    <>
      <Header />


      <Container>
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<NotasPage />} />
          <Route path="/notas" element={<NotasPage />} />
          <Route path="/notas/:id" element={<NotaDetalhePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
          <Route path="/relatorios" element={<Relatorio />} />
          

        </Routes>
      </Container>
    </>
  )
}

