// src/components/Header.js

// Importar estilos específicos para el Header
import '../styles/Header.css'
import NavBar from './NavBar.js' // Importar NavBar directamente

// Función para crear el elemento del Header
export default function Header() {
  // Crear el contenedor del Header
  const header = document.createElement('header')
  header.className = 'header'

  // Crear el logo de la página
  const logo = document.createElement('img')
  logo.src =
    'https://png.pngtree.com/png-clipart/20221003/original/pngtree-neon-game-console-icon-png-image_8654304.png' // Reemplaza 'URL_DEL_LOGO' con la ruta correcta o URL del logo
  logo.alt = 'Logo de Página de Juegos'
  logo.className = 'header-logo' // Clase CSS para el logo

  // Agregar solo el logo al Header
  header.appendChild(logo)

  // Agregar NavBar dentro del Header
  const navBar = NavBar()
  header.appendChild(navBar)

  // Retornar el elemento Header completo
  return header
}
