const canvas = document.querySelector("canvas");
toolBtns = document.querySelectorAll(".tool");
fillColor = document.querySelectorAll("#fill-color");
ctx = canvas.getContext("2d");

let prevMouseX, prevMouseY, snapshot, isDrawing = false,
selectedTool = 'brush',
brushWidth=5;

window.addEventListener("load", ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height= canvas.offsetHeight
});

const drawRect = (e) =>{
    if(!fillColor.checked){

        return ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX -e.pffsetX, );
    }
    ctx.strokeRect(e.offsetX, e.offsetY, prevMouseX -e.pffsetX, );
}

const startDraw =()=>{
    isDrawing = true;
    prevMouseX = e.offsetX;
    prevMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth ;
    snapshot = ctx.getImageData(0,0, canvas.width, canvas.height);
}

const drawing = (e)=>{
    if(!isDrawing) return;
    ctx.putImageData(snapshot, 0 ,0);
    //creating line according to the mouse pointer
    if(!selectedTool === "brush"){
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === 'rectangle'){
        drawRect(e);
    }
    ctx.stroke();//drawing/filing line with color
}

toolBtns.forEach(btn =>{
    btn.addEventListener("click", ()=>{
        console.log(btn.id);
        document.querySelector(".option .active").classList.remove("active");
        btn.classList.add("active");
        selectedTool = btn.id;
    });
});
    

canvas.addEventListener("mousedown",startDraw);

canvas.addEventListener("mousemove", drawing);
canvas.addEventListener("mouseup",()=>{
    isDrawing = false
});
