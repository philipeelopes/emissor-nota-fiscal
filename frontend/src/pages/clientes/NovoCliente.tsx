import { useState } from "react";
import { criarCliente } from "../../services/clientes.service";
import styles from "./NovoCliente.module.css";


type NovoClienteProps = {
  onClienteCriado: () => void;
};

export function NovoCliente({ onClienteCriado}: NovoClienteProps) {
    const [nome, setNome] = useState("")
    const [email, setEmail] = useState("");
    const [documento, setDocumento] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if(!nome || !email || !documento){
            alert("Preencha todos os campos")
            return;
        }

        try{
            setLoading(true);

            await criarCliente({
                nome,
                email,
                documento,
            });


            
            alert("Cliente cadastrado com sucesso");

            onClienteCriado();

            setNome("");
            setEmail("");
            setDocumento("");
        }catch (error) {
            console.error(error);
            alert("Erro ao cadastrar cliente");
        }finally {
            setLoading(false);
        }
    }

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <h2>Novo Cliente</h2>

           <input 
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)} 
            />

            <input 
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
            />

            <input 
            type="text"
            placeholder="Documento"
            value={documento}
            onChange={(e) => setDocumento(e.target.value)} 
            />

            <button type="submit" disabled={loading}>
                {loading ? "Salvando..." : "Cadastrar"}
            </button>
        </form>
    )

}