import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarNotaPorId } from "../../services/notas.service";
import type { NotaFiscal } from "../../types/NotaFiscal";
import styles from "./NotaDetalhes.module.css";
import { CancelarNota } from "../../services/notas.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Danfe from "../../components/danfe/Danfe";

const notaFake = {
  numero: "000123",
  data: "12/02/2026",
  prestador: {
    nome: "Empresa Exemplo LTDA",
    cnpj: "12.345.678/0001-90",
    endereco: "Rua Exemplo, 123"
  },
  cliente: {
    nome: "João da Silva",
    documento: "123.456.789-00",
    endereco: "Av Brasil, 456"
  },
  servicos: [
    { descricao: "Desenvolvimento de sistema", quantidade: 1, valor: 1500 }
  ],
  total: 1500,
  iss: 75
};

export default function DetalhesNota() {
  const { id } = useParams<{ id: string }>();
  const [nota, setNota] = useState<NotaFiscal | null>(null);
  const [loading, setLoading] = useState(true);
  const [mostrarDanfe, setMostrarDanfe] = useState(false);

  useEffect(() => {
    if (!id) return;

    buscarNotaPorId(id)
      .then((data) =>
        setNota({
          ...data,
          itens: data.itens ?? [],
        })
      )
      .catch(() => alert("Erro ao carregar nota"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!nota) return <p>Nota não encontrada</p>;


  const totalCalculado =
    nota?.itens?.reduce(
      (total, item) =>
        total + Number(item.quantidade) * Number(item.valorUnitario),
      0
    ) ?? 0;


  async function handleCancelar() {
    if (!nota) return;

    const confirmar = window.confirm(
      "Tem certeza que deseja cancelar esta nota fiscal?"
    );
    if (!confirmar) return;

    try {
      await CancelarNota(nota._id);
      alert("Nota cancelada com sucesso!");
      window.location.reload();
    } catch (error) {
      alert("Erro ao cancelar nota");
    }
  };

  function gerarPDF() {
    const elemento = document.getElementById("danfe");
    if (!elemento) return;

    html2canvas(elemento, { scale: 2 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const largura = 210;
      const altura = (canvas.height * largura) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, largura, altura);
      pdf.save("danfe.pdf")
    })
  }


  return (

    <div className={styles.container}>
      <h2>Nota Fiscal Nº {nota.numero}</h2>

      <p>
        <strong>Cliente:</strong>{" "}
        {nota?.cliente && typeof nota.cliente === "object"
          ? nota.cliente.nome
          : "Cliente não carregado"}
      </p>
      <p><strong>Status:</strong> {nota.status}</p>
      <p><strong>Tipo:</strong> {nota.tipo}</p>
      <p><strong>Data:</strong> {new Date(nota.dataEmissao).toLocaleDateString()}</p>

      <h3>Itens</h3>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Qtd</th>
            <th>Valor Unit.</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(nota.itens) && nota.itens.length > 0 ? (
            nota.itens.map((item, index) => (
              <tr key={index}>
                <td>{item.descricao}</td>
                <td>{item.quantidade}</td>
                <td>R$ {Number(item.valorUnitario).toFixed(2)}</td>
                <td>
                  R$ {(Number(item.quantidade) * Number(item.valorUnitario)).toFixed(2)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4}>Nenhum item encontrado</td>
            </tr>
          )}
        </tbody>
      </table>

      <h3>Total da Nota: R$ {totalCalculado.toFixed(2)}</h3>


      <div className={styles.buttons}>
        {nota.status !== "CANCELADA" && (
          <button className={styles.cancelButton} onClick={handleCancelar}>
            Cancelar Nota
          </button>
        )}

        <button className={styles.danfeButton} onClick={() => setMostrarDanfe(true)}>
          visualizar / gerar PDF
        </button>

        {
          mostrarDanfe && (
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <Danfe nota={notaFake} />
                <div className={styles.action}>
                  <button className={styles.fechar} onClick={() => setMostrarDanfe(false)}>Fechar</button>
                   <button className={styles.gerar} onClick={() => gerarPDF()}>Gerar PDF</button>
                </div>
              </div>
            </div>
          )
        }
      </div>


    </div>
  );
}
