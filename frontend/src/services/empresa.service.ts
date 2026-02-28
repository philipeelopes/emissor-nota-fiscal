export async function buscarEmpresa() {

  const baseURL = import.meta.env.VITE_API_URL || "http://localhost:3333";

  const response = await fetch(`${baseURL}/empresa`);

  if (!response.ok) {
    throw new Error("Erro ao buscar Empresa");
  }

  const json = await response.json();

  return json.data;
}