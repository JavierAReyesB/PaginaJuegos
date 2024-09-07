// src/games/MemoryMatch.js

import { launchConfetti } from '../utils/confetti.js' // Importar la función de confeti

export default function MemoryMatch() {
  // Crear el contenedor principal del juego
  const gameContainer = document.createElement('div')
  gameContainer.className = 'memory-match-container'

  // Estado del juego
  const cards = [
    '🍎',
    '🍎',
    '🍌',
    '🍌',
    '🍇',
    '🍇',
    '🍉',
    '🍉',
    '🍒',
    '🍒',
    '🍓',
    '🍓',
    '🥝',
    '🥝',
    '🍍',
    '🍍'
  ]
  let firstCard = null
  let secondCard = null
  let isBoardLocked = false
  let matchedPairs = 0

  // Elemento para la puntuación
  const scoreBoard = document.createElement('div')
  scoreBoard.className = 'score-board'
  const scoreText = document.createElement('p')
  scoreBoard.appendChild(scoreText)

  // Recuperar puntuación desde localStorage o inicializar si no existe
  const score = JSON.parse(localStorage.getItem('memoryMatchScore')) || 0

  // Función para actualizar la visualización de la puntuación
  function updateScore() {
    scoreText.textContent = `Puntuación: ${score}`
  }

  // Crear contenedor para la cuadrícula de cartas
  const gridContainer = document.createElement('div')
  gridContainer.className = 'memory-grid'

  // Función para manejar clics en las cartas
  function handleCardClick(cardElement) {
    if (
      isBoardLocked ||
      cardElement === firstCard ||
      cardElement.classList.contains('flipped')
    ) {
      return
    }

    cardElement.classList.add('flipped')
    if (!firstCard) {
      // Primer clic
      firstCard = cardElement
    } else {
      // Segundo clic
      secondCard = cardElement
      checkForMatch()
    }
  }

  // Función para verificar si las cartas coinciden
  function checkForMatch() {
    isBoardLocked = true
    const firstCardSymbol = firstCard.dataset.symbol
    const secondCardSymbol = secondCard.dataset.symbol

    if (firstCardSymbol === secondCardSymbol) {
      // Las cartas coinciden
      matchedPairs++
      resetCards(true)
      if (matchedPairs === cards.length / 2) {
        alert('¡Has encontrado todas las parejas!')
        saveScore() // Guardar la puntuación
        updateScore()
        launchConfetti() // Llamar a la función de confeti al completar el juego
      }
    } else {
      // Las cartas no coinciden
      setTimeout(() => resetCards(false), 1000)
    }
  }

  // Función para reiniciar las cartas seleccionadas
  function resetCards(match) {
    if (!match) {
      firstCard.classList.remove('flipped')
      secondCard.classList.remove('flipped')
    }
    firstCard = null
    secondCard = null
    isBoardLocked = false
  }

  // Función para guardar la puntuación en localStorage
  function saveScore() {
    const newScore = score + 1 // Incrementar la puntuación por completar el juego
    localStorage.setItem('memoryMatchScore', JSON.stringify(newScore))
  }

  // Función para inicializar el tablero del juego
  function initBoard() {
    // Barajar las cartas
    const shuffledCards = [...cards].sort(() => 0.5 - Math.random())

    // Crear las cartas en el DOM
    shuffledCards.forEach((symbol) => {
      const cardElement = document.createElement('div')
      cardElement.className = 'memory-card'
      cardElement.dataset.symbol = symbol

      // Cara de la carta oculta
      const cardFront = document.createElement('div')
      cardFront.className = 'card-front'
      cardFront.textContent = symbol

      // Cara de la carta visible
      const cardBack = document.createElement('div')
      cardBack.className = 'card-back'
      cardBack.textContent = '❓'

      cardElement.appendChild(cardFront)
      cardElement.appendChild(cardBack)
      cardElement.addEventListener('click', () => handleCardClick(cardElement))

      gridContainer.appendChild(cardElement)
    })
  }

  // Añadir el marcador de puntuación y la cuadrícula de cartas al contenedor principal
  gameContainer.appendChild(scoreBoard)
  gameContainer.appendChild(gridContainer)
  initBoard() // Inicializar el tablero
  updateScore() // Actualizar la puntuación inicial

  // Retornar el contenedor principal del juego
  return gameContainer
}
