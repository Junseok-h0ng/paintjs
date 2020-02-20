const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const color = document.getElementsByClassName("jsColor");

canvas.width = 700;
canvas.height = 700;

ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleMouseDown() {
    painting = true;
}

function stopEvent() {
    painting = false;
}

function changeColor(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
}

function handleRangeChange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
}

if (canvas) {
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", stopEvent);
    canvas.addEventListener("mouseleave", stopEvent);
}

Array.from(color).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", handleRangeChange);
}