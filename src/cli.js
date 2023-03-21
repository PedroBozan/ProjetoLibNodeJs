import pegarArquivo from './index.js';
import fs, { lstat } from 'fs';
import chalk from 'chalk';
import listaValidada from './httpValidacao.js';
import yargs from 'yargs';

function pegarComandoCli() {
    const comandoCli = yargs(process.argv.slice(2)).argv;
    return comandoCli;
}

async function imprimeLista(valida, resultado, identificador = '') {
    if(valida) {
        console.log(
            chalk.yellow('Lista Validada'),
            chalk.black.bgGreen(identificador),
            await listaValidada(resultado));
    } else {
        console.log(
            chalk.yellow('Lista de Links'),
            chalk.black.bgGreen(identificador),
            resultado);
    }
}

async function processarTexto(comandoCli) {

    const caminho = comandoCli._[0];
    const valida  = comandoCli.validar;

    try {
        fs.lstatSync(caminho);
    } catch (erro) {
        if(erro.code === 'ENOENT') {
            console.log('Arquivo ou diretório não existe !');
            return
        }
    }

    if(fs.lstatSync(caminho).isFile()) {

        const resultado = await pegarArquivo(caminho);
        imprimeLista(valida, resultado);

    } else if(fs.lstatSync(caminho).isDirectory()) {

        const arquivos = await fs.promises.readdir(caminho);
        arquivos.forEach(async (nomeArquivo) => {
            const lista = await pegarArquivo(`${caminho}/${nomeArquivo}`);
             imprimeLista(valida, lista, nomeArquivo);
        });
    }
}

processarTexto(pegarComandoCli());