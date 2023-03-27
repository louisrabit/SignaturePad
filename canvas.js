const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 400;
canvas.height = 250;

let isDrawing = false;
let lastX = 0;
let lastY = 0;


// click/press on the button
canvas.addEventListener('mousedown', (event) => {
    //defines variable as true 
  isDrawing = true;
  //store values inicial properties "store" of event in the variables latX/lastY
  [lastX, lastY] = [event.clientX, event.clientY];
});


//when user move mouse
//check first if isdrawing is true , if not function return , and dont do nothing 
canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) return;

  //if function is true , call beginPath of redering context of ctx
  ctx.beginPath();
  //first values stores in variables lastX, lastY
  ctx.moveTo(lastX, lastY);''

  // event property of js that have coordinaties X/y that occur the event related with elemenet that receive that event .
  //not supported with previous editions of browser so we use CLIENTX/CLIENTY
/*   ctx.lineTo(event.offsetX,  event.offsetY); */

//final mouse coordinate 
ctx.lineTo(event.clientX,  event.clientY);

// Bold line (change line ) == thickness
ctx.lineWidth = 3;
//draw the line 
  ctx.stroke();
  //update the values with final coordinates of the final point of the drawing 
  [lastX, lastY] = [event.clientX, event.clientY];
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});
/* ..........................................
------------------------------------------- */


// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
  mousePos = getTouchPos(canvas, e);
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousedown", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
var mouseEvent = new MouseEvent("mouseup", {});
canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
var touch = e.touches[0];
var mouseEvent = new MouseEvent("mousemove", {
clientX: touch.clientX,
clientY: touch.clientY
});
canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
var rect = canvasDom.getBoundingClientRect();
return {
x: touchEvent.touches[0].clientX - rect.left,
y: touchEvent.touches[0].clientY - rect.top
};
}

// Prevent scrolling when touching the canvas
/* document.body.addEventListener("touchstart", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchend", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false);
document.body.addEventListener("touchmove", function (e) {
  if (e.target == canvas) {
    e.preventDefault();
  }
}, false); */


//clear button
document.getElementById('clear').addEventListener('click', function() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  });





      //save png file 
      const download = document.getElementById('download');
      download.addEventListener('click', function (e) {
        const link = document.createElement('a');
        link.download = 'download.png';
        link.href = canvas.toDataURL();
        link.click();
        link.delete;
      });



     