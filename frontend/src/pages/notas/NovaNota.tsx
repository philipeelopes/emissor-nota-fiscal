import { useEffect, useState } from "react";
import { api } from "../../api/api";
import type { Cliente } from "../../types/Cliente";
import styles from "./Notas.module.css";


export function NovaNota(){
    const [clientes, setClientes] = useState<Cliente[]>([])
    const [clienteId, setClienteId] = useState("");
    const [tipo, setTipo] = useState("SERVICO");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        api.get<Cliente[]>("/clientes").then((response) =>{
            setClientes(response.data)
        });
    }, [])
}