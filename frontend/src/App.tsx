import { Routes, Route } from "react-router-dom";
import NotasPage from "./pages/notas/NotasPage";
import Header from "./components/Header";
import Container from "./components/Container";
import { ClientesPage } from "./pages/clientes/ClientesPage";
import NotaDetalhePage from "./pages/notas/NotaDetalhePage";

import './App.css';



export default function App() {
  return (

    <>
      <Header />


      <Container>
        <Routes>
          <Route path="/" element={<NotasPage />} />
          <Route path="/notas" element={<NotasPage />} />
          <Route path="/notas/:id" element={<NotaDetalhePage />} />
          <Route path="/clientes" element={<ClientesPage />} />
        </Routes>
      </Container>
    </>
  )
}

