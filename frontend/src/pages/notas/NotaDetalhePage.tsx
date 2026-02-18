import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { buscarNotaPorId } from "../../services/notas.service";
import type { NotaFiscal } from "../../types/NotaFiscal";
import styles from "./NotaDetalhes.module.css";
import { CancelarNota } from "../../services/notas.service";
import { buscarEmpresa } from "../../services/empresa.service";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Danfe from "../../components/danfe/Danfe";
import type { NotaDanfe } from "../../types/NotaDanfe";




export default function DetalhesNota() {
  const { id } = useParams<{ id: string }>();
  const [nota, setNota] = useState<NotaFiscal | null>(null);
  const [loading, setLoading] = useState(true);
  const [empresa, setEmpresa] = useState<any>(null)
  const [mostrarDanfe, setMostrarDanfe] = useState(false);

  useEffect(() => {
    if (!id) return;

    Promise.all([
      buscarNotaPorId(id),
      buscarEmpresa()
    ])
      .then(([notaData, empresaData]) => {
        setNota({
          ...notaData,
          itens: notaData.itens ?? [],
        })
        setEmpresa(empresaData);
      })
      .catch(() => alert("Erro ao carregar nota"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Carregando...</p>;
  if (!nota) return <p>Nota não encontrada</p>;
  if (!empresa) return <p>Empresa não encontrada</p>


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


  const aliquotaISS = 0.05; // 5%
  const baseCalculo = totalCalculado;
  const issCalculado = baseCalculo * aliquotaISS;

  console.log("NOTA DO BACKEND:", nota);

  const notaDanfe: NotaDanfe = {
    numero: nota.numero.toString(),
    dataEmissao: nota.dataEmissao,

    competencia: new Date(nota.dataEmissao).toLocaleDateString("pt-BR", {
      month: "2-digit",
      year: "numeric"
    }),

    municipioIncidencia: empresa.municipio,
    naturezaOperacao: "Prestação de Serviços",
    observacao: nota.observacao,

    prestador: {
      nome: empresa.nomeFantasia,
      cnpj: empresa.cnpj,
      endereco: empresa.endereco
    },

    cliente: {
      nome: nota.cliente.nome,
      documento: nota.cliente.documento,
      endereco: nota.cliente.endereco || ""
    },

    itens: nota.itens.map(item => ({
      descricao: item.descricao,
      quantidade: Number(item.quantidade),
      valorUnitario: Number(item.valorUnitario)
    })),

    baseCalculo,
    aliquotaISS,
    iss: issCalculado,
    issRetido: false,
    totalServicos: undefined
  };


  return (

    <div className={styles.container}>
      <h2>Nota Fiscal Nº {nota.numero}</h2>

      <p>
        <strong>Cliente:</strong>{" "}
        {nota?.cliente?.nome ?? "Cliente não carregado"}
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
                <Danfe nota={notaDanfe} />
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
