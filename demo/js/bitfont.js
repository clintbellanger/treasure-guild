/**
 Bitamp Font renderer
 Clint Bellanger

Note this class is simplified in several ways:
- Each glyph is the same height (don't need an h var for each glyph)
- The font image has glyphs all in one row (don't need to store the y coord)
- Optionally convert all text to uppercase
- No word wrap

 */


var bitfont = {};

bitfont.init = function() {

  bitfont.JUSTIFY_LEFT = 0;
  bitfont.JUSTIFY_RIGHT = 1;
  bitfont.JUSTIFY_CENTER = 2;

  bitfont.glyph_x = [];
  bitfont.glyph_w = [];
  bitfont.cursor_x = 0;

  // configuration for this font
  bitfont.img_id = imageset.load("images/ui/bitfont.png");

  bitfont.kerning = 1;
  bitfont.height = 12;
  bitfont.space = 3;
  bitfont.has_lowercase = true;

  // glyph definitions
  bitfont.glyph_x["!"] = 1; bitfont.glyph_w["!"] = 1;
  bitfont.glyph_x["\""] = 3; bitfont.glyph_w["\""] = 3;
  bitfont.glyph_x["#"] = 7; bitfont.glyph_w["#"] = 6;
  bitfont.glyph_x["$"] = 14; bitfont.glyph_w["$"] = 8;
  bitfont.glyph_x["%"] = 23; bitfont.glyph_w["%"] = 7;
  bitfont.glyph_x["&"] = 31; bitfont.glyph_w["&"] = 6;
  bitfont.glyph_x["'"] = 38; bitfont.glyph_w["'"] = 2;
  bitfont.glyph_x["("] = 41; bitfont.glyph_w["("] = 2;
  bitfont.glyph_x[")"] = 44; bitfont.glyph_w[")"] = 2;
  bitfont.glyph_x["*"] = 47; bitfont.glyph_w["*"] = 4;
  bitfont.glyph_x["+"] = 52; bitfont.glyph_w["+"] = 4;
  bitfont.glyph_x[","] = 57; bitfont.glyph_w[","] = 2;
  bitfont.glyph_x["-"] = 60; bitfont.glyph_w["-"] = 3;
  bitfont.glyph_x["."] = 64; bitfont.glyph_w["."] = 1;
  bitfont.glyph_x["/"] = 66; bitfont.glyph_w["/"] = 3;
  
  bitfont.glyph_x["0"] = 70; bitfont.glyph_w["0"] = 5;
  bitfont.glyph_x["1"] = 76; bitfont.glyph_w["1"] = 5;
  bitfont.glyph_x["2"] = 82; bitfont.glyph_w["2"] = 5;
  bitfont.glyph_x["3"] = 88; bitfont.glyph_w["3"] = 5;
  bitfont.glyph_x["4"] = 94; bitfont.glyph_w["4"] = 5;
  bitfont.glyph_x["5"] = 100; bitfont.glyph_w["5"] = 5;
  bitfont.glyph_x["6"] = 106; bitfont.glyph_w["6"] = 5;
  bitfont.glyph_x["7"] = 112; bitfont.glyph_w["7"] = 5;
  bitfont.glyph_x["8"] = 118; bitfont.glyph_w["8"] = 5;
  bitfont.glyph_x["9"] = 124; bitfont.glyph_w["9"] = 5;
  
  bitfont.glyph_x[":"] = 130; bitfont.glyph_w[":"] = 1;
  bitfont.glyph_x[";"] = 132; bitfont.glyph_w[";"] = 2;
  bitfont.glyph_x["<"] = 135; bitfont.glyph_w["<"] = 3;
  bitfont.glyph_x["="] = 139; bitfont.glyph_w["="] = 3;
  bitfont.glyph_x[">"] = 143; bitfont.glyph_w[">"] = 3;
  bitfont.glyph_x["?"] = 147; bitfont.glyph_w["?"] = 5;
  bitfont.glyph_x["@"] = 153; bitfont.glyph_w["@"] = 8;
  
  bitfont.glyph_x["A"] = 162; bitfont.glyph_w["A"] = 7;
  bitfont.glyph_x["B"] = 170; bitfont.glyph_w["B"] = 8;
  bitfont.glyph_x["C"] = 179; bitfont.glyph_w["C"] = 6;
  bitfont.glyph_x["D"] = 186; bitfont.glyph_w["D"] = 8;
  bitfont.glyph_x["E"] = 195; bitfont.glyph_w["E"] = 8;
  bitfont.glyph_x["F"] = 204; bitfont.glyph_w["F"] = 8;
  bitfont.glyph_x["G"] = 213; bitfont.glyph_w["G"] = 6;
  bitfont.glyph_x["H"] = 220; bitfont.glyph_w["H"] = 8;
  bitfont.glyph_x["I"] = 229; bitfont.glyph_w["I"] = 5;
  bitfont.glyph_x["J"] = 235; bitfont.glyph_w["J"] = 6;
  bitfont.glyph_x["K"] = 242; bitfont.glyph_w["K"] = 8;
  bitfont.glyph_x["L"] = 251; bitfont.glyph_w["L"] = 8;
  bitfont.glyph_x["M"] = 260; bitfont.glyph_w["M"] = 9;
  bitfont.glyph_x["N"] = 270; bitfont.glyph_w["N"] = 9;
  bitfont.glyph_x["O"] = 280; bitfont.glyph_w["O"] = 8;
  bitfont.glyph_x["P"] = 289; bitfont.glyph_w["P"] = 8;
  bitfont.glyph_x["Q"] = 298; bitfont.glyph_w["Q"] = 8;
  bitfont.glyph_x["R"] = 307; bitfont.glyph_w["R"] = 8;
  bitfont.glyph_x["S"] = 316; bitfont.glyph_w["S"] = 7;
  bitfont.glyph_x["T"] = 324; bitfont.glyph_w["T"] = 7;
  bitfont.glyph_x["U"] = 332; bitfont.glyph_w["U"] = 8;
  bitfont.glyph_x["V"] = 341; bitfont.glyph_w["V"] = 8;
  bitfont.glyph_x["W"] = 350; bitfont.glyph_w["W"] = 9;
  bitfont.glyph_x["X"] = 360; bitfont.glyph_w["X"] = 8;
  bitfont.glyph_x["Y"] = 369; bitfont.glyph_w["Y"] = 8;
  bitfont.glyph_x["Z"] = 378; bitfont.glyph_w["Z"] = 6;

  bitfont.glyph_x["["] = 385; bitfont.glyph_w["["] = 2;
  bitfont.glyph_x["\\"] = 388; bitfont.glyph_w["\\"] = 3;
  bitfont.glyph_x["]"] = 392; bitfont.glyph_w["]"] = 2;
  bitfont.glyph_x["^"] = 395; bitfont.glyph_w["^"] = 5;
  bitfont.glyph_x["_"] = 401; bitfont.glyph_w["_"] = 5;
  bitfont.glyph_x["`"] = 407; bitfont.glyph_w["`"] = 3;

  bitfont.glyph_x["a"] = 411; bitfont.glyph_w["a"] = 4;
  bitfont.glyph_x["b"] = 416; bitfont.glyph_w["b"] = 4;
  bitfont.glyph_x["c"] = 421; bitfont.glyph_w["c"] = 4;
  bitfont.glyph_x["d"] = 426; bitfont.glyph_w["d"] = 5;
  bitfont.glyph_x["e"] = 432; bitfont.glyph_w["e"] = 5;
  bitfont.glyph_x["f"] = 438; bitfont.glyph_w["f"] = 4;
  bitfont.glyph_x["g"] = 443; bitfont.glyph_w["g"] = 5;
  bitfont.glyph_x["h"] = 449; bitfont.glyph_w["h"] = 4;
  bitfont.glyph_x["i"] = 454; bitfont.glyph_w["i"] = 3;
  bitfont.glyph_x["j"] = 458; bitfont.glyph_w["j"] = 4;
  bitfont.glyph_x["k"] = 463; bitfont.glyph_w["k"] = 5;
  bitfont.glyph_x["l"] = 469; bitfont.glyph_w["l"] = 2;
  bitfont.glyph_x["m"] = 472; bitfont.glyph_w["m"] = 7;
  bitfont.glyph_x["n"] = 480; bitfont.glyph_w["n"] = 4;
  bitfont.glyph_x["o"] = 485; bitfont.glyph_w["o"] = 4;
  bitfont.glyph_x["p"] = 490; bitfont.glyph_w["p"] = 5;
  bitfont.glyph_x["q"] = 496; bitfont.glyph_w["q"] = 4;
  bitfont.glyph_x["r"] = 501; bitfont.glyph_w["r"] = 5;
  bitfont.glyph_x["s"] = 507; bitfont.glyph_w["s"] = 5;
  bitfont.glyph_x["t"] = 513; bitfont.glyph_w["t"] = 5;
  bitfont.glyph_x["u"] = 519; bitfont.glyph_w["u"] = 4;
  bitfont.glyph_x["v"] = 524; bitfont.glyph_w["v"] = 5;
  bitfont.glyph_x["w"] = 530; bitfont.glyph_w["w"] = 7;
  bitfont.glyph_x["x"] = 538; bitfont.glyph_w["x"] = 5;
  bitfont.glyph_x["y"] = 544; bitfont.glyph_w["y"] = 5;
  bitfont.glyph_x["z"] = 550; bitfont.glyph_w["z"] = 5;
  
  bitfont.glyph_x["{"] = 556; bitfont.glyph_w["{"] = 2;
  bitfont.glyph_x["|"] = 559; bitfont.glyph_w["|"] = 1;
  bitfont.glyph_x["}"] = 561; bitfont.glyph_w["}"] = 2;
  bitfont.glyph_x["~"] = 564; bitfont.glyph_w["~"] = 5;

}

