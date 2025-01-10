/**
 Primary game state switcher
 
 */
 
var STATE_LOADING = 0;
var STATE_TITLE = 1;
var STATE_QUEST_INTRO = 2;
var STATE_SEARCH = 3;
var STATE_QUEST_OUTRO = 4;
var STATE_CREDITS = 5;

var gamestate = STATE_LOADING;

function gamestate_logic() {

  imageset.logic();
    
  if (gamestate == STATE_LOADING) {
    // are images done loading?
    if (imageset.list.length == imageset.loaded) {
      
      resizeCanvas();
      gamestate = STATE_QUEST_INTRO;      
      redraw = true;
      imageset.fade_in();
      
    }
    else {
      redraw = true; // animate loading bar
    }    
  }
  else if (gamestate == STATE_QUEST_INTRO) {
    quest_intro.logic();
    if (quest_intro.complete) {      
      gamestate = STATE_SEARCH;      
      hobj.reset();
      stats.start_timer();
      redraw = true;
      imageset.fade_in();
    }      
    
  }
  else if (gamestate == STATE_SEARCH) {
    hobj.logic();
    if (hobj.complete) {      
      gamestate = STATE_QUEST_OUTRO;
      quest_outro.reset();
      redraw = true;
    }
  }
  else if (gamestate == STATE_QUEST_OUTRO) {
    quest_outro.logic();
    
    if (quest_outro.view_credits) {
      gamestate = STATE_CREDITS;
      credits.reset();
      redraw = true;      
    }
    else if (quest_outro.complete) {
      gamestate = STATE_QUEST_INTRO;
      quest_intro.reset();
      redraw = true;
      imageset.fade_in();
    }          
  }
  else if (gamestate == STATE_CREDITS) {
    credits.logic();

    if (credits.complete) {
      gamestate = STATE_QUEST_INTRO;
      quest_intro.reset();
      redraw = true;
      imageset.fade_in();
    }      
    
  }
  
}

function gamestate_render() {
  
  if (gamestate == STATE_LOADING) {
    loadbar_render(100 * (imageset.loaded / imageset.list.length));
    return;
  }
  else if (gamestate == STATE_QUEST_INTRO) {
    quest_intro.render(); 
  }
  else if (gamestate == STATE_SEARCH) {
    hobj.render();
  }
  else if (gamestate == STATE_QUEST_OUTRO) {
    hobj.render(); // show scene behind outro
    quest_outro.render();
  }
  else if (gamestate == STATE_CREDITS) {
    credits.render();
  }
  imageset.render_fade();
}
