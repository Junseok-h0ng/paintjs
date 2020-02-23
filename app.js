const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const color = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const stick = document.getElementById("jsStick");


canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 2.5;

let painting = false;
let fill = false;
let stickLine = false;
let lineTo = false;

function handleMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting && !stickLine) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else if (painting && !stickLine) {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleMouseClick(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!lineTo) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        lineTo = true;
    } else {
        ctx.lineTo(x, y);
        ctx.stroke();
        lineTo = false;
    }

}

function DrawingStick(event) {

}

function handleMouseDown() {
    painting = true;
}

function stopEvent(event) {
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

function handleModeClick(event) {
    if (fill) {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    } else if (stickLine) {
        handleMouseClick(event);
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

function handleStick() {
    if (!stickLine) {
        stickLine = true;
        stick.innerText = "Stroke";
    } else {
        stickLine = false;
        stick.innerText = "Stick";
    }
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

if (stick) {
    stick.addEventListener("click", handleStick);
}