// ========== Seleção de Elementos do DOM ==========
const inputNovaTarefa = document.getElementById('novaTarefa');
const listaDeTarefas = document.getElementById('listaDeTarefas');
const chaveLocalStorage = 'listaDeTarefas';
let tarefas = []; // Array para armazenar todas as tarefas

// ========== Funções de Inicialização ==========
carregarTarefas();
exibirTarefas(); // Exibir as tarefas carregadas

// ========== Funções de Local Storage ==========
function carregarTarefas() {
    const tarefasSalvas = localStorage.getItem(chaveLocalStorage);
    if (tarefasSalvas) {
        tarefas = JSON.parse(tarefasSalvas);
    }
}

function salvarTarefas() {
    localStorage.setItem(chaveLocalStorage, JSON.stringify(tarefas));
}

// ========== Função para Adicionar Nova Tarefa ==========
function adicionarTarefa() {
    const textoTarefa = inputNovaTarefa.value.trim();
    if (textoTarefa !== '') {
        const novaTarefa = {
            id: Date.now(), // Adicionar um ID único para cada tarefa
            texto: textoTarefa,
            concluida: false
        };
        tarefas.push(novaTarefa);
        salvarTarefas();
        exibirTarefas(); // Atualizar a exibição
        inputNovaTarefa.value = '';
    }
}

// ========== Função para Editar Tarefa ==========
function editarTarefa(botao) {
    const li = botao.parentNode;
    const idTarefa = parseInt(li.dataset.id);
    const tarefa = tarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        const novoTexto = prompt('Editar tarefa:', tarefa.texto);
        if (novoTexto !== null) {
            tarefa.texto = novoTexto.trim();
            salvarTarefas();
            exibirTarefas(); // Atualizar a exibição
        }
    }
}

// ========== Função para Riscar/Desmarcar Tarefa ==========
function riscarTarefa(botao) {
    const li = botao.parentNode;
    const idTarefa = parseInt(li.dataset.id);
    const tarefa = tarefas.find(t => t.id === idTarefa);
    if (tarefa) {
        tarefa.concluida = !tarefa.concluida;
        salvarTarefas();
        exibirTarefas(); // Atualizar a exibição
    }
}

// ========== Função para Remover Tarefa ==========
function removerTarefa(botao) {
    const li = botao.parentNode;
    const idTarefa = parseInt(li.dataset.id);
    tarefas = tarefas.filter(t => t.id !== idTarefa);
    salvarTarefas();
    exibirTarefas(); // Atualizar a exibição
}

// ========== Função para Exibir as Tarefas (com Filtragem) ==========
function exibirTarefas(filtro = 'todas') {
    listaDeTarefas.innerHTML = ''; // Limpar a lista atual
    const tarefasFiltradas = tarefas.filter(tarefa => {
        if (filtro === 'pendentes') return !tarefa.concluida;
        if (filtro === 'concluidas') return tarefa.concluida;
        return true; // 'todas'
    });

    tarefasFiltradas.forEach(tarefa => {
        const novaLi = document.createElement('li');
        novaLi.dataset.id = tarefa.id; // Adicionar ID como atributo de dados
        novaLi.innerHTML = `
            <span>${tarefa.texto}</span>
            <button onclick="editarTarefa(this)">Editar</button>
            <button onclick="riscarTarefa(this)">${tarefa.concluida ? 'Desmarcar' : 'Riscar'}</button>
            <button onclick="removerTarefa(this)">Remover</button>
        `;
        if (tarefa.concluida) {
            novaLi.classList.add('concluida');
        }
        listaDeTarefas.appendChild(novaLi);

        // Adicionar evento de clique para editar a tarefa
        novaLi.querySelector('span').addEventListener('click', function() {
            const idTarefa = parseInt(this.parentNode.dataset.id);
            const tarefa = tarefas.find(t => t.id === idTarefa);
            if (tarefa) {
                const novoTexto = prompt('Editar tarefa:', tarefa.texto);
                if (novoTexto !== null) {
                    tarefa.texto = novoTexto.trim();
                    salvarTarefas();
                    exibirTarefas();
                }
            }
        });
    });

    // Atualizar o estado ativo dos botões de filtro
    document.querySelectorAll('.filter-button').forEach(button => {
        button.classList.remove('active');
        if (button.textContent.toLowerCase() === filtro) {
            button.classList.add('active');
        }
    });
}

// ========== Função para Filtrar as Tarefas ==========
function filtrarTarefas(filtro) {
    exibirTarefas(filtro);
}

// ========== Event Listener para Adicionar Tarefa com Enter ==========
inputNovaTarefa.addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        adicionarTarefa();
    }
});