const boardElement = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const startButton = document.getElementById('start');
const resetButton = document.getElementById('reset');
const messageDiv = document.getElementById('message');
const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');

let currentPlayer;
let player1Symbol;
let player2Symbol;
let gameState;
let gameActive;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function startGame() {
    player1Symbol = player1Input.value || 'X';
    player2Symbol = player2Input.value || 'O';
    currentPlayer = player1Symbol;
    gameState = Array(9).fill(null);
    gameActive = true;
    boardElement.style.display = 'grid';
    cells.forEach(cell => cell.innerText = '');
    messageDiv.innerText = '';
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== null || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    checkResult();
}

function checkResult() {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        messageDiv.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes(null);
    if (roundDraw) {
        messageDiv.innerText = 'Game Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === player1Symbol ? player2Symbol : player1Symbol;
}

function resetGame() {
    currentPlayer = player1Symbol;
    gameState = Array(9).fill(null);
    gameActive = true;
    cells.forEach(cell => cell.innerText = '');
    messageDiv.innerText = '';
    player1Input.value = 'X';
    player2Input.value = 'O';
    boardElement.style.display = 'none';
}
