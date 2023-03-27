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



canvas.addEventListener('touchstart', (event) => {
isDrawing = true;
[lastX, lastY] = [event.clientX, event.clientY];
});
canvas.addEventListener('touchmove', (event) => {
if (!isDrawing) return;
ctx.beginPath();
ctx.moveTo(lastX, lastY);''
ctx.lineTo(event.clientX,  event.clientY);
ctx.lineWidth = 3;
ctx.stroke();
[lastX, lastY] = [event.clientX, event.clientY];
});
canvas.addEventListener('touchend', () => {
isDrawing = false;
});





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



     