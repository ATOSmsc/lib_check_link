// const res = await fetch('https://nodejs.org/api/documentation.json');
// if (res.ok) {
//   const data = await res.json();
//   console.log(data);
// };
import chalk from 'chalk';

function extaiLinks(arrLinks) {
    return arrLinks.map((objetoLink) => Object.values(objetoLink).join());
};

async function checaStatus(listaURLs) {
    const arrStatus = await Promise
        .all(
            listaURLs.map(async (url) => {
                try {
                    const response = await fetch(url, { method: 'HEAD' });
                    // console.log(response);
                    return `${response.status} - ${response.statusText}`;
                } catch (erro) {
                    return manejaErros(erro);
                };
            })
        );
    return arrStatus;
};

function manejaErros(erro) {
    if (erro.cause.code === 'ENOTFOUND') {
        return 'link não encontrado';
    } else {
        return 'algo de errado não está certo';
    };
};

export default async function listaValidada(listaDeLinks) {
    const links = extaiLinks(listaDeLinks);
    const status = await checaStatus(links);
    return listaDeLinks.map((objeto, indice) => ({
        ...objeto,
        status: status[indice]
    }));
};
