const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let frame = 0;
let variable = "Hello"

let img = new Image();
img.src = 'img/DVD_video_logo.png';

let debugText = new Text();
debugText = document.getElementById('debug');

let xAcc = 0;
let yAcc = 0;
let zAcc = 0;

let gravityScale = 1000;
let massPerSurface = 5;

let rectUseAcc = false;
let circleUseAcc = true;


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

function circle_create(x, y, fx, fy, xSpeed, ySpeed, radius, colorValue) {
    let circle = {
        x: x,
        y: y,
        fx: 0,
        fy: 0,
        xSpeed: xSpeed,
        ySpeed: ySpeed,
        radius : radius,
        colorValue : colorValue,
    };
    return circle
}

let rect = rect_create(200, 100, -2, 2, 100, 60, 'red', true)
let rect1 = rect_create(100, 200, 4, 2, 30, 40, 'blue', false)
let ci1 = circle_create(200, 200, 0, 0, 0, 0, 50, Math.floor(Math.random()*16777215))
let ci2 = circle_create(100, 200, 0, 0, 50, Math.floor(Math.random()*16777215))

let gameobjects = [
    rect,
    rect1
]

let circleobjects = [
    ci1,
    ci2
]

function randomColor() {
    let color = "#" + Math.floor(Math.random()*16777215).toString(16);
    return color;
}

function startup() {
    var el = document.getElementById("canvas1");

    //el.addEventListener("touchstart", handleStart, false);
    el.addEventListener("mouseup", handleEndClick, false);
    //el.addEventListener("touchcancel", handleCancel, false);
    //el.addEventListener("touchmove", handleMove, false);

    navigator.permissions.query({name:'accelerometer'}).then(function(result) {
        if (result.state == 'granted') {
            let acl = new Accelerometer({frequency: 60});

            acl.addEventListener('reading', () => {
            xAcc = acl.x;
            yAcc = acl.y;
            zAcc = acl.z;
            });

            acl.start();
        } else if (result.state == 'prompt') {

        }
        // Don't do anything if the permission was denied.
    });

    canvas.width = document.documentElement.clientWidth || document.body.clientWidth;
    canvas.height = document.documentElement.clientHeight - 60 || document.body.clientHeight - 60;

    ctx.fillStyle = 'Black'
    ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight)
}

document.addEventListener("DOMContentLoaded", startup);

function gameLoop() {

    frame += 1
    debugText.textContent = "Debug console : ";
    debugText.textContent += "xAcc : " + Math.round(xAcc) + "  yAcc : " + Math.round(yAcc) + "  zAcc : " + Math.round(zAcc) + "    V0.7";

    


    gameobjects.forEach(
    square => {
        moveSquares(square);
    });


    //moveCircleWithGravity(60/1000, circleobjects);

    //drawCircle(circleobjects[0])

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
    //let ySize = getRandomArbitrary(10, 200);

    //let xPos = evt.offsetX - xSize/2;
    //let yPos = evt.offsetY - ySize/2;
    let xPos = evt.offsetX;
    let yPos = evt.offsetY;

    let colorValue = Math.floor(Math.random()*16777215);

    //let newRect = cir(xPos, yPos, xSPeed, ySpeed, xSize, ySize, color, false)
    let newCircle = circle_create(xPos, yPos, /*xSPeed, ySpeed,*/0, 0, 0, 0, xSize / 2, colorValue)

    //gameobjects.push(newRect)
    circleobjects.push(newCircle)
}

function getRandomArbitrary(min, max) 
{
    return Math.random() * (max - min) + min;
}

