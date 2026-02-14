export async function buscarEmpresa() {
    const response = await fetch("http://localhost:3333/empresa")

    if(!response.ok){
        throw new Error("Erro ao buscar Empresa")
    }

    return response.json();
    
}