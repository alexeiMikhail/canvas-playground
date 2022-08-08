var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");
var bubbleArray = [];
var buttons = {
    bubble: document.getElementById("bubble-btn"),
}

const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log("Canvas resized.");
}

resize();
window.addEventListener('resize', resize);

function fullscreen() {
    if (canvas.webkitRequestFullScreen) {
        canvas.webkitRequestFullScreen();
    }
    else {
        canvas.mozRequestFullScreen();
    }
}

buttons.bubble.addEventListener("click", () => {
    console.log("Clicked Bubble")
    bubbles(1);
})

addEventListener("mousedown", (e)=>{
    for (let i = 0; i < bubbleArray.length; i++) {
        var bubble = bubbleArray[i];
        var distance = Math.sqrt(
            Math.pow((e.clientX - bubble.x), 2) + 
            Math.pow((e.clientY - bubble.y), 2));
        if (distance < bubble.radius){
            bubbleArray.splice(i, 1)
        }
    };
    console.log("Clicked mouse.")
})

main();


///////////////////////////

function main() {
    animateBubbles();
}

function bubbles(n) {
    console.log("Main bubble function called.")
    initiateBubbles(n);
    console.log("End of main bubble function.")
}

function initiateBubbles(n) {
    var i = 0;

    while (i < n) {
        var radius = Math.random() * 100;
        var x = randBetween(radius * 1.2, canvas.width - radius * 1.2);
        var y = randBetween(radius * 1.2, canvas.height - radius * 1.2);
        var velocity = {
            x: (Math.random() - .5) * 8,
            y: (Math.random() - .5) * 8,
        }
        newBubble(x, y, radius, velocity);
        drawCircle(x, y, radius);
        console.log("Bubble initiated: " + bubbleArray[i]);
        i++;
    }
    console.log("Initiated " + n + " bubbles. Array size: " + bubbleArray.length)
}

function randBetween(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function newBubble(x, y, radius, velocity) {
    bubbleArray.push(
        { x, y, radius, velocity }
    )
    console.log("New bubble:")
    console.log(bubbleArray[bubbleArray.length - 1])
}

function drawCircle(x, y, radius) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
    //console.log("Drew a circle.");
}

function animateBubbles() {
    var go = setInterval(() => {
        clearCanvas();
        stepBubbles();
    }, 50);

    window.addEventListener('keydown', function (event) {
        if (event.key === "Escape") {
            clearInterval(go);
            console.log("Animation stopped.");
        }
    });
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //console.log("Canvas cleared.")
}

function stepBubbles() {
    for (let i = 0; i < bubbleArray.length; i++) {
        let currentBubble = bubbleArray[i];
        currentBubble.x += currentBubble.velocity.x;
        currentBubble.y += currentBubble.velocity.y;
        bounceCheck(currentBubble);
        drawCircle(currentBubble.x, currentBubble.y, currentBubble.radius);
    }
}

function bounceCheck(bubble) {
    if (bubble.x < 0 + bubble.radius || bubble.x > canvas.width - bubble.radius) {
        bubble.velocity.x *= -1;
        //console.log("Bounce x.")
    }
    if (bubble.y < 0 + bubble.radius || bubble.y > canvas.height - bubble.radius) {
        bubble.velocity.y *= -1;
        //console.log("Bounce y.")
    }
}
