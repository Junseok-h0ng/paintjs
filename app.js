const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const color = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;

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
    ctx.fillStyle = color;
}

function handleRangeChange(event) {
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeChange() {
    if (!fill) {
        fill = true;
        mode.innerText = "Paint";
    } else {
        fill = false;
        mode.innerText = "Fill";
    }
}

function handleModeClick() {
    if (fill) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}

function handleSaveClick() {
    const image = canvas.toDataURL();
    const link = document.createElement("a");

    link.href = image;
    link.download = "Paintjs";
    link.click();
}

function handleClickContextMenu(event) {
    event.preventDefault();
}

if (canvas) {
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mousedown", handleMouseDown);
    canvas.addEventListener("mouseup", stopEvent);
    canvas.addEventListener("mouseleave", stopEvent);
    canvas.addEventListener("click", handleModeClick);
    canvas.addEventListener("contextmenu", handleClickContextMenu);
}

Array.from(color).forEach(color => color.addEventListener("click", changeColor));

if (range) {
    range.addEventListener("input", handleRangeChange);
}

if (mode) {
    mode.addEventListener("click", handleModeChange);
}

if (save) {
    save.addEventListener("click", handleSaveClick);
}