const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

ctx.fillStyle = 'cyan';
ctx.fillRect(10, 10, 100, 100)

let frame = 0;
let variable = "Hello"


function gameLoop() {
    console.log("frame")
    frame += 1
}

setInterval(gameLoop, 1000/60)