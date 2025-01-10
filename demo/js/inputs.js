/**
Basic input handling.

We only need mouse click or touch input
TODO add optional input without pointer (arrowkeys to move a cursor)

*/


var inputs = new Object();

// events will set this to true
// gameplay loop should read and reset this
inputs.clicked = false;
inputs.click_pos = {x: 0, y: 0};

inputs.handleMouseUp = function(evt) {
  evt.preventDefault();
  inputs.clicked = true;
  inputs.click_pos = inputs.clickCoord(evt);
}

inputs.handleTouchEnd = function(evt) {
  evt.preventDefault();
  inputs.clicked = true;
  inputs.click_pos = inputs.clickCoord(evt.changedTouches[0]);
}

inputs.clickCoord = function(evt) {

  var canx;
  var cany;
  
  if (evt.pageX || evt.pageY) { 
    canx = evt.pageX;
    cany = evt.pageY;
  }
  else { 
    canx = evt.clientX + document.body.scrollLeft + document.documentElement.scrollLeft; 
    cany = evt.clientY + document.body.scrollTop + document.documentElement.scrollTop; 
  } 
  canx -= can.offsetLeft;
  cany -= can.offsetTop;
  
  canx /= SCALE;
  cany /= SCALE;
  
  return {x:canx, y:cany};
}

