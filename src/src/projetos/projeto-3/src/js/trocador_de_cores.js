// u ========== Seleção de Elementos do DOM ========== u
const body = document.body;
const corAtualElemento = document.getElementById('corAtual');
const outrosFormatosElemento = document.getElementById('outrosFormatos');
const redSlider = document.getElementById('redSlider');
const greenSlider = document.getElementById('greenSlider');
const blueSlider = document.getElementById('blueSlider');
const redValueSpan = document.getElementById('redValue');
const greenValueSpan = document.getElementById('greenValue');
const blueValueSpan = document.getElementById('blueValue');

// u ========== Funções de Geração de Cores ========== u
function gerarCorHexAleatoria() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
}

function hexParaRgb(hex) {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgb(${r}, ${g}, ${b})`;
}

function hexParaHsl(hex) {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
        h = s = 0; // achromatic
    } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}

// u ========== Função para Mudar a Cor ========== u
function mudarCor() {
    const corHex = gerarCorHexAleatoria();
    atualizarCores(corHex);
}

function atualizarCores(hex) {
    body.style.backgroundColor = hex;
    corAtualElemento.textContent = hex;
    outrosFormatosElemento.innerHTML = `
        RGB: ${hexParaRgb(hex)}<br>
        HSL: ${hexParaHsl(hex)}
    `;
    const rgbValues = hexParaRgb(hex).slice(4, -1).split(',').map(Number);
    redSlider.value = rgbValues[0];
    greenSlider.value = rgbValues[1];
    blueSlider.value = rgbValues[2];
    redValueSpan.textContent = rgbValues[0];
    greenValueSpan.textContent = rgbValues[1];
    blueValueSpan.textContent = rgbValues[2];
}

// u ========== Função para Copiar a Cor ========== u
function copiarCor() {
    const textoParaCopiar = corAtualElemento.textContent;
    navigator.clipboard.writeText(textoParaCopiar)
        .then(() => {
            alert(`Cor copiada: ${textoParaCopiar}`);
        })
        .catch(err => {
            console.error('Erro ao copiar a cor: ', err);
            alert('Não foi possível copiar a cor.');
        });
}

// u ========== Função para Atualizar a Cor com Sliders ========== u
function atualizarCorComSliders() {
    const r = redSlider.value;
    const g = greenSlider.value;
    const b = blueSlider.value;
    const corRgb = `rgb(${r}, ${g}, ${b})`;
    const corHex = `#${parseInt(r).toString(16).padStart(2, '0')}${parseInt(g).toString(16).padStart(2, '0')}${parseInt(b).toString(16).padStart(2, '0')}`;
    body.style.backgroundColor = corRgb;
    corAtualElemento.textContent = corHex;
    outrosFormatosElemento.innerHTML = `
        RGB: ${corRgb}<br>
        HSL: ${hexParaHsl(corHex)}
    `;
    redValueSpan.textContent = r;
    greenValueSpan.textContent = g;
    blueValueSpan.textContent = b;
}

// u ========== Inicialização ========== u
mudarCor(); // Define uma cor inicial ao carregar a página