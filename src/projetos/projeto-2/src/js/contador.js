/*========= SELEÇÃO DE ELEMENTOS ========*/
const valorContador = document.getElementById('valorContador');
const historicoContador = document.getElementById('historicoContador');
let contador = 0;
const valorMinimo = -10;
const valorMaximo = 10;
const historico = []; // Array para armazenar o histórico

/*========= FUNÇÃO: atualizarContador ========*/
function atualizarContador(adicionarAoHistorico = true) {
    valorContador.textContent = contador;
    if (contador <= valorMinimo) {
        valorContador.classList.add('limite-minimo');
        valorContador.classList.remove('limite-maximo');
    } else if (contador >= valorMaximo) {
        valorContador.classList.add('limite-maximo');
        valorContador.classList.remove('limite-minimo');
    } else {
        valorContador.classList.remove('limite-minimo');
        valorContador.classList.remove('limite-maximo');
    }

    if (adicionarAoHistorico) {
        historico.push(contador);
        atualizarHistorico();
    }
}

/*========= FUNÇÃO: atualizarHistorico ========*/
function atualizarHistorico() {
    historicoContador.innerHTML = '';
    historico.slice(-5).forEach(valor => { // Mostrar apenas os últimos 5 valores
        const novoItem = document.createElement('li');
        novoItem.textContent = valor;
        historicoContador.appendChild(novoItem);
    });
}

/*========= FUNÇÃO: incrementar ========*/
function incrementar() {
    if (contador < valorMaximo) {
        contador++;
        atualizarContador();
    }
}

/*========= FUNÇÃO: decrementar ========*/
function decrementar() {
    if (contador > valorMinimo) {
        contador--;
        atualizarContador();
    }
}

/*========= FUNÇÃO: resetar ========*/
function resetar() {
    contador = 0;
    atualizarContador();
}

/*========= INICIALIZAÇÃO ========*/
atualizarContador(false); // Inicializa a exibição sem adicionar ao histórico inicialmente
atualizarHistorico(); // Exibe o histórico inicial (vazio)