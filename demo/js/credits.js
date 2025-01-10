var credits = new Object();

credits.init = function() {

  credits.open_letter_img = imageset.load("images/cutscene/open_letter.png");  
  credits.reset();
  
}

credits.reset = function() {
  credits.complete = false; 
}

credits.logic = function() {

  // check for clicks 
  if (inputs.clicked) {
    var click_pos = inputs.click_pos;
    inputs.clicked = false;

    credits.complete = true;
    redraw = true;
  }
}

credits.render = function() {
  
  imageset.render(credits.open_letter_img, 0, 0, 240, 160, 0, 0);
  
  // get quest text from the campaign file
  bitfont.render("Credits", 120, 16, bitfont.JUSTIFY_CENTER);
  
  bitfont.render("Art, Code, Design by", 120, 40, bitfont.JUSTIFY_CENTER);
  bitfont.render("Clint Bellanger", 120, 52, bitfont.JUSTIFY_CENTER);
  
  bitfont.render("Palette DB32 by DawnBringer", 120, 76, bitfont.JUSTIFY_CENTER);
  bitfont.render("Font Lookout by somepx", 120, 88, bitfont.JUSTIFY_CENTER);
  bitfont.render("SFX Jingles by Kenney", 120, 100, bitfont.JUSTIFY_CENTER);  
  
  bitfont.render("Play again?", 120, 124, bitfont.JUSTIFY_CENTER);
    
}


