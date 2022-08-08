//Background
const imagem = document.querySelector("#background");
const LogoScreen = document.querySelector('#game-start');
const BotaoStart = document.querySelector('#start-game');
const GameText = document.querySelector('#game-text');
const TelaVitoria = document.querySelector('#tela-vitoria');

//Logs
const logs = document.querySelector('#logs-game');
const input = document.querySelector('#input-player');
const botao = document.querySelector('#btn');

//Vidas
const Vidas = document.querySelector('#vidas')
let QuantidadeDeVidas = 3;
let isDead = false;

//Tela de game over;
const BtnGameOver = document.querySelector('#btn-game-over');
const GameOverScreen = document.querySelector('#game-over');

//Poções
const Pocao = document.querySelector('#pocoes');
let QuantidadePocao = 2;

//Game log managment
const GameLog = document.querySelector('#Game-Log');


//função do botão de input;
botao.addEventListener('click', LogandoTexto);

//test
function LogandoTexto()
{
    AdicionarLogJogador();

    ClearInput();
}

//Adiciona texto no campo de LOG;
function AdicionarLogJogador()
{
    let NovoLog = GameLog.cloneNode(false);
    NovoLog.innerHTML = input.value;
    NovoLog.classList.add("cor-log-jogador");

    logs.appendChild(NovoLog);
}

//Função que vai contar a "historia" do jogo;
function MudarTextoPrincipal(texto1)
{
    GameText.innerHTML = texto1;
}

//Adiciona um log via código;
function AdicionarLogDev(texto)
{
    let NovissimoLog = GameLog.cloneNode(false);
    NovissimoLog.innerHTML = texto;
    NovissimoLog.classList.add("cor-log-dev");

    logs.appendChild(NovissimoLog);
}

//Limpa a zona de input;
function ClearInput()
{
    input.value = "";
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
            AdicionarLogDev("Já está com a vida cheia!");
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

function Prologo()
{
    MudarTextoPrincipal("Você se depara com uma masmorra, e, escuta uma voz abafada pedindo socorro! Como um bom aventureiro, você adentra a masmorra.");
    AdicionarLogDev("Comandos: ");
    AdicionarLogDev("Proximo (Vai para a proxima sala!)");

    botao.removeEventListener('click', LogandoTexto);

    let callback = () => {
        if(input.value == 'Proximo')
        {
            LogandoTexto();
            FaseInicio(callback);
        }else
        {
            LogandoTexto();
            AdicionarLogDev("Comando invalido!");
        }
    }

    botao.addEventListener('click', callback);
}

function FaseInicio(callback)
{

    MudarTextoPrincipal("Ao entrar no calabouço, você sente um arrepio descer sua espinha. Um sentimento ruim se abate sobre você, mas sua vontade não falha, e você decide continuar.");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Proximo (Avança para a proxima sala!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");

    imagem.src = "imagem/teste.jpg"
    
    botao.removeEventListener('click', callback);

    const callback1 = () => {
        if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseL1(callback1);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseInicio(callback1);
        }
    }

    botao.addEventListener('click', callback1);
}

let TrapDamage = true;

function FaseL1(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("A luz da entrada já desapareceu completamente, você tropeça e cai sob cacos de vidro no chão, devivo a pouca visão. Você começa a escutar sussurros, que parecem vir das paredes...");

    if(TrapDamage)
    {
        QuantidadeDeVidas--;
        TrapDamage = false;
    }

    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Proximo (Avança para a proxima sala!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");
    
    imagem.src = "imagem/teste2.jpg";

    let callback2 = () => {
        if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseL2(callback2);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseL1(callback2);
        }
    }

    botao.addEventListener('click', callback2);
}

function FaseL2(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Você encontra uma bifurcação. Dois caminhos estão diante de você, mas qual é o correto?");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Esquerda (Avança pelo caminho da esquerda!)");
    AdicionarLogDev("Direita (Avança pelo caminho da direita!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");

    imagem.src = "imagem/teste.jpg"

    let callback3 = () => {
        if(input.value == "Esquerda")
        {
            LogandoTexto();
            FaseL3(callback3);
        } else if(input.value == "Direita")
        {
            LogandoTexto();
            FaseD1(callback3);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseL2(callback3);
        }
    }

    botao.addEventListener('click', callback3);
}

