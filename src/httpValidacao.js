import chalk from "chalk";

function extrairLinks(arrayLinks) {
    return arrayLinks.map((objetoLink) => Object.values(objetoLink).join());
}

async function checarStatus(listaUrl) {

    const arrayStatus = await Promise.all(
        listaUrl.map(async (url) => {

            try{
                const response = await fetch(url);
                return `${response.status} - ${response.statusText}`;
            } catch (erro){
                return analisaErros(erro);
            }
        })
    );

    return arrayStatus;
}

function analisaErros(erro) {
    if(erro.cause.code === 'ENOTFOUND') {
        return 'Link não encontrado !';
    } else {
        return 'Ocorreu algum erro !';
    }
}

export default async function listaValidada(listaLinks) {
    const links  = extrairLinks(listaLinks);
    const status = await checarStatus(links);
   
    return listaLinks.map((objeto, index) => ({
        ...objeto,
        status: status[index]
    }));
}