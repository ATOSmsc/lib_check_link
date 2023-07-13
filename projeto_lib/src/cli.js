#!/usr/bin/env node
import fs from 'fs';
import chalk from 'chalk';
import pegaArquivo from './index.js';
import listaValidada from './http-validacao.js';

const path = process.argv;

async function imprimeLista(valida, resultado, identificador = '') {
    if (valida) {
        console.log(
            chalk.yellow('lista validada'),
            chalk.black.bgGreen('identificador'),
            await listaValidada(resultado)
        );
    } else {
        console.log(
            chalk.yellow('lista de links'),
            chalk.black.bgGreen(identificador),
            resultado
        );
    };
};

async function processaTexto(argumentos) {
    const path = argumentos[2];
    const valida = argumentos[3] === '--valida';
    // console.log(valida);

    try {
        fs.lstatSync(path);
    } catch (erro) {
        if (erro.code === 'ENOENT') {
            console.log('arquivo ou diretorio não existe');
            return
        };
    };

    if (fs.lstatSync(path).isFile()) {
        const resultado = await pegaArquivo(argumentos[2]);
        imprimeLista(valida, resultado);
    } else if (fs.lstatSync(path).isDirectory()) {
        const arquivos = await fs.promises.readdir(path)
        arquivos.forEach(async (nomeDeArquivo) => {
            const lista = await pegaArquivo(`${path}/${nomeDeArquivo}`)
            // console.log(`${path}/${nomeDeArquivo}`);
            imprimeLista(valida, lista, nomeDeArquivo);
        });
        console.log(arquivos);
    };
};
processaTexto(path);