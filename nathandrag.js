let w = 0, h = 0;

let neptune = new Image();

let draggableThings = [];

function fixSize() {
    w = window.innerWidth;
    h = window.innerHeight;
    const canvas = document.getElementById('nathanCanvas');
    canvas.width = w;
    canvas.height = h;
}

let mousePosition = {x: 0, y: 0}, leftMouseDown = false, rightMouseDown = false;    // Also from JavaScript lesson 3

function pageLoad() {

    window.addEventListener("resize", fixSize);
    fixSize();

    window.requestAnimationFrame(redraw);

    neptune.src = "neptune.png";

    for (let i = 0; i < 100; i++) {
      draggableThings.push({
        x : Math.random() * w,
        y : Math.random() * h,
        w : 128,
        h : 128,
        offsetX : 0,
        offsetY : 0,
      });
    }

    /* Code from JavaScript lesson 3 */

    const canvas = document.getElementById('nathanCanvas');

   canvas.addEventListener('mousemove', event => {
       mousePosition.x = event.clientX;
       mousePosition.y = event.clientY;
   }, false);

   canvas.addEventListener('mousedown', event => {
       if (event.button === 0) {
           leftMouseDown = true;
       } else {
           rightMouseDown = true;
       }
   }, false);

   canvas.addEventListener('mouseup', event => {
       if (event.button === 0) {
           leftMouseDown = false;
       } else {
           rightMouseDown = false;
       }
   }, false);

   canvas.oncontextmenu = function (e) {
       e.preventDefault();
   };

   /* End! */

}

let draggedThing = null;
function redraw() {

    const canvas = document.getElementById('nathanCanvas');
    const context = canvas.getContext('2d');

    context.fillStyle = 'navy';    // Clear the background
    context.fillRect(0,0,w,h);

    if (leftMouseDown) {
      if (draggedThing === null) {
        for (let thing of draggableThings) {
          if (mousePosition.x > thing.x && mousePosition.y > thing.y &&
                  mousePosition.x < thing.x + thing.w && mousePosition.y < thing.y + thing.h) {
            draggedThing = thing;
            thing.offsetX = mousePosition.x - thing.x;
            thing.offsetY = mousePosition.y - thing.y;
            break;
          }
        }
      }
      if (draggedThing !== null) {
        draggedThing.x = mousePosition.x - draggedThing.offsetX;
        draggedThing.y = mousePosition.y - draggedThing.offsetY;
      }
    } else {
      draggedThing = null;
    }

    for (let thing of draggableThings) {
      context.drawImage(neptune, thing.x, thing.y);
    }

    window.requestAnimationFrame(redraw);   // Do it again

}
