//Background
const imagem = document.querySelector("#background");
const LogoScreen = document.querySelector('#game-start');
const BotaoStart = document.querySelector('#start-game');
const GameText = document.querySelector('#game-text');

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
let QuantidadePocao = 3;

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

    MudarTextoPrincipal("Esse é o inicio de tudo, seu corno!");
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
            FaseInicio();
        }
    }

    botao.addEventListener('click', callback1);
}

function FaseL1(callback)
{
    imagem.src = "imagem/teste2.jpg";
}

Prologo();


//Função de update do jogo;
function UpdateGame()
{
    EstaMorto();
    Damage();
    UpdatePotion();
}




setInterval(UpdateGame, 10);