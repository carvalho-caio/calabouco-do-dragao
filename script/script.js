//code below;

const imagem = document.querySelector("#background");
const logs = document.querySelector('#logs-game');
const input = document.querySelector('#input-player');
const botao = document.querySelector('#btn');

const testando = document.querySelector('#testando');

botao.addEventListener('click', () => {

    let NovoTeste2 = testando.cloneNode(false);
    NovoTeste2.innerHTML = input.value;

    logs.appendChild(NovoTeste2);
    input.value = "";
})