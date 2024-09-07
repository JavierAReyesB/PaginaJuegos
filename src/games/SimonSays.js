// src/games/SimonSays.js

export default function SimonSays() {
  // Crear el contenedor principal del juego
  const gameContainer = document.createElement('div')
  gameContainer.className = 'simon-says-container'

  // Elementos de la interfaz
  const startButton = document.createElement('button')
  startButton.textContent = 'Iniciar Juego'
  startButton.className = 'start-button'

  const scoreBoard = document.createElement('div')
  scoreBoard.className = 'score-board'
  const scoreText = document.createElement('p')
  scoreText.textContent = 'Puntuación: 0'
  scoreBoard.appendChild(scoreText)

  const colors = ['red', 'blue', 'green', 'yellow']
  const sequence = []
  let playerSequence = []
  let level = 0

  // Recuperar la puntuación desde localStorage o inicializar si no existe
  let highScore = JSON.parse(localStorage.getItem('simonSaysScore')) || 0

  // Función para actualizar la visualización de la puntuación
  function updateScore() {
    scoreText.textContent = `Puntuación: ${level}`
  }

  // Función para guardar la puntuación más alta en localStorage
  function saveHighScore() {
    if (level > highScore) {
      highScore = level
      localStorage.setItem('simonSaysScore', JSON.stringify(highScore))
    }
  }

  // Función para iniciar el juego
  function startGame() {
    level = 0
    sequence.length = 0
    playerSequence.length = 0
    nextRound()
  }

  // Función para manejar la lógica de cada ronda
  function nextRound() {
    level++
    playerSequence = []
    updateScore()
    const nextColor = colors[Math.floor(Math.random() * colors.length)]
    sequence.push(nextColor)
    playSequence()
  }

  // Función para mostrar la secuencia al jugador
  function playSequence() {
    let delay = 0
    sequence.forEach((color, index) => {
      setTimeout(() => activateColor(color), delay)
      delay += 1000
    })
  }

  // Función para activar y mostrar un color
  function activateColor(color) {
    const colorElement = document.querySelector(`.${color}`)
    colorElement.classList.add('active')
    setTimeout(() => colorElement.classList.remove('active'), 500)
  }

  // Función para manejar los clics del jugador
  function handleColorClick(color) {
    playerSequence.push(color)
    const currentIndex = playerSequence.length - 1

    if (playerSequence[currentIndex] !== sequence[currentIndex]) {
      alert('¡Juego terminado! Has fallado la secuencia.')
      saveHighScore()
      return
    }

    if (playerSequence.length === sequence.length) {
      setTimeout(nextRound, 1000)
    }
  }

  // Crear los botones de colores
  const colorButtonsContainer = document.createElement('div')
  colorButtonsContainer.className = 'color-buttons-container'

  colors.forEach((color) => {
    const colorButton = document.createElement('div')
    colorButton.className = `color-button ${color}`
    colorButton.addEventListener('click', () => handleColorClick(color))
    colorButtonsContainer.appendChild(colorButton)
  })

  // Añadir los elementos al contenedor principal
  gameContainer.appendChild(scoreBoard)
  gameContainer.appendChild(startButton)
  gameContainer.appendChild(colorButtonsContainer)

  // Agregar evento de inicio al botón
  startButton.addEventListener('click', startGame)

  // Retornar el contenedor principal del juego
  return gameContainer
}
