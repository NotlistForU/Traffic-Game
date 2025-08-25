let numPistas = 5; // defina conforme o cenário criado
let numLinhas = 12; // total de linhas da tabela

let playerRow = numLinhas - 1; // última linha
let playerCol = Math.ceil(numPistas / 2); // meio da pista

function createPlayer() {
    let celula = document.querySelector(`td[data-row="${playerRow}"][data-col="${playerCol}"] .cell`);
    let imgPlayer = document.createElement("img");
    imgPlayer.src = "public/Carros/carMcLaren.png";
    imgPlayer.alt = "Porsche";
    imgPlayer.classList.add("player"); // classe diferente de "carro" para não confundir com tráfego
    celula.appendChild(imgPlayer);
}

function movePlayer(direcao) {
    let novaCol = playerCol + direcao;

    // impede sair da pista
    if (novaCol < 1 || novaCol > numPistas) return;

    // remove player da célula atual
    let celulaAtual = document.querySelector(`td[data-row="${playerRow}"][data-col="${playerCol}"] .cell`);
    let playerImg = celulaAtual.querySelector(".player");
    if (playerImg) celulaAtual.removeChild(playerImg);

    // atualiza posição
    playerCol = novaCol;

    // adiciona player na nova célula
    let novaCelula = document.querySelector(`td[data-row="${playerRow}"][data-col="${playerCol}"] .cell`);
    novaCelula.appendChild(playerImg);
}

// controles de teclado
document.addEventListener("keydown", (e) => {
    if (e.key === "a" || e.key === "A" || e.key === "ArrowLeft") {
        movePlayer(-1);
    } else if (e.key === "d" || e.key === "D" || e.key === "ArrowRight") {
        movePlayer(1);
    }
});

// inicializa player
createPlayer();
