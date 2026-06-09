const DIFICULTADES = {
  facil:   { min: 1, max: 50,  intentos: 10 },
  normal:  { min: 1, max: 100, intentos: 7  },
  dificil: { min: 1, max: 200, intentos: 5  }
};

function iniciarJuego(dificultad = 'normal') {
  const config = DIFICULTADES[dificultad];
  dificultadActual  = dificultad;
  numeroSecreto     = generarNumero(config.min, config.max);
  intentosRestantes = config.intentos;
  intentosUsados    = [];
  juegoTerminado    = false;
  document.getElementById('nivel').textContent = config.dificultadActual;
}

// ============================================================
// JUEGO: ADIVINA EL NUMERO
// Participante: Aaron Salguero
// Fecha: 2023-10-01
// Instructor: Ing. Guilmar Urizar - Intecap CQH
// ============================================================

'use strict';



// ============================================================
// ESTADO DEL JUEGO
// ============================================================
let numeroSecreto     = 0;
let intentosRestantes = 0;
let intentosUsados    = [];
let juegoTerminado    = false;
let dificultadActual  = 'normal';

// MARCADOR (persiste entre partidas)
let victorias  = 0;
let derrotas   = 0;
let racha      = 0;
let rachaMax   = 0;

// ============================================================
// FUNCIONES
// ============================================================

/**
 * Genera un numero entero aleatorio entre min y max (inclusive).
 * @param {number} min - Valor minimo
 * @param {number} max - Valor maximo
 * @returns {number} Numero entero aleatorio
 */
const generarNumero = (min, max) => {
    
  // TODO: usa Math.floor(Math.random() * (max - min + 1)) + min
};