function moveCircleWithGravity(dt, co) {

    console.log(dt);

    for (let c of co) {
        c.fx = 0;
        c.fy = 0;
    }
    for (let[i, c1] of co.entries()) {
        for (let[j, c2] of co.entries()) {
            if (i < j) {
                let dx = c2.x - c1.x;
                let dy = c2.y - c1.y;
                let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
                if (r < 1) {
                    r = 1;
                }

                let f = (gravityScale * findCircleMass(c1) * findCircleMass(c2)) / Math.pow(r, 2);
                let fx = f * dx / r;
                let fy = f * dy / r;

                c1.fx += fx;
                c1.fy += fy;
                c2.fx -= fx;
                c2.fy -= fy;
            }
        }
    }

    for (let c1 of co) {
        let ax = c1.fx / findCircleMass(c1);
        let ay = c1.fy / findCircleMass(c1);

        c1.xSpeed += ax * dt;
        c1.ySpeed += ay * dt;

        c1.x += c1.xSpeed * dt;
        c1.y += c1.ySpeed * dt;

        

        ctx.fillStyle = c1.color;
        ctx.beginPath();
        ctx.arc(c1.x, c1.y, c1.radius, 0, 2 * Math.PI);
        ctx.fill();
    }
}

function findCircleMass(circle) {
    return (Math.PI * Math.pow(circle.radius, 2) * massPerSurface)
}

function moveCircle(circle) {
    if (circleUseAcc) {
        circle.x += xAcc * -1;
        circle.y += yAcc;
    }

    if (circle.x + circle.radius + circle.xSpeed >= canvas.clientWidth) {
        circle.x = canvas.clientWidth - circle.radius;

        if (!circleUseAcc) {
            circle.xSpeed = -2;
        }
    }
    if (circle.x - circle.radius + circle.xSpeed <= 0) {
        circle.x = 0 + circle.radius;

        if (!circleUseAcc) {
            circle.xSpeed = 2;
        }
    }

    if (circle.y + circle.radius + circle.ySpeed >= canvas.clientHeight) {
        circle.y = canvas.clientHeight - circle.radius;

        if (!circleUseAcc) {
            circle.ySpeed = -2;
        }
    }
    if (circle.y - circle.radius + circle.ySpeed <= 0) {
        circle.y = 0 + circle.radius;

        if (!circleUseAcc) {
            circle.ySpeed = 2;
        }
    }

    if (!circleUseAcc) {
        circle.x += circle.xSpeed;
        circle.y += circle.ySpeed;
    }
    
    circle.colorValue += 16777215;

    ctx.fillStyle = "#" + circle.colorValue.toString(16);

    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fill();
}


function moveSquares(info) {
    if (rectUseAcc) {
        info.xSPeed = -xAcc;
        info.ySpeed = yAcc;
    }

    if (info.x + info.xSize + info.xSpeed >= canvas.clientWidth) {
        info.x = canvas.clientWidth - info.xSize;

        if (!rectUseAcc) {
            info.xSpeed = -2;
            info.color = randomColor();
        }
    }
    if (info.x + info.xSpeed <= 0) {
        info.x = 0;

        if (!rectUseAcc) {
            info.xSpeed = 2;
            info.color = randomColor();
        }
    }

    if (info.y + info.ySize + info.ySpeed >= canvas.clientHeight) {
        info.y = canvas.clientHeight - info.ySize;

        if (!rectUseAcc) {
            info.ySpeed = -2;
            info.color = randomColor();
        }
    }
    if (info.y + info.ySpeed <= 0) {
        info.y = 0;

        if (!rectUseAcc) {
            info.ySpeed = 2;
            info.color = randomColor();
        }
    }

    info.x += info.xSpeed;
    info.y += info.ySpeed;


    if (!info.img) {
        ctx.fillStyle = info.color;
        
        ctx.fillRect(info.x, info.y, info.xSize, info.ySize)
    }
    else 
    {
        /*
        // draw color
        ctx.fillStyle = info.color;
        ctx.fillRect(info.x, info.y, info.xSize, info.ySize);
  
        // set composite mode
        ctx.globalCompositeOperation = "destination-in";
  
        ctx.drawImage(img, info.x, info.y, info.xSize, info.ySize);

        ctx.globalCompositeOperation = "source-over";
        */
    }
}



setInterval(gameLoop, 1000/60)