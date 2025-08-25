// posição inicial do obstaculo
let trafficRow = 0;
let caminhosLivresAtuais = [];

function inicializarCaminho(numPistas) {
  // começa no meio da pista
  caminhosLivresAtuais = [Math.ceil(numPistas / 2)];
}

function spawnCarrosCaminhoGarantido(numPistas, linha) {
  let novosLivres = new Set();

  // 🔹 Escolhe caminho principal
  let caminhoPrincipal = caminhosLivresAtuais[
    Math.floor(Math.random() * caminhosLivresAtuais.length)
  ];
  novosLivres.add(caminhoPrincipal);

  // 🔹 Chance de abrir para esquerda/direita
  if (caminhoPrincipal > 1 && Math.random() < 0.4) {
    novosLivres.add(caminhoPrincipal - 1);
  }
  if (caminhoPrincipal < numPistas && Math.random() < 0.4) {
    novosLivres.add(caminhoPrincipal + 1);
  }

  // 🔹 Chance de manter outros caminhos livres antigos
  caminhosLivresAtuais.forEach(caminho => {
    if (caminho !== caminhoPrincipal && Math.random() < 0.2) {
      novosLivres.add(caminho);
    }
  });

  // Atualiza para próxima rodada
  caminhosLivresAtuais = Array.from(novosLivres);

  // 🔹 Detecta colunas bloqueadas por carro na linha anterior
  let colunasBloqueadas = new Set();
  for (let pista = 1; pista <= numPistas; pista++) {
    const celulaAnterior = document.querySelector(`td[data-row="${linha+1}"][data-col="${pista}"] .carro`);
    if (celulaAnterior && pista !== caminhoPrincipal) {
      // 80% de chance de bloquear spawn atrás de um carro
      if (Math.random() < 1) {
        colunasBloqueadas.add(pista);
      }
    }
  }

  // 🔹 Preenche a linha
  for (let pista = 1; pista <= numPistas; pista++) {
    const celula = document.querySelector(`td[data-row="${linha}"][data-col="${pista}"] .cell`);
    if (!celula) continue;

    if (!novosLivres.has(pista) && !colunasBloqueadas.has(pista)) {
      // Fora do caminho e não bloqueado: chance de ter carro
      if (Math.random() < 0.7) {
        celula.innerHTML = "";
        const carro = document.createElement("img");
        carro.src = "public/Carros/trafficCar.png";
        carro.alt = "TrafficCar";
        carro.classList.add("carro");
        celula.appendChild(carro);
      }
      // 🔹 Aqui no futuro você pode colocar buraco/cone sem restrição de bloqueio
      /*
      else if (Math.random() < 0.1) {
        // spawn buraco
      } else if (Math.random() < 0.05) {
        // spawn cone
      }
      */
    }
  }
}


function moverCarros() {
  const carros = document.querySelectorAll(".carro");

  // Itera de baixo pra cima pra evitar mover o mesmo carro duas vezes
  [...carros].reverse().forEach(carro => {
    const celulaAtual = carro.parentElement.parentElement;
    const row = parseInt(celulaAtual.getAttribute("data-row"));
    const col = parseInt(celulaAtual.getAttribute("data-col"));

    const proximaCelula = document.querySelector(`td[data-row="${row + 1}"][data-col="${col}"] .cell`);

    if (proximaCelula) {
      // Só move se a célula de destino estiver vazia
      if (!proximaCelula.querySelector(".carro")) {
        proximaCelula.appendChild(carro);
      } else {
        carro.remove(); // bateu em outro carro
      }
    } else {
      carro.remove(); // chegou no fim
    }
  });
}

// Inicializa cenário
criarCenario(5);

inicializarCaminho(5);
setInterval(() => {
  moverCarros();
  spawnCarrosCaminhoGarantido(5, 0); // sempre gera no topo
}, 500);
