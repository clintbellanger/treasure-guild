// html elements
var can;     // canvas
var ctx;     // context
var FPS = 30;
var SCALE = 1;

// this style of game doesn't update visually often
// set this flag anytime the render function should update the view
var redraw = true;


//---- Logic Function ---------------------------------------------

function logic() {
  gamestate_logic();
}

//---- Render Function ---------------------------------------------

function render() {

  // only render if something has changed
  if (!redraw) return;
  redraw = false;
  
  gamestate_render();
}

//---- Init Function -----------------------------------------------

function init() {

  can = document.getElementById("gamecanvas");
  if (can.getContext) {
    ctx = can.getContext('2d', { alpha: false });
  }  
  resizeCanvas();
    
  if (window.addEventListener) {
    window.addEventListener('mouseup', inputs.handleMouseUp, true);
    window.addEventListener('touchend', inputs.handleTouchEnd, true);
    window.addEventListener('resize', resizeCanvas, false);
    window.addEventListener('orientationchange', resizeCanvas, false);
  } 
  
  // initialize all game units
  // start with game objects that maintain state through game restart
  // e.g. don't reload images and sounds
  imageset.init();
  bitfont.init();
  soundfx.init();
  quest_intro.init();
  quest_outro.init();
  credits.init();
  
  // next, game objects that are reinitialized on game start
  reinit();

  // establish game loop
  setInterval(function() {
    logic();
    render();
  }, 1000/FPS);

}

function reinit() {

  // reinitialize all game units that require it on new game
  hobj.init();
  stats.init();
  
}

