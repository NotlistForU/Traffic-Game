// posição inicial do player
let playerRow = 11;
let playerCol = 2;

// cria o carro
function createPlayer() {    
    let celula = document.querySelector(`td[data-row="${playerRow}"][data-col="${playerCol}"] .cell`);
    let imgPlayer = document.createElement("img");
    imgPlayer.src = "public/Carros/carMcLaren.png";
    imgPlayer.alt = "Porsche";
    imgPlayer.classList.add("carro");

    celula.appendChild(imgPlayer);
}

// inicializa o player
createPlayer();
