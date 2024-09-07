// src/utils/confetti.js

import confetti from 'canvas-confetti'

export function launchConfetti() {
  // Configuración avanzada del confeti
  const duration = 7 * 1000 // Aumenta la duración a 7 segundos
  const animationEnd = Date.now() + duration
  const defaults = {
    startVelocity: 50, // Aumenta la velocidad inicial de las partículas
    spread: 360,
    ticks: 60,
    zIndex: 2000
  }

  // Función para generar un rango aleatorio
  function randomInRange(min, max) {
    return Math.random() * (max - min) + min
  }

  // Intervalo para lanzar confeti repetidamente durante la duración especificada
  const interval = setInterval(function () {
    const timeLeft = animationEnd - Date.now()

    if (timeLeft <= 0) {
      return clearInterval(interval)
    }

    // Configuración de disparos de confeti desde múltiples direcciones
    const particleCount = 100 // Incrementa significativamente la cantidad de partículas
    confetti({
      particleCount,
      angle: randomInRange(55, 125), // Disparar confeti en ángulos variados
      spread: randomInRange(60, 120), // Aumenta la dispersión
      origin: {
        x: Math.random(), // Generar confeti desde cualquier punto horizontal
        y: Math.random() - 0.2 // Desde la parte superior, ligeramente ajustado
      },
      colors: ['#ff4d4d', '#4d79ff', '#47d147', '#ffd633', '#ffffff'], // Colores vivos y contrastantes
      shapes: ['square', 'circle'], // Variación de formas
      gravity: randomInRange(0.4, 0.6), // Ajusta la gravedad para un efecto más flotante
      scalar: randomInRange(0.75, 1.25) // Escala de las partículas para tamaños variados
    })
  }, 200) // Intervalo más corto para aumentar la frecuencia del confeti
}
