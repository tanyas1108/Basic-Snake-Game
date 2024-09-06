
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');

let cellSize = 50;
let boardHeight = 695;
let boardWidth = 1500;
let snakeCells = [[0, 0]];
let direction = 'right';

let gameOver = false;
let score = 0;

let foodCells = generateFood();

let intervalId = setInterval(function(){
    update();
    draw();
}, 200);

document.addEventListener('keydown', function(e){
    if(e.key === 'ArrowDown'){
        direction = 'down';
    }
    else if(e.key === 'ArrowUp'){
        direction = 'up';
    }
    else if(e.key === 'ArrowLeft'){
        direction = 'left';
    }
    else if(e.key === 'ArrowRight'){
        direction = 'right';
    }
})

function draw(){
    if(gameOver === true){
        clearInterval(intervalId);
        ctx.fillStyle = 'red';
        ctx.font = '50px monospace';
        ctx.fillText('GAME OVER !!', 580 , 333);
        return;
    }

    //draw snake
    ctx.clearRect(0, 0, boardWidth, boardHeight);
    for(let cell of snakeCells){
        ctx.fillStyle = 'yellow';
        ctx.fillRect(cell[0], cell[1], cellSize, cellSize);
        ctx.strokeRect(cell[0], cell[1], cellSize, cellSize);
    }

    //draw food
    ctx.fillStyle = 'green';
    ctx.fillRect(foodCells[0], foodCells[1], 30, 30);

    //draw score
    ctx.font = '30px monospace';
    ctx.fillText(`Score: ${score}`, 20, 30);
}

function update(){
    let headX = snakeCells[snakeCells.length - 1][0];
    let headY = snakeCells[snakeCells.length - 1][1];

    let newHeadX;
    let newHeadY;

    if(direction === 'right'){
        newHeadX = headX + cellSize;
        newHeadY = headY;
        if(newHeadX === boardWidth || khelKhatam(newHeadX, newHeadY)){
            gameOver = true;
        }
    }
    else if(direction === 'left'){
        newHeadX = headX - cellSize;
        newHeadY = headY;
        if(newHeadX < 0 || khelKhatam(newHeadX, newHeadY)){
            gameOver = true;
        }
    }
    else if(direction === 'up'){
        newHeadX = headX;
        newHeadY = headY - cellSize;
        if(newHeadY < 0 || khelKhatam(newHeadX, newHeadY)){
            gameOver = true;
        }
    }
    else{
        newHeadX = headX;
        newHeadY = headY + cellSize;
        if(newHeadY > boardHeight || khelKhatam(newHeadX, newHeadY)){
            gameOver = true;
        }
    }

    snakeCells.push([newHeadX, newHeadY]);

    if(newHeadX === foodCells[0] && newHeadY === foodCells[1]){
        score += 1;
        foodCells = generateFood();
    }
    else{
        snakeCells.shift();
    }
}

function generateFood(){
    return[
        Math.round((Math.random() * (boardWidth - cellSize)) / cellSize) * cellSize,
        Math.round((Math.random() * (boardHeight - cellSize)) / cellSize) * cellSize
    ]
}

function khelKhatam(newHeadX, newHeadY){
    for(let item of snakeCells){
        if(item[0] === newHeadX && item[1] === newHeadY){
            return true;
        }
    }
    return false;
}