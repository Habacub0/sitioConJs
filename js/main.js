
// ============================================================
// JUEGO: ADIVINA EL NUMERO
// Participante: Aaron Salguero
// Fecha: 2023-10-01
// Instructor: Ing. Guilmar Urizar - Intecap CQH
// ============================================================

'use strict';

// ============================================================
// CONFIGURACION
// ============================================================
const DIFICULTADES = {
  facil: { min: 1, max: 50, intentos: 10 },
  normal: { min: 1, max: 100, intentos: 7 },
  dificil: { min: 1, max: 200, intentos: 5 }
};

// ============================================================
// ESTADO DEL JUEGO
// ============================================================
let numeroSecreto = 0;
let intentosRestantes = 0;
let intentosUsados = [];
let juegoTerminado = false;
let dificultadActual = 'normal';

// MARCADOR
let victorias = 0;
let derrotas = 0;
let racha = 0;
let rachaMax = 0;

// ============================================================
// FUNCIONES
// ============================================================

const generarNumero = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function iniciarJuego(dificultad = 'normal') {

  const config = DIFICULTADES[dificultad];

  dificultadActual = dificultad;
  numeroSecreto = generarNumero(config.min, config.max);
  intentosRestantes = config.intentos;
  intentosUsados = [];
  juegoTerminado = false;

  document.getElementById('rangoJuego').textContent =
    `${config.min} - ${config.max}`;

  document.getElementById('intentosRestantes').textContent =
    intentosRestantes;

  document.getElementById('historialIntentos').innerHTML = '';

  document.getElementById('mensajePista').textContent =
    '¡Comienza a jugar!';

  document.getElementById('resultadoJuego').textContent = '';

  document.getElementById('inputIntento').value = '';

  document.getElementById('inputIntento').disabled = false;

  document.getElementById('inputIntento').focus();

  console.log('[DEBUG] Numero secreto:', numeroSecreto);
}

function evaluarIntento(intento) {

  const diferencia = Math.abs(intento - numeroSecreto);

  if (intento === numeroSecreto) {
    return {
      pista: '¡CORRECTO! Era el ' + numeroSecreto,
      tipo: 'correcto',
      correcto: true
    };
  }

  let pista;
  let tipo;

  const { max } = DIFICULTADES[dificultadActual];

  if (intento > numeroSecreto) {

    if (diferencia > max * 0.3) {
      pista = 'Demasiado alto';
      tipo = 'muy-alto';
    }
    else if (diferencia > max * 0.1) {
      pista = 'Un poco alto';
      tipo = 'poco-alto';
    }
    else if (diferencia <= 3) {
      pista = 'Estás muy cerca (alto)';
      tipo = 'cerca';
    }
    else {
      pista = 'Alto';
      tipo = 'alto';
    }

  } else {

    if (diferencia > max * 0.3) {
      pista = 'Demasiado bajo';
      tipo = 'muy-bajo';
    }
    else if (diferencia > max * 0.1) {
      pista = 'Un poco bajo';
      tipo = 'poco-bajo';
    }
    else if (diferencia <= 3) {
      pista = 'Estás muy cerca (bajo)';
      tipo = 'cerca';
    }
    else {
      pista = 'Bajo';
      tipo = 'bajo';
    }
  }

  return {
    pista,
    tipo,
    correcto: false
  };
}

function procesarIntento() {

  if (juegoTerminado) return;

  const inputIntento = document.getElementById('inputIntento');

  const valor = parseInt(inputIntento.value);

  const config = DIFICULTADES[dificultadActual];

  // Validación
  if (
    isNaN(valor) ||
    valor < config.min ||
    valor > config.max
  ) {

    document.getElementById('mensajePista').textContent =
      `Ingresa un número entre ${config.min} y ${config.max}`;

    return;
  }

  // Número repetido
  if (intentosUsados.includes(valor)) {

    document.getElementById('mensajePista').textContent =
      'Ya intentaste ese número';

    return;
  }

  const evaluacion = evaluarIntento(valor);

  intentosUsados.push(valor);

  intentosRestantes--;

  document.getElementById('mensajePista').textContent =
    evaluacion.pista;

  document.getElementById('intentosRestantes').textContent =
    intentosRestantes;

  // Historial
  const historial = document.getElementById('historialIntentos');

  const fila = document.createElement('div');

  fila.classList.add('fila-historial');

  let icono = '➡️';

  if (evaluacion.correcto) {
    icono = '🎯';
  } else if (evaluacion.tipo === 'cerca') {
    icono = '🔥';
  }

  fila.innerHTML = `
    <span>${valor}</span>
    <span>${evaluacion.pista}</span>
    <span>${icono}</span>
  `;

  historial.prepend(fila);

  // Victoria
  if (evaluacion.correcto) {

    juegoTerminado = true;

    document.getElementById('resultadoJuego').textContent =
      '🎉 ¡Has ganado la partida!';

    document.getElementById('inputIntento').disabled = true;

    actualizarMarcador('victoria');
  }

  // Derrota
  else if (intentosRestantes === 0) {

    juegoTerminado = true;

    document.getElementById('resultadoJuego').textContent =
      `💀 Has perdido. El número era ${numeroSecreto}`;

    document.getElementById('inputIntento').disabled = true;

    actualizarMarcador('derrota');
  }

  inputIntento.value = '';
  inputIntento.focus();
}

function actualizarMarcador(resultado) {

  if (resultado === 'victoria') {

    victorias++;

    racha++;

    if (racha > rachaMax) {
      rachaMax = racha;
    }

  } else {

    derrotas++;

    racha = 0;
  }

  document.getElementById('victorias').textContent =
    victorias;

  document.getElementById('derrotas').textContent =
    derrotas;

  document.getElementById('racha').textContent =
    racha;

  document.getElementById('rachaMax').textContent =
    rachaMax;
}

// ============================================================
// EVENTOS
// ============================================================

document
  .getElementById('formIntento')
  .addEventListener('submit', function (e) {

    e.preventDefault();

    procesarIntento();
  });

document
  .querySelectorAll('.btn-dificultad')
  .forEach(btn => {

    btn.addEventListener('click', function () {

      document
        .querySelectorAll('.btn-dificultad')
        .forEach(b => b.classList.remove('activa'));

      this.classList.add('activa');

      iniciarJuego(this.dataset.nivel);
    });
  });

document
  .getElementById('btnNuevoJuego')
  .addEventListener('click', () => {

    iniciarJuego(dificultadActual);
  });

// ============================================================
// INICIO
// ============================================================

iniciarJuego('normal');

console.log('Juego Adivina el Numero cargado.');
