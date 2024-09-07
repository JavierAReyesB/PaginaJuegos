// src/router.js

import { renderApp } from './App.js'

// Función para manejar el enrutamiento
export function handleRoute() {
  // Renderizar la estructura completa de la aplicación desde renderApp
  renderApp()
}

// Inicializar el enrutador al cargar la página
export function initRouter() {
  window.addEventListener('hashchange', handleRoute) // Manejar cambios en la URL
  handleRoute() // Renderizar la ruta actual al cargar la página
}
