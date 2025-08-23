// posição inicial do player
let trafficRow = 0;
let trafficCol = 1;

// cria o carro
function createTrafficCar() {
    let celulaTraffic = document.querySelector(`td[data-row="${trafficRow}"][data-col="${trafficCol}"] .cell`);

    let imgTraffic = document.createElement("img");
    imgTraffic.src = "public/Carros/trafficCar.png";
    imgTraffic.alt = "TrafficCar";
    imgTraffic.style.transform = "rotate(90deg)";
    imgTraffic.classList.add("carro");

    celulaTraffic.appendChild(imgTraffic);
}

// inicializa o player
createTrafficCar();
