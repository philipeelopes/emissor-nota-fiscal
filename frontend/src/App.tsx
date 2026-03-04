import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Container from "./components/Container";
import { Suspense, lazy } from "react";
import Loader from "./components/Loader";
import PageLoader from "./components/PageLoader";

import NotaDetalhePage from "./pages/notas/NotaDetalhePage";

import "./App.css";

// Lazy pages
const About = lazy(() => import("./pages/about/About"))
const Home = lazy(() => import("./pages/home/Home"));
const Notas = lazy(() => import("./pages/notas/NotasPage"));
const Clientes = lazy(() => import("./pages/clientes/ClientesPage"));
const Relatorios = lazy(() => import("./pages/relatorios/Relatorio"));

export default function App() {
  return (
    <>
      <Header />

      <Suspense fallback={<Loader />}>
        <Routes>
          {/* FULLSCREEN */}
          <Route path="/about" element={<About />} />

          {/* COM CONTAINER */}
          <Route
            path="/*"
            element={
              <Container>
                <PageLoader>
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/notas" element={<Notas />} />
                    <Route path="/notas/:id" element={<NotaDetalhePage />} />
                    <Route path="/clientes" element={<Clientes />} />
                    <Route path="/relatorios" element={<Relatorios />} />
                  </Routes>
                </PageLoader>
              </Container>
            }
          />
        </Routes>
      </Suspense>
    </>
  );
}