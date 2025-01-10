/**
 Sound effects library
 */
 
var SFX_PAGE = 0;
var SFX_BOOK = 1;
var SFX_POSITIVE = 2;
var SFX_NEGATIVE = 3;
var SFX_FANFARE = 4;

var soundfx = new Object();

soundfx.init = function() {
  soundfx.fx = new Array();
  soundfx.fx[SFX_PAGE] = new Audio("soundfx/page.mp3");
  soundfx.fx[SFX_BOOK] = new Audio("soundfx/book.mp3");
  soundfx.fx[SFX_POSITIVE] = new Audio("soundfx/positive.mp3");
  soundfx.fx[SFX_NEGATIVE] = new Audio("soundfx/negative.mp3");
  soundfx.fx[SFX_FANFARE] = new Audio("soundfx/fanfare.mp3");
}

soundfx.play = function(sfx_id) {
   
  try {
    soundfx.fx[sfx_id].currentTime = 0;
    soundfx.fx[sfx_id].play();
  }
  catch(err) {
    // it's okay if soundfx can't play.
  };
 
}
