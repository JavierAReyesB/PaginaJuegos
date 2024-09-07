// src/components/Footer.js

// Función para crear el elemento Footer
export default function Footer() {
  // Crear el contenedor del Footer
  const footer = document.createElement('footer')
  footer.className = 'footer'

  // Crear el contenido del Footer
  const footerText = document.createElement('p')
  footerText.textContent =
    '© 2024 Creado por Javier Reyes. Todos los derechos reservados.'

  // Agregar el contenido al Footer
  footer.appendChild(footerText)

  // Retornar el elemento Footer completo
  return footer
}