/**
 * Render text at x,y with the given text justify
 */
bitfont.render = function(text, x, y, justify) {

  var drawtext = text;
  if (!bitfont.has_lowercase) drawtext = text.toUpperCase();
  bitfont.set_position(drawtext, x, justify);

  for (var i=0; i < drawtext.length; i++) {
    bitfont.render_glyph(drawtext.charAt(i), y);
  }

}

/**
 * Sets the starting position for rendering text
 * based on the justify option
 */
bitfont.set_position = function(text, x, justify) {
  if (justify == bitfont.JUSTIFY_LEFT) {
    bitfont.cursor_x = x;
  }
  else if (justify == bitfont.JUSTIFY_RIGHT) {
    bitfont.cursor_x = x - bitfont.calcwidth(text);
  }
  else if (justify == bitfont.JUSTIFY_CENTER) {
    bitfont.cursor_x = x - (bitfont.calcwidth(text)/2);
  }
}

/**
 * Calculate the total width of a string
 * Useful for center or right justify
 */
bitfont.calcwidth = function(text) {
  var total_width = 0;
  var character;

  for (var i=0; i < text.length; i++) {
    character = text.charAt(i);
    if (character == " ") {
      total_width += bitfont.space;
    }
    else {
      total_width += bitfont.glyph_w[character] + bitfont.kerning;
    }
  }
  return total_width - bitfont.kerning;
}

/**
 * Internal function
 * Render glyph at cursor_x, y
 */
bitfont.render_glyph = function(character, y) {

  if (character == " ") {
    bitfont.cursor_x += bitfont.space;
  }
  else {

    imageset.render (
    bitfont.img_id,
      bitfont.glyph_x[character],
      0,
      bitfont.glyph_w[character],
      bitfont.height,
      bitfont.cursor_x,
      y
    );

    bitfont.cursor_x += bitfont.glyph_w[character] + bitfont.kerning;
  }

}

