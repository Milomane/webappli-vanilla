const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let frame = 0;
let variable = "Hello"

let img = new Image();
img.src = 'img/DVD_video_logo.png';

function rect_create(x, y, xSpeed, ySpeed, xSize, ySize, color, img) {
    let square = {
        x: x,
        y: y,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        xSize : xSize,
        ySize : ySize,
        color : color,
        img : img
    };
    return square
}

let rect = rect_create(200, 100, 2, 2, 20, 60, 'red', false)
let rect1 = rect_create(100, 200, 4, 2, 30, 40, 'blue', false)

let gameobjects = [
    rect,
    rect1
]

function gameLoop() {
    frame += 1

    canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    gameobjects.forEach(square => {
        moveSquares(square);
    });
}

function moveSquares(info) {
    if (info.x + info.xSize + info.xSpeed >= canvas.clientWidth) {
        console.log("x+")
        info.x = canvas.clientWidth - info.xSize;
        info.xSpeed = -2;
    }
    if (info.x + info.xSpeed <= 0) {
        console.log("x-")
        info.x = 0;
        info.xSpeed = 2;
    }

    if (info.y + info.ySize + info.ySpeed >= canvas.clientHeight) {
        console.log("y+")
        info.y = canvas.clientHeight - info.ySize;
        info.ySpeed = -2;
    }
    if (info.y + info.ySpeed <= 0) {
        console.log("y-")
        info.y = 0;
        info.ySpeed = 2;
    }

    info.x += info.xSpeed;
    info.y += info.ySpeed;

    if (!info.img) {
        ctx.fillStyle = info.color;
        ctx.fillRect(info.x, info.y, info.xSize, info.ySize)
    }
}



setInterval(gameLoop, 1000/60)