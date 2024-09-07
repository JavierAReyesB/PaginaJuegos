// src/games/TicTacToe.js

import { launchConfetti } from '../utils/confetti.js' // Importar la función de confeti

export default function TicTacToe() {
  // Crear el contenedor principal del juego
  const gameContainer = document.createElement('div')
  gameContainer.className = 'tictactoe-container'

  // Estado del juego
  let board = Array(9).fill(null) // Tablero de 3x3
  let currentPlayer = 'X'
  let isGameActive = true

  // Elementos de puntuación
  const scoreBoard = document.createElement('div')
  scoreBoard.className = 'score-board'
  const scoreX = document.createElement('p')
  const scoreO = document.createElement('p')
  scoreBoard.appendChild(scoreX)
  scoreBoard.appendChild(scoreO)

  // Recuperar puntuaciones desde localStorage o inicializar si no existen
  const scores = JSON.parse(localStorage.getItem('tictactoeScores')) || {
    X: 0,
    O: 0
  }

  // Elemento para mensajes de estado
  const statusMessage = document.createElement('div')
  statusMessage.className = 'status-message'

  // Botón para restablecer el juego
  const resetButton = document.createElement('button')
  resetButton.className = 'reset-button'
  resetButton.textContent = 'Reiniciar Juego'
  resetButton.addEventListener('click', resetGame)

  // Función para actualizar la visualización de las puntuaciones
  function updateScores() {
    scoreX.textContent = `Jugador X: ${scores.X} victorias`
    scoreO.textContent = `Jugador O: ${scores.O} victorias`
  }

  // Crear el tablero de juego
  const boardElement = document.createElement('div')
  boardElement.className = 'tictactoe-board'

  // Función para manejar clics en las celdas
  function handleCellClick(index) {
    if (!isGameActive || board[index]) return // No permitir clics en celdas ocupadas o si el juego ha terminado

    board[index] = currentPlayer // Marcar la celda con el jugador actual
    renderBoard() // Volver a renderizar el tablero
    checkWinner() // Verificar si hay un ganador

    // Cambiar el turno
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    updateStatusMessage() // Actualizar mensaje de estado
  }

  // Función para renderizar el tablero
  function renderBoard() {
    boardElement.innerHTML = '' // Limpiar el tablero

    board.forEach((cell, index) => {
      const cellElement = document.createElement('div')
      cellElement.className = 'tictactoe-cell'
      cellElement.textContent = cell
      cellElement.addEventListener('click', () => handleCellClick(index))
      boardElement.appendChild(cellElement)
    })
  }

  // Función para verificar el ganador
  function checkWinner() {
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8], // Filas
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8], // Columnas
      [0, 4, 8],
      [2, 4, 6] // Diagonales
    ]

    for (const combination of winningCombinations) {
      const [a, b, c] = combination
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        statusMessage.textContent = `¡Jugador ${board[a]} ha ganado!`
        isGameActive = false
        saveScore(board[a]) // Guardar la puntuación
        updateScores() // Actualizar la visualización de las puntuaciones
        highlightWinningCells(combination) // Destacar las celdas ganadoras
        launchConfetti() // Llamar a la animación de confeti
        return
      }
    }

    // Verificar si hay un empate
    if (!board.includes(null)) {
      statusMessage.textContent = '¡Es un empate!'
      isGameActive = false
    }
  }

  // Función para guardar la puntuación en localStorage
  function saveScore(winner) {
    scores[winner] += 1
    localStorage.setItem('tictactoeScores', JSON.stringify(scores))
  }

  // Función para restablecer el juego
  function resetGame() {
    board = Array(9).fill(null)
    currentPlayer = 'X'
    isGameActive = true
    renderBoard()
    updateStatusMessage()
  }

  // Función para actualizar el mensaje de estado
  function updateStatusMessage() {
    if (isGameActive) {
      statusMessage.textContent = `Turno de ${currentPlayer}`
    }
  }

  // Función para destacar las celdas ganadoras
  function highlightWinningCells(indices) {
    indices.forEach((index) => {
      boardElement.children[index].classList.add('winning-cell')
    })
  }

  // Añadir el tablero, la puntuación, el mensaje de estado y el botón de reinicio al contenedor principal
  gameContainer.appendChild(scoreBoard)
  gameContainer.appendChild(statusMessage)
  gameContainer.appendChild(boardElement)
  gameContainer.appendChild(resetButton)

  // Renderizar el tablero y las puntuaciones por primera vez
  renderBoard()
  updateScores() // Asegurar que las puntuaciones se muestren desde el inicio
  updateStatusMessage()

  // Retornar el contenedor principal del juego
  return gameContainer
}
