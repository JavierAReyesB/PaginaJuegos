// main.js en la raíz

// Importar la función de renderizado principal desde App.js
import { renderApp } from './src/App.js'

// Importar la función de inicialización del enrutador desde router.js
import { initRouter } from './src/router.js'

// Función para inicializar la aplicación
function initializeApp() {
  renderApp() // Renderiza la estructura inicial de la aplicación, como Header y NavBar
  initRouter() // Inicializa el enrutador para manejar la navegación
}

// Ejecuta la función de inicialización al cargar la página
document.addEventListener('DOMContentLoaded', initializeApp)
