const imagem = document.querySelector("#background");
const logs = document.querySelector('#logs-game');
const input = document.querySelector('#input-player');
const botao = document.querySelector('#btn');
const BotaoStart = document.querySelector('#start-game');
const LogoScreen = document.querySelector('#game-start');

//tela de game over;
const BtnGameOver = document.querySelector('#btn-game-over');
const GameOverScreen = document.querySelector('#game-over');



const testando = document.querySelector('#testando');

botao.addEventListener('click', () => {

    let NovoTeste2 = testando.cloneNode(false);
    NovoTeste2.innerHTML = input.value;

    logs.appendChild(NovoTeste2);

    if(input.value == "game over")
    {
        GameOverScreen.classList.remove('esta-invisivel');
    }

    input.value = "";

    
})

BotaoStart.addEventListener('click', () => {
    LogoScreen.classList.add("esta-invisivel");
})