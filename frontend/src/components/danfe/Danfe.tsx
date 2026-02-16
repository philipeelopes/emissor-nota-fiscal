import styles from "./Danfe.module.css";
import type { NotaDanfe } from "../../types/NotaDanfe";

interface DanfeProps {
  nota: NotaDanfe;

  };


export default function Danfe({ nota }: DanfeProps) {
  // Garantias de segurança
  const prestador = nota?.prestador ?? { nome: "", cnpj: "", endereco: "" };
  const cliente =
    nota?.cliente && typeof nota.cliente === "object" ? nota.cliente : { nome: "", documento: "", endereco: "" };

  const itens = Array.isArray(nota?.itens) ? nota.itens : [];

  const total =
    itens.reduce(
      (acc: number, item: any) =>
        acc +
        Number(item.quantidade || 0) * Number(item.valorUnitario || 0),
      0
    ) || 0;

  const iss = nota?.iss ?? 0;

  return (
    <div className={styles.danfe} id="danfe">
      {/* Cabeçalho */}
      <header className={styles.header}>
        <div>
          <h1>DANFE</h1>
          <span>Documento Auxiliar da Nota Fiscal</span>
        </div>

        <div className={styles.infoNota}>
          <p>
            <strong>Nº:</strong> {nota?.numero ?? "-"}
          </p>
          <p>
            <strong>Emissão:</strong>{" "}
            {nota?.dataEmissao
              ? new Date(nota.dataEmissao).toLocaleDateString()
              : "-"}
          </p>
        </div>
      </header>

      {/* Prestador */}
      <section className={styles.bloco}>
        <h2>Prestador de Serviço</h2>
        <p>
          <strong>Empresa:</strong> {prestador.nome ?? "Não informado"}
        </p>
        <p>
          <strong>CNPJ:</strong> {prestador.cnpj ?? "-"}
        </p>
        <p>
          <strong>Endereço:</strong> {prestador.endereco ?? "-"}
        </p>
      </section>

      {/* Tomador */}
      <section className={styles.bloco}>
        <h2>Tomador de Serviço</h2>
        <p>
          <strong>Cliente:</strong> {cliente.nome ?? "Não informado"}
        </p>
        <p>
          <strong>CPF/CNPJ:</strong> {cliente.documento ?? "-"}
        </p>
        <p>
          <strong>Endereço:</strong> {cliente.endereco ?? "-"}
        </p>
      </section>

      {/* Serviços */}
      <section className={styles.bloco}>
        <h2>Serviços Prestados</h2>

        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Qtd</th>
              <th>Valor Unit.</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {itens.length > 0 ? (
              itens.map((item: any, index: number) => (
                <tr key={index}>
                  <td>{item.descricao}</td>
                  <td>{item.quantidade}</td>
                  <td>
                    R$ {Number(item.valorUnitario || 0).toFixed(2)}
                  </td>
                  <td>
                    R${" "}
                    {(
                      Number(item.quantidade || 0) *
                      Number(item.valorUnitario || 0)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} style={{ textAlign: "center" }}>
                  Nenhum serviço informado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </section>

      {/* Totais */}
      <section className={styles.totais}>
        <p>
          <strong>Valor dos Serviços:</strong> R$ {total.toFixed(2)}
        </p>
        <p>
          <strong>ISS:</strong> R$ {iss.toFixed(2)}
        </p>
        <p className={styles.totalFinal}>
          <strong>Valor Líquido:</strong> R$ {(total - iss).toFixed(2)}
        </p>
      </section>

      {/* Rodapé */}
      <footer className={styles.footer}>
        Documento gerado eletronicamente — sem validade fiscal
      </footer>
    </div>
  );
}
