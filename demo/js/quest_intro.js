var quest_intro = new Object();

quest_intro.init = function() {

  quest_intro.closed_letter_img = imageset.load("images/cutscene/closed_letter.png");
  quest_intro.open_letter_img = imageset.load("images/cutscene/open_letter.png");
  quest_intro.seal_img = imageset.load("images/cutscene/seal.png");
  
  quest_intro.reset();
  
}

quest_intro.reset = function() {
  quest_intro.sealed = true;
  quest_intro.complete = false;  
}

quest_intro.logic = function() {

  // check for clicks 
  if (inputs.clicked) {
    var click_pos = inputs.click_pos;
    inputs.clicked = false;

    if (quest_intro.sealed) {
      quest_intro.sealed = false;
      redraw = true;
      soundfx.play(SFX_PAGE);
    }
    else {
      quest_intro.complete = true;
      redraw = true;
    }  
  }
}


quest_intro.render = function() {
  if (quest_intro.sealed) {
    imageset.render(quest_intro.closed_letter_img, 0, 0, 240, 160, 0, 0);  
    imageset.render(quest_intro.seal_img, 0, 0, 16, 16, 112, 72);  
  }
  else {
    imageset.render(quest_intro.open_letter_img, 0, 0, 240, 160, 0, 0);
    
    // get quest text from the campaign file
    bitfont.render("Do you have what it takes", 120, 16, bitfont.JUSTIFY_CENTER);
    bitfont.render("to join the Treasure Guild?", 120, 28, bitfont.JUSTIFY_CENTER);
    bitfont.render("You'll need more than just a", 120, 40, bitfont.JUSTIFY_CENTER);
    bitfont.render("keen eye and quick wits.", 120, 52, bitfont.JUSTIFY_CENTER);
    bitfont.render("Start your search at the", 120, 64, bitfont.JUSTIFY_CENTER);
    bitfont.render("Tavern, our old hiding spot.", 120, 76, bitfont.JUSTIFY_CENTER);
    bitfont.render("Don't touch anything that", 120, 88, bitfont.JUSTIFY_CENTER);
    bitfont.render("is not on the list.", 120, 100, bitfont.JUSTIFY_CENTER);
    bitfont.render("-T", 120, 124, bitfont.JUSTIFY_CENTER);
    
  }
}


