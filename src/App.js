// src/App.js

import Header from './components/Header.js'
import Footer from './components/Footer.js' // Importar el Footer
import GameCardContainer from './components/GameCardContainer.js' // Importar el nuevo contenedor
import TicTacToe from './games/TicTacToe.js'
import MemoryMatch from './games/MemoryMatch.js'
import SimonSays from './games/SimonSays.js'
import Breakout from './games/Breakout.js' // Importar Breakout
import './styles/Header.css'
import './styles/Footer.css'
import './styles/NavBar.css'
import './styles/GameCard.css'
import './styles/TicTacToe.css'
import './styles/MemoryMatch.css'
import './styles/SimonSays.css'
import './styles/Breakout.css' // Importar estilos para Breakout

// Función para renderizar la página principal con tarjetas de juego
export function renderLandingPage() {
  const content = document.createElement('div')
  content.className = 'landing-content'

  const games = [
    {
      title: 'Tres en Raya',
      description: 'Juega al clásico Tres en Raya.',
      link: '#/tictactoe'
    },
    {
      title: 'Memory Match',
      description: 'Empareja todas las cartas.',
      link: '#/memorymatch'
    },
    {
      title: 'Simon Dice',
      description: 'Sigue la secuencia de colores.',
      link: '#/simonsays'
    },
    {
      title: 'Breakout',
      description: 'Rompe los ladrillos con tu pelota.',
      link: '#/breakout' // Añadir el link para Breakout
    }
  ]

  // Usar el contenedor de tarjetas para renderizar las tarjetas de juego
  const gameCards = GameCardContainer(games)

  // Añadir el contenedor de tarjetas al contenido
  content.appendChild(gameCards)

  return content // Devuelve el contenido a renderizar
}

// Función para manejar la renderización basada en la ruta
export function renderApp() {
  const app = document.getElementById('app')
  app.innerHTML = '' // Limpiar contenido previo

  // Crear un contenedor para el layout principal
  const layout = document.createElement('div')
  layout.className = 'layout'

  // Agregar Header (con NavBar incluido) al layout
  layout.appendChild(Header())

  // Crear el contenedor para el contenido específico de cada ruta
  const appContent = document.createElement('div')
  appContent.className = 'app-content' // Contenedor principal para todo el contenido

  // Obtener la ruta actual desde la URL
  const { hash } = window.location

  // Rutas disponibles y sus funciones de renderizado
  switch (hash) {
    case '#/tictactoe':
      appContent.appendChild(TicTacToe())
      break
    case '#/memorymatch':
      appContent.appendChild(MemoryMatch())
      break
    case '#/simonsays':
      appContent.appendChild(SimonSays())
      break
    case '#/breakout': // Agregar caso para Breakout
      appContent.appendChild(Breakout()) // Renderizar Breakout
      break
    default:
      appContent.appendChild(renderLandingPage())
      break
  }

  // Agregar el contenido de la app al layout
  layout.appendChild(appContent)

  // Agregar el Footer al layout
  layout.appendChild(Footer()) // Esta línea agrega el Footer al layout

  // Añadir el layout completo al DOM
  app.appendChild(layout)
}
