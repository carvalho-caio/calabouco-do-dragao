const imagem = document.querySelector("#background");
const logs = document.querySelector('#logs-game');
const input = document.querySelector('#input-player');
const botao = document.querySelector('#btn');
const BotaoStart = document.querySelector('#start-game');
const LogoScreen = document.querySelector('#game-start');

//vidas
const Vidas = document.querySelector('#vidas')
let QuantidadeDeVidas = 3;
let isDead = false;

//tela de game over;
const BtnGameOver = document.querySelector('#btn-game-over');
const GameOverScreen = document.querySelector('#game-over');



const testando = document.querySelector('#testando');

botao.addEventListener('click', () => {

    let NovoTeste2 = testando.cloneNode(false);
    NovoTeste2.innerHTML = input.value;

    logs.appendChild(NovoTeste2);

    if(input.value == "vida")
    {
       QuantidadeDeVidas--;
    }

    input.value = "";

    
})

BotaoStart.addEventListener('click', () => {
    LogoScreen.classList.add("esta-invisivel");
})

//Função que faz o calculo de dano e o updte visual na vida do jogador;
function Damage ()
{
    if(QuantidadeDeVidas == 3)
    {
        Vidas.src = "imagem/Vida-3.png";
    } else if(QuantidadeDeVidas == 2)
    {
        Vidas.src = "imagem/Vida-2.png";
    } else if(QuantidadeDeVidas == 1)
    {
        Vidas.src = "imagem/Vida-1.png";
    } else if(QuantidadeDeVidas <= 0)
    {
        Vidas.src = "imagem/Vida-0.png";
        isDead = true;
    }
}

//Funcao que trata a morte do jogador;
function EstaMorto()
{
    if(isDead)
    {
        GameOverScreen.classList.remove('esta-invisivel');
    }
}






//Função de update do jogo;
function UpdateGame()
{
    EstaMorto();
    Damage();
}

setInterval(UpdateGame, 100);