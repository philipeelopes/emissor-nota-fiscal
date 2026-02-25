async function buscarEmpresa(req, res) {
  try {
    const empresa = await prisma.empresa.findFirst();

    if (!empresa) {
      return res.status(200).json({
        nomeFantasia: "Empresa não cadastrada",
        cnpj: "-",
        endereco: "-",
        municipio: "-"
      });
    }

    return res.status(200).json({
      nomeFantasia: empresa.nome,
      cnpj: empresa.cnpj,
      endereco: empresa.endereco || "-",
      municipio: "Não informado"
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}