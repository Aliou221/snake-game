var blockCarre = 25;
var rows = 20;
var cols = 20;
var board;
var context;

// snake head
var snakeX = 5 * blockCarre;
var snakeY = 5 * blockCarre;

// snake food
var foodX;
var foodY;

// corps du serpent
var snakeBody = [];

// directions
var suivantY = 0;
var suivantX = 0;

// mes Arrows
var arrow_up;
var arrow_down;
var arrow_left;
var arrow_right;

//mes scores
var score_actuel;
var meilleur_score;
var score = 0;
var bestScore = 0;
var gameOver = false;

//niveau de jeux
var opt;
var gameInterval;


window.onload = function() {
    score_actuel = document.querySelector(".score-actuelle");
    meilleur_score = document.querySelector(".score-finale");
    score_actuel.textContent = score;
    meilleur_score.textContent = bestScore;

    arrow_up = document.querySelector(".up");
    arrow_down = document.querySelector(".down");
    arrow_left = document.querySelector(".left");
    arrow_right = document.querySelector(".right");

    opt = document.querySelector(".form-select");


    board = document.getElementById("table");
    board.width = blockCarre * cols;
    board.height = blockCarre * rows;

    context = board.getContext("2d");

    placementDeFood();

    document.addEventListener("keyup", function(event) {
        changeDirection(event);
    });

    arrow_up.addEventListener("click", function() {
        changeDirection({ key: "ArrowUp" });
    });
    arrow_down.addEventListener('click', function() {
        changeDirection({ key: "ArrowDown" });
    });
    arrow_left.addEventListener('click', function() {
        changeDirection({ key: "ArrowLeft" });
    });
    arrow_right.addEventListener('click', function() {
        changeDirection({ key: "ArrowRight" });
    });

    opt.addEventListener('change', function(){
        setIntervalGame();
    });

    setIntervalGame();
    
    
};


function update() {

    if (gameOver) {
        return;
    }

    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "red";
    context.fillRect(foodX, foodY, blockCarre, blockCarre);

    if (snakeX == foodX && snakeY == foodY) {
        snakeBody.push([foodX, foodY]);
        score += 1;
        score_actuel.textContent = score;
        placementDeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }

    if (snakeBody.length) {
        snakeBody[0] = [snakeX, snakeY];
    }

    context.fillStyle = "yellow";
    snakeX += suivantX * blockCarre;
    snakeY += suivantY * blockCarre;
    context.fillRect(snakeX, snakeY, blockCarre, blockCarre);

    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockCarre, blockCarre);
    }

    if (snakeX < 0 || snakeX >= cols * blockCarre || snakeY < 0 || snakeY >= rows * blockCarre) {
        endGame();
    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
            endGame();
        }
    }
}

function changeDirection(event) {
    let direction = event.key;

    if (direction === "ArrowUp" && suivantY === 0) {
        suivantX = 0;
        suivantY = -1;
    } else if (direction === "ArrowDown" && suivantY === 0) {
        suivantX = 0;
        suivantY = 1;
    } else if (direction === "ArrowLeft" && suivantX === 0) {
        suivantX = -1;
        suivantY = 0;
    } else if (direction === "ArrowRight" && suivantX === 0) {
        suivantX = 1;
        suivantY = 0;
    }
}

function placementDeFood() {
    foodX = Math.floor(Math.random() * cols) * blockCarre;
    foodY = Math.floor(Math.random() * rows) * blockCarre;
}

function endGame() {
    gameOver = true;
    if (score > bestScore) {
        bestScore = score;
        meilleur_score.textContent = bestScore;
    }
    alert("Game Over !!!");
    // Réinitialiser le jeu
    resetGame();
}

function resetGame() {
    snakeX = 5 * blockCarre;
    snakeY = 5 * blockCarre;
    snakeBody = [];
    suivantX = 0;
    suivantY = 0;
    score = 0;
    score_actuel.textContent = score;
    gameOver = false;
    placementDeFood();
}

function setIntervalGame(){
    let interval;
    switch(opt.value){
        case "1": interval = 1000;
            break;
        case "2": interval = 200;
            break;
        case "3": interval = 100;
            break;
        default : interval = 200;
    }

    if(typeof gameInterval !== 'undefined'){
        clearInterval(gameInterval);
    }

    gameInterval = setInterval(update , interval);
}