function FaseD1(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Nessa sala você encontra um baú, mas será que é seguro abri-lo?");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Abrir (Tenta abrir o baú, mas pode haver armadilhas.)");
    AdicionarLogDev("Proximo (Avança para a próxima sala, ignorando o baú)");

    imagem.src = "imagem/teste2.jpg";

    let callback6 = () => {
        if(input.value == "Abrir")
        {
            LogandoTexto();
            AdicionarLogDev("Poção encontrada!");
            QuantidadePocao++;
            FaseD2(callback6);
        } else if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseD2(callback6);
        }
    }

    botao.addEventListener('click', callback6);
}

function FaseD2(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Você encontra um inimigo! Um urso selvagem, enorme e com garras afiadas, parte pra cima de você!");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Atacar (Batalha com a criatura para avançar, podendo sofrer dano.)");
    AdicionarLogDev("Fugir (Tenta avançar para a próxima fase fugindo da criatura, podendo sofrer dano.)");

    imagem.src = "imagem/teste.jpg";

    let callback7 = () => {
        if(input.value == "Atacar")
        {
            LogandoTexto();
            QuantidadeDeVidas = QuantidadeDeVidas - 2;
            FaseT1(callback7);
        } else if(input.value == "Fugir")
        {
            LogandoTexto();
            QuantidadeDeVidas--;
            FaseT1(callback7);
        }
    }

    botao.addEventListener('click', callback7);
}

function FaseL3(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Você encontra um inimigo! Um lobo selvagem com os olhos vermelhos te encara, pronto para atacar!");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Atacar (Batalha com a criatura para avançar, podendo sofrer dano.)");
    AdicionarLogDev("Fugir (Tenta avançar para a próxima fase fugindo da criatura, podendo sofrer dano.)");

    imagem.src = "imagem/teste2.jpg";

    let callback4 = () => {
        if(input.value == "Atacar")
        {
            LogandoTexto();
            FaseL4(callback4);
        } else if(input.value == "Fugir")
        {
            LogandoTexto();
            --QuantidadeDeVidas;
            FaseL4(callback4);
        }
    }

    botao.addEventListener('click', callback4);
}

function FaseL4(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Uma unica tocha ilumina a sala. Quase em completa escuridão, você escuta a voz pedindo socorro novamente, mas dessa vez, está mais perto de você.");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Proximo (Avança para a proxima sala!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");

    imagem.src = "imagem/teste.jpg";
    
    let callback5 = () => {
        if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseT1(callback5);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseL4(callback5);
        }
    }

    botao.addEventListener('click', callback5);
}

function FaseT1(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Você se encontra em uma sala pequena, com uma enorme porta a frente.");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Proximo (Avança para a proxima sala!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");
    
    imagem.src = "imagem/teste2.jpg";

    let callback8 = () => {
        if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseT2(callback8);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseT1(callback8);
        }
    }

    botao.addEventListener('click', callback8);
}

function FaseT2(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Um enorme corredor está a sua frente, com pilares negros e poucas tochas iluminando seu caminho. Você tem a sensação de que algo terrivel te espera...");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Proximo (Avança para a proxima sala!)");
    AdicionarLogDev("Curar (Utiliza uma de suas poções para recuperar vida.)");

    imagem.src = "imagem/teste.jpg";

    let callback9 = () => {
        if(input.value == "Proximo")
        {
            LogandoTexto();
            FaseB0(callback9);
        } else if(input.value == "Curar")
        {
            LogandoTexto();
            Cura();
            FaseT2(callback9);
        }
    }

    botao.addEventListener('click', callback9);
}

function FaseB0(callback)
{
    botao.removeEventListener('click', callback);

    MudarTextoPrincipal("Você encontra um enorme Dragão, fazendo uma donzela de refém! A fera enorme e assutadora rugi e abre as asas quando te vê!");
    AdicionarLogDev("Comandos disponiveis:");
    AdicionarLogDev("Atacar (Tenta combater o Dragão!)");
    AdicionarLogDev("Fugir (Tenta pegar a donzella e fugir do Dragão!)");

    imagem.src = "imagem/teste2.jpg";

    let finalcallback = () => {
        if(input.value == "Atacar")
        {
            LogandoTexto();
            TelaVitoria.classList.remove('esta-invisivel');
        } else if(input.value == "Fugir")
        {
            LogandoTexto();
            QuantidadeDeVidas = 0;
        }
    }

    botao.addEventListener('click', finalcallback);
}

Prologo();

//Função de update do jogo;
function UpdateGame()
{
    EstaMorto();
    Damage();
    UpdatePotion();
}

setInterval(UpdateGame, 5);