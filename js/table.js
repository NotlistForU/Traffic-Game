function criarCenario(numPistas, numLinhas = 12) {
  const wrap = document.querySelector(".wrap");

  const larguraPista = 80; // fixa
  const larguraTotalPistas = larguraPista * numPistas;

  // arredonde para evitar subpixel (drift acumulado)
  const wrapW = Math.round(wrap.clientWidth);
  const larguraBorda = Math.max(0, Math.floor((wrapW - larguraTotalPistas) / 2));

  document.documentElement.style.setProperty('--lane-width', `${larguraPista}px`);
  document.documentElement.style.setProperty('--border-width', `${larguraBorda}px`);
  document.documentElement.style.setProperty('--lanes', numPistas);

  const colunasTotais = numPistas + 2;
  const tabela = document.createElement("table");

  for (let row = 0; row < numLinhas; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < colunasTotais; col++) {
      const td = document.createElement("td");
      td.setAttribute("data-row", row);
      td.setAttribute("data-col", col);

      // classes para largura e estilo
      if (col === 0) {
        td.classList.add("borda-esquerda");
      } else if (col === colunasTotais - 1) {
        td.classList.add("borda-direita");
      } else {
        td.classList.add("pista");
      }
      if (col === 1) { // primeira pista (col 0 é a borda esquerda)
          td.classList.add("pista", "primeira");
      } else if (col === colunasTotais - 2) { // última pista (antes da borda direita)
          td.classList.add("pista", "ultima");
      } else if (col > 0 && col < colunasTotais - 1) {
          td.classList.add("pista");
      }

      const cell = document.createElement("div");
      cell.classList.add("cell");

      td.appendChild(cell);
      tr.appendChild(td);
    }
    tabela.appendChild(tr);
  }

  wrap.innerHTML = "";
  wrap.appendChild(tabela);
}
