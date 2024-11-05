const gameBoard = document.getElementById("gameBoard");
const cells = document.querySelectorAll(".cell");
const restartButton = document.getElementById("restartButton");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function checkResult() {
    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;

            if (board[a] === "X") {
                cells[a].classList.add("x-cell");
                cells[b].classList.add("x-cell");
                cells[c].classList.add("x-cell");
                highlightCells(a, b, c, "X");
                alert("Jogador X VENCEU, Jogador O é muito RUIM!");
            } else {
                cells[a].classList.add("o-cell");
                cells[b].classList.add("o-cell");
                cells[c].classList.add("o-cell");
                highlightCells(a, b, c, "O");
                alert("Jogador O VENCEU, jogador X é muito RUIM!");
            }

            return;
        }
    }

    if (!board.includes("")) {
        gameActive = false;
        alert("Deu VELHA, seis é muito RUIM!");
    }
}

function highlightCells(a, b, c, winner) {
    cells.forEach((cell, index) => {
        if (index !== a && index !== b && index !== c) {
            cell.classList.add("loser");
            cell.textContent = "";
        } else {
            cell.classList.remove("loser");
        }
    });
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameActive = true;
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("x-cell", "o-cell", "loser");
    });
}

function handleCellClick(e) {
    const index = e.target.getAttribute("data-index");

    if (board[index] !== "" || !gameActive) return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;

    if (currentPlayer === "X") {
        e.target.classList.add("x-cell");
    } else {
        e.target.classList.add("o-cell");
    }

    checkResult();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
}

cells.forEach(cell => cell.addEventListener("click", handleCellClick));
restartButton.addEventListener("click", restartGame);
