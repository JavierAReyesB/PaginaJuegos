// src/components/GameCardContainer.js

import GameCard from './GameCard.js'

export default function GameCardContainer(games) {
  const container = document.createElement('div')
  container.className = 'game-card-container'

  games.forEach((game) => {
    container.appendChild(GameCard(game))
  })

  return container
}
