var quest_outro = new Object();

quest_outro.init = function() {

  quest_outro.open_letter_img = imageset.load("images/cutscene/open_letter.png");  
  quest_outro.reset();
  
}

quest_outro.reset = function() {
  quest_outro.complete = false;  
  quest_outro.view_credits = false;
}

quest_outro.logic = function() {

  // check for clicks 
  if (inputs.clicked) {
    var click_pos = inputs.click_pos;
    inputs.clicked = false;
    
    // if clicked on View Credits specifically
    if (isWithin(click_pos, {x:50, y:100, w:140, h:12})) {
      quest_outro.view_credits = true;
      redraw = true;
      soundfx.play(SFX_PAGE);
    }
    else {
      // if clicked anywhere else, Play Again
      quest_outro.complete = true;
      redraw = true;
    }
  }
}

quest_outro.render = function() {
  
  imageset.render(quest_outro.open_letter_img, 0, 0, 240, 160, 0, 0);
  
  // get quest text from the campaign file
  bitfont.render("Quest Complete", 120, 16, bitfont.JUSTIFY_CENTER);
  bitfont.render("Tavern", 120, 28, bitfont.JUSTIFY_CENTER);
  
  var accuracy = Math.floor((10 / (hobj.misclick_count + 10)) * 100 + 0.5);
  
  bitfont.render("Items found:", 116, 52, bitfont.JUSTIFY_RIGHT);
  bitfont.render("10/10", 124, 52, bitfont.JUSTIFY_LEFT);
  
  bitfont.render("Accuracy:", 116, 64, bitfont.JUSTIFY_RIGHT);
  bitfont.render(accuracy + "%", 124, 64, bitfont.JUSTIFY_LEFT);

  bitfont.render("Time:", 116, 76, bitfont.JUSTIFY_RIGHT);
  bitfont.render(stats.get_time(), 124, 76, bitfont.JUSTIFY_LEFT);

  bitfont.render("View Credits", 120, 100, bitfont.JUSTIFY_CENTER)
  bitfont.render("Play again?", 120, 124, bitfont.JUSTIFY_CENTER);
    

}


