// GAME

let playerScore = 0
let computerScore = 0
let roundWinner = ''

function playRound(playerSelection, computerSelection) {
  if (playerSelection === computerSelection) {
    roundWinner = 'tie'
  }
  if (
    (playerSelection === 'ROCA' && computerSelection === 'TIJERAS') ||
    (playerSelection === 'TIJERAS' && computerSelection === 'PAPEL') ||
    (playerSelection === 'PAPEL' && computerSelection === 'ROCA')
  ) {
    playerScore++
    roundWinner = 'player'
  }
  if (
    (computerSelection === 'ROCA' && playerSelection === 'TIJERAS') ||
    (computerSelection === 'TIJERAS' && playerSelection === 'PAPEL') ||
    (computerSelection === 'PAPEL' && playerSelection === 'ROCA')
  ) {
    computerScore++
    roundWinner = 'computer'
  }
  updateScoreMessage(roundWinner, playerSelection, computerSelection)
}

function getRandomChoice() {
  let randomNumber = Math.floor(Math.random() * 3)
  switch (randomNumber) {
    case 0:
      return 'ROCA'
    case 1:
      return 'PAPEL'
    case 2:
      return 'TIJERAS'
  }
}

function isGameOver() {
  return playerScore === 5 || computerScore === 5
}

// UI

const scoreInfo = document.getElementById('scoreInfo')
const scoreMessage = document.getElementById('scoreMessage')
const playerScorePara = document.getElementById('playerScore')
const computerScorePara = document.getElementById('computerScore')
const playerSign = document.getElementById('playerSign')
const computerSign = document.getElementById('computerSign')
const rockBtn = document.getElementById('rockBtn')
const paperBtn = document.getElementById('paperBtn')
const scissorsBtn = document.getElementById('scissorsBtn')
const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')

rockBtn.addEventListener('click', () => handleClick('ROCA'))
paperBtn.addEventListener('click', () => handleClick('PAPEL'))
scissorsBtn.addEventListener('click', () => handleClick('TIJERAS'))
restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

function handleClick(playerSelection) {
  if (isGameOver()) {
    openEndgameModal()
    return
  }

  const computerSelection = getRandomChoice()
  playRound(playerSelection, computerSelection)
  updateChoices(playerSelection, computerSelection)
  updateScore()

  if (isGameOver()) {
    openEndgameModal()
    setFinalMessage()
  }
}

function updateChoices(playerSelection, computerSelection) {
  switch (playerSelection) {
    case 'ROCA':
      playerSign.textContent = '✊'
      break
    case 'PAPEL':
      playerSign.textContent = '✋'
      break
    case 'TIJERAS':
      playerSign.textContent = '✌'
      break
  }

  switch (computerSelection) {
    case 'ROCA':
      computerSign.textContent = '✊'
      break
    case 'PAPEL':
      computerSign.textContent = '✋'
      break
    case 'TIJERAS':
      computerSign.textContent = '✌'
      break
  }
}

function updateScore() {
  if (roundWinner === 'tie') {
    scoreInfo.textContent = "¡Es un empate!"
  } else if (roundWinner === 'player') {
    scoreInfo.textContent = '¡Tu ganas!'
  } else if (roundWinner === 'computer') {
    scoreInfo.textContent = '¡Tu Pierdes!'
  }

  playerScorePara.textContent = `Jugador: ${playerScore}`
  computerScorePara.textContent = `Computadora: ${computerScore}`
}

function updateScoreMessage(winner, playerSelection, computerSelection) {
  if (winner === 'player') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} vence a ${computerSelection.toLowerCase()}`
    return
  }
  if (winner === 'computer') {
    scoreMessage.textContent = `${capitalizeFirstLetter(
      playerSelection
    )} vence a  ${computerSelection.toLowerCase()}`
    return
  }

  scoreMessage.textContent = `${capitalizeFirstLetter(
    playerSelection
  )} empata con ${computerSelection.toLowerCase()}`
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function openEndgameModal() {
  endgameModal.classList.add('active')
  overlay.classList.add('active')
}

function closeEndgameModal() {
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}

function setFinalMessage() {
  return playerScore > computerScore
    ? (endgameMsg.textContent = 'Tu ganas!')
    : (endgameMsg.textContent = 'Tu pierdes...')
}

function restartGame() {
  playerScore = 0
  computerScore = 0
  scoreInfo.textContent = 'Elige tu mano'
  scoreMessage.textContent = 'El primero en lograr 5 puntos gana.'
  playerScorePara.textContent = 'Jugador: 0'
  computerScorePara.textContent = 'Computadora: 0'
  playerSign.textContent = '❔'
  computerSign.textContent = '❔'
  endgameModal.classList.remove('active')
  overlay.classList.remove('active')
}
