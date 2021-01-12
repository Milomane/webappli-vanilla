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

function circle_create(x, y, xSpeed, ySpeed, radius, color) {
    let circle = {
        x: x,
        y: y,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        radius : radius,
        color : color
    };
    return circle
}

let rect = rect_create(200, 100, -2, 2, 100, 60, 'red', true)
let rect1 = rect_create(100, 200, 4, 2, 30, 40, 'blue', false)
let circle = circle_create(200, 200, 2, -2, 50, randomColor())

let gameobjects = [
    rect,
    rect1
]

let circleobjects = [
    circle
]

function randomColor() {
    let color = "#" + Math.floor(Math.random()*16777215).toString(16);
    return color;
}

function startup() {
    var el = document.getElementById("canvas1");

    //el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("touchend", handleEnd, false);
    el.addEventListener("mouseup", handleEndClick, false);
    //el.addEventListener("touchcancel", handleCancel, false);
    //el.addEventListener("touchmove", handleMove, false);

    let acl = new Accelerometer({frequency: 60});

    acl.addEventListener('reading', () => {
    console.log("Acceleration along the X-axis " + acl.x);
    console.log("Acceleration along the Y-axis " + acl.y);
    console.log("Acceleration along the Z-axis " + acl.z);
    });

acl.start();
}

document.addEventListener("DOMContentLoaded", startup);

function gameLoop() {
    frame += 1

    canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = document.documentElement.clientHeight || document.body.clientHeight;

    ctx.fillStyle = 'white'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    gameobjects.forEach(
    square => {
        moveSquares(square);
    });

    circleobjects.forEach(
    circle => {
        moveCircle(circle);
    });
}

function handleEnd(evt)
{
    var touches = evt.changedTouches

    let xSPeed = getRandomArbitrary(-2, 2);
    let ySpeed = getRandomArbitrary(-2, 2);

    let xSize = getRandomArbitrary(10, 200);
    let ySize = getRandomArbitrary(10, 200);

    let xPos = touches[0].pageX - xSize/2;
    let yPos = touches[0].pageY - ySize/2;

    let color = randomColor();

    let newRect = rect_create(xPos, yPos, xSPeed, ySpeed, xSize, ySize, color, false)
    gameobjects.push(newRect)
}
function handleEndClick(evt)
{
    let xSPeed = getRandomArbitrary(-2, 2);
    let ySpeed = getRandomArbitrary(-2, 2);

    let xSize = getRandomArbitrary(10, 200);
    let ySize = getRandomArbitrary(10, 200);

    let xPos = evt.offsetX - xSize/2;
    let yPos = evt.offsetY - ySize/2;

    let color = randomColor();

    let newRect = rect_create(xPos, yPos, xSPeed, ySpeed, xSize, ySize, color, false)
    gameobjects.push(newRect)
}

function getRandomArbitrary(min, max) 
{
    return Math.random() * (max - min) + min;
}

function moveCircle(circle) {
    if (circle.x + circle.radius + circle.xSpeed >= canvas.clientWidth) {
        circle.x = canvas.clientWidth - circle.radius;
        circle.xSpeed = -2;
    }
    if (circle.x - circle.radius + circle.xSpeed <= 0) {
        circle.x = 0 + circle.radius;
        circle.xSpeed = 2;
    }

    if (circle.y + circle.radius + circle.ySpeed >= canvas.clientHeight) {
        circle.y = canvas.clientHeight - circle.radius;
        circle.ySpeed = -2;
    }
    if (circle.y - circle.radius + circle.ySpeed <= 0) {
        circle.y = 0 + circle.radius;
        circle.ySpeed = 2;
    }

    circle.x += circle.xSpeed;
    circle.y += circle.ySpeed;
    
    ctx.fillStyle = circle.color;
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
}


function moveSquares(info) {
    if (info.x + info.xSize + info.xSpeed >= canvas.clientWidth) {
        info.x = canvas.clientWidth - info.xSize;
        info.xSpeed = -2;
        info.color = randomColor();
    }
    if (info.x + info.xSpeed <= 0) {
        info.x = 0;
        info.xSpeed = 2;
        info.color = randomColor();
    }

    if (info.y + info.ySize + info.ySpeed >= canvas.clientHeight) {
        info.y = canvas.clientHeight - info.ySize;
        info.ySpeed = -2;
        info.color = randomColor();
    }
    if (info.y + info.ySpeed <= 0) {
        info.y = 0;
        info.ySpeed = 2;
        info.color = randomColor();
    }

    info.x += info.xSpeed;
    info.y += info.ySpeed;


    if (!info.img) {
        ctx.fillStyle = info.color;
        ctx.fillRect(info.x, info.y, info.xSize, info.ySize)
    }
    else 
    {
        // draw color
        ctx.fillStyle = info.color;
        ctx.fillRect(info.x, info.y, info.xSize, info.ySize);
  
        // set composite mode
        ctx.globalCompositeOperation = "destination-in";
  
        ctx.drawImage(img, info.x, info.y, info.xSize, info.ySize);

        ctx.globalCompositeOperation = "source-over";
    }
}



setInterval(gameLoop, 1000/60)