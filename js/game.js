const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let x = 70;
let y = 10;
let squareHeight = 70;
let squareWidht = 50;

let xSpeed = -5;
let ySpeed = -2;

let frame = 0;
let variable = "Hello"

function gameLoop() {
    
    frame += 1

    if (x + squareWidht + xSpeed >= canvas.clientWidth) {
        console.log("x+")
        x = canvas.clientWidth - squareWidht;
        xSpeed = -2;
    }
    if (x + xSpeed <= 0) {
        console.log("x-")
        x = 0;
        xSpeed = 2;
    }

    if (y + squareHeight + ySpeed >= canvas.clientHeight) {
        console.log("y+")
        y = canvas.clientHeight - squareHeight;
        ySpeed = -2;
    }
    if (y + ySpeed <= 0) {
        console.log("y-")
        y = 0;
        ySpeed = 2;
    }

    x += xSpeed;
    y += ySpeed;

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    ctx.fillStyle = 'cyan'
    ctx.fillRect(x, y, squareWidht, squareHeight)
}

function moveSquares() {
    
}

setInterval(gameLoop, 1000/60)