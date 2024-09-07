// src/components/NavBar.js

// Función para crear el elemento NavBar
export default function NavBar() {
  // Crear el contenedor del NavBar
  const nav = document.createElement('nav')
  nav.className = 'nav-bar'

  // Crear los enlaces de navegación
  const navLinks = [
    { href: '#/', text: 'Inicio' },
    { href: '#/tictactoe', text: 'Tres en Raya' },
    { href: '#/memorymatch', text: 'Memory Match' },
    { href: '#/simonsays', text: 'Simon Dice' },
    { href: '#/breakout', text: 'Breakout' }
  ]

  // Contenedor de los enlaces
  const navMenu = document.createElement('div')
  navMenu.className = 'nav-menu'

  navLinks.forEach((linkData) => {
    const link = document.createElement('a')
    link.href = linkData.href
    link.textContent = linkData.text
    link.className = 'nav-link'
    navMenu.appendChild(link)
  })

  // Crear el botón de hamburguesa para pantallas pequeñas
  const hamburger = document.createElement('div')
  hamburger.className = 'hamburger'
  hamburger.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `

  // Añadir evento de clic para alternar el menú
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active')
  })

  // Añadir los elementos al nav
  nav.appendChild(hamburger)
  nav.appendChild(navMenu)

  // Retornar el elemento NavBar completo
  return nav
}
