'use strict';

const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
const choiceColor = document.getElementsByClassName("choiceColor")
const range = document.getElementById("Range")
const mode = document.getElementById("Mode")
const INITIAL_COLOR = "#2c2c2c"
const CANVAS_SIZE = 700;
const saveBtn = document.getElementById("Save")

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR"
ctx.lineWidth = 2.5;
ctx.fillStyle="white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

let painting = false;
let filling = false;

function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}

function onMouseMove(e){
    const x = e.offsetX
    const y = e.offsetY

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x,y);
    }else{
        ctx.lineTo(x,y);
        ctx.stroke()
    }
}

function onMouseDown(e){
    painting = true;
}

function changeColor(e){
    const color = e.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;

}

function handleRange(e){
    const size = e.target.value;
    ctx.lineWidth = size; 
}

function handleMode(e){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    }else{
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function hadleContextM(e){
    e.preventDefault();
}

function saveClick(e){
    const image = canvas.toDataURL("image/jpeg");
    const link = document.createElement("a")
    link.href = image;
    link.download = "PaintJS[❤]";
    link.click();
}

if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup",stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu", hadleContextM)
}


Array.from(choiceColor).forEach(color => color.addEventListener("click",changeColor))

if(range){
    range.addEventListener("input", handleRange)
}

if(mode){
    mode.addEventListener("click",handleMode)
}

if(saveBtn){
    saveBtn.addEventListener("click",saveClick)
}