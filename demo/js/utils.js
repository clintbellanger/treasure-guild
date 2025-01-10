var VIEW_WIDTH = 240;
var VIEW_HEIGHT = 160;

// The output should be scaled to the following multiple of 240x160
// If STRETCH_TO_SCREEN is enabled, this output scale is recalculated for the current window size
// If STRETCH_TO_SCREEN is disabled, specify a custom output scale here.
var SCALE = 4;

// If disabled, the display won't scale any images
var STRETCH_TO_SCREEN = true;

// Use nearest int for SCALE when stretching
var STRETCH_TO_WHOLE_SIZES = false;

/**
 * Given a point with x,y and a rect with x,y,w,h
 * Determine if the point is within the rect
 */
function isWithin(point, rect) {
  if (point.x < rect.x) return false;
  if (point.y < rect.y) return false;
  if (point.x > rect.x + rect.w) return false;
  if (point.y > rect.y + rect.h) return false;
  return true;
}

function randBetween(min, max) {
  return Math.floor(Math.random() * (max - min +1) + min);
}

function resizeCanvas() {
  if (!STRETCH_TO_SCREEN) {
    
      can.width = VIEW_WIDTH * SCALE;
      can.height = VIEW_HEIGHT * SCALE;
      redraw = true;
      setNearestNeighbor();
      return;
  }

  var aspect_ratio = VIEW_WIDTH/VIEW_HEIGHT;
    
  // the screen is more wide than tall
  if (window.innerHeight * aspect_ratio < window.innerWidth) {  
    can.height = window.innerHeight;
    can.width = can.height * aspect_ratio;
    SCALE = can.height / VIEW_HEIGHT;
  }
  // the screen is more tall than wide
  else {
    can.width = window.innerWidth;
    can.height = can.width / aspect_ratio;
    SCALE = can.width / VIEW_WIDTH;
  }
  
  if (STRETCH_TO_WHOLE_SIZES) {
    if (SCALE > 1) {
      SCALE = Math.floor(SCALE);
      // TODO fix overdraw when using whole sizes
    }
  }
  
  ctx.scale(SCALE,SCALE);
  
  redraw = true;
  setNearestNeighbor();
}

function setNearestNeighbor() {
  ctx.imageSmoothingEnabled = false;
}

function clearCanvas(fillStyle) {
  ctx.fillStyle = fillStyle;
  ctx.fillRect(0,0,160,90);
}
