// src/components/GameCard.js

// Función para crear el elemento GameCard
export default function GameCard({ title, description, link }) {
  // Crear el contenedor de la tarjeta de juego
  const card = document.createElement('div')
  card.className = 'game-card'

  // Crear el título de la tarjeta
  const cardTitle = document.createElement('h2')
  cardTitle.className = 'game-card-title'
  cardTitle.textContent = title

  // Crear la descripción de la tarjeta
  const cardDescription = document.createElement('p')
  cardDescription.className = 'game-card-description'
  cardDescription.textContent = description

  // Crear el botón de acción
  const cardButton = document.createElement('a')
  cardButton.className = 'game-card-button'
  cardButton.href = link
  cardButton.textContent = 'Jugar'

  // Agregar los elementos a la tarjeta
  card.appendChild(cardTitle)
  card.appendChild(cardDescription)
  card.appendChild(cardButton)

  // Retornar el elemento completo de la tarjeta
  return card
}
