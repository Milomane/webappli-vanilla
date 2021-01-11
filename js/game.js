const canvas = document.getElementById('canvas');
const ctx = canvas.getConte

let x = 10;

let frame = 0;
let variable = "Hello"

function gameLoop() {
    console.log("frame")
    frame += 1

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.wid, 300)

    ctx.fillStyle = 'cyan';
    ctx.fillRect(10, 10, 100, 100)

    x += 2
}

setInterval(gameLoop, 1000/60)