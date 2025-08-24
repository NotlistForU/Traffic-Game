function criarCenario(numPistas, numLinhas = 12) {
  const colunasTotais = numPistas + 2; // 2 colunas extras: borda esquerda e direita
  const tabela = document.createElement("table");

  for (let row = 0; row < numLinhas; row++) {
    const tr = document.createElement("tr");

    for (let col = 0; col < colunasTotais; col++) {
      const td = document.createElement("td");
      td.setAttribute("data-row", row);
      td.setAttribute("data-col", col);

      const cell = document.createElement("div");
      cell.classList.add("cell");

      // Adiciona classes específicas se for borda ou pista
      if (col === 0 || col === colunasTotais - 1) {
        cell.classList.add("cenario"); // borda do cenário
      } else {
        cell.classList.add("pista"); // faixa de corrida
      }

      td.appendChild(cell);
      tr.appendChild(td);
    }

    tabela.appendChild(tr);
  }

  const wrap = document.querySelector(".wrap");
  wrap.innerHTML = ""; // limpa cenário anterior
  wrap.appendChild(tabela);
}
criarCenario(10);