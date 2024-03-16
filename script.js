
function toggleContainer() {
    var popup= document.getElementById('Popup');
    popup.style.display = (popup.style.display === 'none' || popup.style.display === '') ? 'block' : 'none';
}
function rulesToggle() {
    var popup= document.getElementById('Popup');
    var rulesButton = document.getElementById('rulesButton');
    popup.style.display = (popup.style.display === 'none') ? 'block' : 'block';
    rulesButton.style.display = (popup.style.display === 'block') ? 'block' : 'none';
    // rulesButton.classList.toggle('hidden');
}

const computerScore = document.getElementById('computer-score');
const playerScore = document.getElementById('player-score');
const resultDiv = document.getElementById('result');
const playerDisplay = document.getElementById('player')
const computerDisplay = document.getElementById('computer')
const nextButton = document.querySelector('.next')

//storage
const storedData = JSON.parse(localStorage.getItem('data')) || { playerScore: 0, computerScore: 0 }
let totalScore = storedData;

function saveDataToLocalStorage() {
    localStorage.setItem('data', JSON.stringify(totalScore))
}
initializeScores();

function initializeScores() {
    playerScore.textContent = totalScore.playerScore;
    computerScore.textContent = totalScore.computerScore;
}

function playerChoice(playerSelection) {
    const computerSelection = getComputerChoice();
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';

    const score = updateScore(playerSelection, computerSelection);

    displayResult(playerSelection, computerSelection, score);

    document.querySelector('.sec1').classList.add('hidden');
    document.querySelector('#three').style.display = 'flex';

    const playerChoiceImg = document.getElementById('playerChoiceImg');
    const computerChoiceImg = document.getElementById('computerChoiceImg');

    playerChoiceImg.innerHTML = `
    <img src="${playerSelection}.svg" class="circle">
    <img src="${playerSelection}.png" class="image">
`;

    computerChoiceImg.innerHTML = `
    <img src="${computerSelection}.svg" class="circle">
    <img src="${computerSelection}.png" class="image">
`;
    saveDataToLocalStorage() 
}

function getComputerChoice() {
    const random = Math.floor(Math.random() * 3);
    const choices = ['rock', 'paper', 'scissors'];
    return choices[random];
}

function displayResult(player, computer, score) {
    let resultMessage;

    const pick1 = document.querySelector('.pick1');
    const pick2 = document.querySelector('.pick2');


    if (score === 0) {
        resultMessage = 'TIE UP';
        pick1.classList.remove('pulse');
        pick2.classList.remove('pulse');
        nextButton.classList.add('hidden')
    } else if (score === 1) {
        resultMessage = '<span class="main-result-text">YOU WIN</span> <br> <span class="comain-result-text">AGAINST PC</span>';
        pick1.classList.add('pulse');
        pick2.classList.remove('pulse');
        nextButton.classList.remove('hidden')
        ;
    } else {
        resultMessage = '<span class="main-result-text" style="font-weight: 600; font-size: 3rem; letter-spacing: 2px;">YOU LOST</span> <br>  <span style=" font-size: 1 rem; margin: 20px 0;">AGAINST PC</span>';
        pick2.classList.add('pulse');
        pick1.classList.remove('pulse');
        nextButton.classList.add('hidden')
    }

    playerScore.textContent = totalScore.playerScore;
    computerScore.textContent = totalScore.computerScore; 

    resultDiv.innerHTML = `<h1>${resultMessage}</h1>`;
}

function updateScore(player, computer) {
    if (player === computer) {
        return 0; 
    } else if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        totalScore['playerScore'] += 1;
        return 1;
    } else {
        totalScore['computerScore'] += 1;
        return -1;
    }
}

function playAgain() {
    resultDiv.innerHTML = '';
    playerDisplay.textContent = '';
    computerDisplay.textContent = '';


    const playerChoiceImg = document.getElementById('playerChoiceImg');
    const computerChoiceImg = document.getElementById('computerChoiceImg');

    playerChoiceImg.innerHTML = '';
    computerChoiceImg.innerHTML = '';

    document.querySelector('.sec1').classList.remove('hidden');
    document.querySelector('#three').style.display = 'none';

    saveDataToLocalStorage()
}


