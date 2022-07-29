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

//poções
const Pocao = document.querySelector('#pocoes');
let QuantidadePocao = 3;

//Tratamento do input
let ValorInput = 0;


const testando = document.querySelector('#testando');


//função do botão de input;
botao.addEventListener('click', () => {

    AdicionarLog();
    InputTreatment();

    if (ValorInput == "AK1o3")
    {
       QuantidadeDeVidas--;
    } else if(ValorInput == "gk!]L")
    {
        Cura();
    }

    ClearInput();
})

//Adiciona texto no campo de LOG;
function AdicionarLog()
{
    let NovoLog = testando.cloneNode(false);
    NovoLog.innerHTML = input.value;

    logs.appendChild(NovoLog);
}

//Limpa a zona de input;
function ClearInput()
{
    input.value = "";
}

//Trata do input do jogador, para melhor funcionamento do código;
function InputTreatment()
{
    if(input.value === "vida")
    {
        ValorInput = "AK1o3";
    } else if (input.value === "cura")
    {
        ValorInput = "gk!]L";
    } else
    {
        ValorInput = 0;
    }
}


//Ao clicar em start, remove a tela de Inico;
BotaoStart.addEventListener('click', () => {
    LogoScreen.classList.add("esta-invisivel");
})

//Função que faz o calculo de dano e o update visual na vida do jogador;
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

//Atualização de poções na tela
function UpdatePotion()
{
    Pocao.innerHTML = QuantidadePocao;
}

//Função de Cura utilizando Poção
function Cura()
{

    if(QuantidadePocao > 0)
    {
        if(QuantidadeDeVidas >= 3)
        {
            return;
        } else if(QuantidadeDeVidas <= 0)
        {
            return;
        } else
        {
            QuantidadePocao--;

            QuantidadeDeVidas++;
        }
    }
}






//Função de update do jogo;
function UpdateGame()
{
    EstaMorto();
    Damage();
    UpdatePotion();
}

setInterval(UpdateGame, 10);