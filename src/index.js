import chalk from "chalk";
import fs from "fs";

function extrairLinks(texto) {

  const regex      = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const capturas   = [...texto.matchAll(regex)];
  const resultados = capturas.map(capturas => ({[capturas[1]] : capturas[2]}));

  return resultados.length !== 0 ? resultados : 'Não existem links no arquivo !';
}

function tratarErro(erro) {
  throw new Error(chalk.red(erro.code, "Arquivo não encontrado !"));
}

async function pegarArquivo(caminhoArquivo) {

  try {

    const encoding = "utf-8";
    const retorno = await fs.promises.readFile(caminhoArquivo, encoding);

    return extrairLinks(retorno);

  } catch (erro) {

    tratarErro(erro);
  }
}

export default pegarArquivo;