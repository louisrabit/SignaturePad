const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 500;
canvas.height = 300;

let isDrawing = false;
let lastX = 0;
let lastY = 0;

canvas.addEventListener('mousedown', (event) => {
  isDrawing = true;
  // Use getBoundingClientRect() to get the position of the canvas relative to the viewport
  const rect = canvas.getBoundingClientRect();
  // Store the mouse position relative to the canvas in lastX and lastY
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;
});

canvas.addEventListener('mousemove', (event) => {
  if (!isDrawing) return;

  ctx.beginPath();
  ctx.moveTo(lastX, lastY);
  // Use getBoundingClientRect() to get the position of the canvas relative to the viewport
  const rect = canvas.getBoundingClientRect();
  // Update lastX and lastY with the new mouse position relative to the canvas
  lastX = event.clientX - rect.left;
  lastY = event.clientY - rect.top;
  ctx.lineTo(lastX, lastY);
  ctx.lineWidth = 3;
  ctx.stroke();
});

canvas.addEventListener('mouseup', () => {
  isDrawing = false;
});

// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
  const touch = e.touches[0];
  // Create a new mouse event based on the touch event
  const mouseEvent = new MouseEvent("mousedown", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  // Dispatch the mouse event on the canvas
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchend", function (e) {
  const mouseEvent = new MouseEvent("mouseup", {});
  canvas.dispatchEvent(mouseEvent);
}, false);

canvas.addEventListener("touchmove", function (e) {
  const touch = e.touches[0];
  const mouseEvent = new MouseEvent("mousemove", {
    clientX: touch.clientX,
    clientY: touch.clientY
  });
  canvas.dispatchEvent(mouseEvent);
}, false);

// Clear button
document.getElementById('clear').addEventListener('click', function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Download button
const download = document.getElementById('download');
download.addEventListener('click', function (e) {
  // Create a new anchor element
  const link = document.createElement('a');
  link.download = 'download.png';
  // Set the href of the anchor element to the data URL of the canvas image
  link.href = canvas.toDataURL();
  // Dispatch a click event on the anchor element to trigger the download
  link.click();
  // Remove the anchor element from the DOM
  link.remove();
});
