/*
hidden object gameplay

*/

var hobj = new Object();


const LIST_HIDDEN = 0;
const LIST_LEFT = 1;
const LIST_RIGHT = 2;
const LIST_CENTER = 3;
const LIST_NONE = 4;

hobj.init = function() {
  hobj.load_scene();
  
  // variables to handle item blinking when found
  hobj.last_item_found = -1;
  hobj.last_item_countdown = 0;
  
  // background texture for the item list to provide contrast
  hobj.list_bg_filename = "list_bg.png";
  hobj.list_bg_img = imageset.load("images/ui/" + hobj.list_bg_filename);
  
  // for point & click interfaces, show LIST tab on top corners
  hobj.list_tab_filename = "list_tab.png";
  hobj.list_tab_img = imageset.load("images/ui/" + hobj.list_tab_filename);

  // scratch out items as they are found
  hobj.list_scratch_filename = "scratch.png";
  hobj.list_scratch_img = imageset.load("images/ui/" + hobj.list_scratch_filename);
 
  // feedback when clicking item not on list
  hobj.miss_filename = "miss.png";
  hobj.miss_img = imageset.load("images/ui/" + hobj.miss_filename);
  hobj.misclick_count = 0;
  hobj.misclick_pos = {x: 0, y: 0};
  hobj.misclick_timer = 0;

  // level complete trackers
  hobj.found_count = 0;
  hobj.found_goal = 10;

  hobj.reset();

}

hobj.reset = function() {
  hobj.list_state = LIST_CENTER;  
  hobj.load_search_list();  

  hobj.complete = false;    
  hobj.found_count = 0;
  hobj.misclick_count = 0;

  stats.reset_timer();

  hobj.found = new Array();  
  for (var i=0; i<hobj.scene.item_def.length; i++) {
    hobj.found[i] = false;      
  }  
}


hobj.load_scene = function() {
  // TODO this needs to be loaded from a data file
  // hardcoding the first scene to figure out the format
  
  hobj.scene = new Object();
  hobj.scene.title = "Tavern";
  hobj.scene.bg_filename = "1-1bg.png";
  
  hobj.scene.bg_img = imageset.load("images/scene/" + hobj.scene.bg_filename);
  
  // arbitrary number of layers of items with transparent background
  // listed in draw order from back to front
  // 0 is furthest back and drawn first
  // item layers are NOT repacked to save space
  // item layers should be the same size as the background
  // items should already be in position relative to the background
  hobj.scene.item_filename = new Array();
  hobj.scene.item_filename[0] = "1-1item0.png";
  hobj.scene.item_filename[1] = "1-1item1.png";
  
  hobj.scene.item_img = new Array();
  for (var i=0; i<hobj.scene.item_filename.length; i++) {
    hobj.scene.item_img[i] = imageset.load("images/scene/" + hobj.scene.item_filename[i]);
  }
   
  // item definition
  // name = as displayed on the search list
  // src_img: which item image (item_img index) contains this item
  // x,y: the top-left corner of the item in the source image,
  //   and where it is drawn over the background,
  //   and the top-left clickable region for this item
  // w,h: width and height of the item, for rendering and for the clickable region
  hobj.scene.item_def = new Array();
  hobj.scene.item_def[0] = {name: "Wine Bottle", src_img: 0, x: 19, y: 17, w: 13, h: 27};
  hobj.scene.item_def[1] = {name: "Diamond", src_img: 0, x: 32, y: 17, w: 15, h: 15};
  hobj.scene.item_def[2] = {name: "Skull", src_img: 0, x: 25, y: 48, w: 17, h: 15};
  hobj.scene.item_def[3] = {name: "Goblet", src_img: 0, x: 29, y: 66, w: 9, h: 12};
  hobj.scene.item_def[4] = {name: "Keg", src_img: 0, x: 38, y: 67, w: 31, h: 28};
  hobj.scene.item_def[5] = {name: "Boot", src_img: 0, x: 3, y: 108, w: 17, h: 24};
  hobj.scene.item_def[6] = {name: "Key", src_img: 0, x: 28, y: 139, w: 10, h: 18};
  hobj.scene.item_def[7] = {name: "Tankard", src_img: 0, x: 31, y: 105, w: 16, h: 24};
  hobj.scene.item_def[8] = {name: "Ladybug", src_img: 0, x: 53, y: 104, w: 11, h: 14};
  hobj.scene.item_def[9] = {name: "Bowl", src_img: 0, x: 47, y: 122, w: 20, h: 16};
  hobj.scene.item_def[10] = {name: "Cane", src_img: 0, x: 72, y: 91, w: 11, h: 28};
  hobj.scene.item_def[11] = {name: "Cards", src_img: 0, x: 82, y: 123, w: 30, h: 18};
  hobj.scene.item_def[12] = {name: "Coins", src_img: 0, x: 99, y: 107, w: 21, h: 15};
  hobj.scene.item_def[13] = {name: "Map", src_img: 0, x: 114, y: 124, w: 40, h: 15};
  hobj.scene.item_def[14] = {name: "Eight", src_img: 0, x: 139, y: 139, w: 18, h: 10};
  hobj.scene.item_def[15] = {name: "Arrow", src_img: 0, x: 77, y: 10, w: 8, h: 52};
  hobj.scene.item_def[16] = {name: "Garlic", src_img: 0, x: 85, y: 13, w: 12, h: 37};
  hobj.scene.item_def[17] = {name: "Blue Jay", src_img: 0, x: 121, y: 39, w: 15, h: 12};
  hobj.scene.item_def[18] = {name: "Axe", src_img: 0, x: 88, y: 50, w: 17, h: 46};
  hobj.scene.item_def[19] = {name: "Dartboard", src_img: 0, x: 105, y: 52, w: 29, h: 33};
  hobj.scene.item_def[20] = {name: "Buckler", src_img: 0, x: 109, y: 86, w: 22, h: 21};
  hobj.scene.item_def[21] = {name: "Sledgehammer", src_img: 0, x: 134, y: 52, w: 17, h: 60};
  hobj.scene.item_def[22] = {name: "Broom", src_img: 0, x: 163, y: 70, w: 14, h: 65};
  hobj.scene.item_def[23] = {name: "Bellows", src_img: 0, x: 177, y: 116, w: 15, h: 24};
  hobj.scene.item_def[24] = {name: "Cat", src_img: 0, x: 176, y: 141, w: 32, h: 19};
  hobj.scene.item_def[25] = {name: "Chameleon", src_img: 0, x: 195, y: 114, w: 17, h: 24};
  hobj.scene.item_def[26] = {name: "Mouse", src_img: 0, x: 209, y: 140, w: 16, h: 14};
  hobj.scene.item_def[27] = {name: "Poker", src_img: 0, x: 225, y: 110, w: 9, h: 48};
  hobj.scene.item_def[28] = {name: "Potted Plant", src_img: 0, x: 176, y: 70, w: 18, h: 20};
  hobj.scene.item_def[29] = {name: "Portrait", src_img: 0, x: 197, y: 67, w: 22, h: 26};
  hobj.scene.item_def[30] = {name: "Gnome", src_img: 0, x: 221, y: 72, w: 14, h: 20};
  hobj.scene.item_def[31] = {name: "Horseshoe", src_img: 0, x: 178, y: 34, w: 14, h: 19};
  hobj.scene.item_def[32] = {name: "Violin", src_img: 0, x: 217, y: 19, w: 17, h: 36};
  hobj.scene.item_def[33] = {name: "Turkey Leg", src_img: 1, x: 9, y: 84, w: 25, h: 13};
  hobj.scene.item_def[34] = {name: "Spoon", src_img: 1, x: 59, y: 131, w: 18, h: 10};
  hobj.scene.item_def[35] = {name: "Dice", src_img: 1, x: 104, y: 127, w: 13, h: 12};
  hobj.scene.item_def[36] = {name: "Dagger", src_img: 1, x: 126, y: 98, w: 14, h: 32};
  hobj.scene.item_def[37] = {name: "Rope", src_img: 1, x: 143, y: 85, w: 19, h: 44};
  hobj.scene.item_def[38] = {name: "Longsword", src_img: 1, x: 175, y: 54, w: 61, h: 19};
  hobj.scene.item_def[39] = {name: "Deer", src_img: 1, x: 190, y: 23, w: 24, h: 31};

}

hobj.load_search_list = function() {
  hobj.search_list = new Array();
  
  var candidate = 0;
  
  while (hobj.search_list.length < 10) {
    candidate = randBetween(0, hobj.scene.item_def.length -1);
  
    // add to the list if not already there
    if (hobj.search_list.indexOf(candidate) == -1) {
      hobj.search_list.push(candidate); 
    }
  }  
}


hobj.logic = function() {
    
  stats.tick_timer();
  
  // countdown penalty timer, animate penalty marker
  if (hobj.misclick_timer > 0) {
    redraw = true;
    hobj.misclick_timer--;    
  }
  
  // animate last item found
  if (hobj.last_item_countdown > 0) {
    redraw = true;
    hobj.last_item_countdown--;
  }
  
  // check for clicks 
  if (inputs.clicked) {
    var click_pos = inputs.click_pos;
    inputs.clicked = false;
    
    // highest priority is UI interaction
    var click_used = hobj.logic_ui(click_pos);
    
    // misclicking locks the player out of trying again for a moment
    if (!click_used && hobj.misclick_timer == 0) {
      
      // did we click on an item?
      var item_found = hobj.logic_check_item(click_pos);
      if (item_found != -1) click_used = true;
    }
    
    if (!click_used) {
        // if clicked on empty space, close any open tabs
        if (hobj.list_state == LIST_LEFT || hobj.list_state == LIST_RIGHT) {
          hobj.list_state = LIST_HIDDEN;
          redraw = true;
          soundfx.play(SFX_BOOK);
        }        
    }    
  }
  
  // check for level complete
  if (hobj.found_count >= hobj.found_goal && hobj.last_item_countdown == 0) {
    hobj.complete = true;
    // hide the UI before showing quest outro
    hobj.list_state = LIST_NONE;
    soundfx.play(SFX_PAGE);    
  }

}

// did we click on an item?
// return the item id, or -1 if no item found
hobj.logic_check_item = function(click_pos) {

  // step 1: check for matching items  
  // search items last drawn to first drawn to prioritize overlaps
  for (var i=hobj.scene.item_def.length-1; i>=0; i--) {
      
    // skip checking this object if already found
    if (!hobj.found[i]) {
      
      // only match if item is on our search list
      if (hobj.search_list.indexOf(i) > -1) {
            
        // item definition has an x,y,w,h so we can treat it like a Rect object
        if (isWithin(click_pos, hobj.scene.item_def[i])) {
          hobj.found[i] = true;
                
          hobj.last_item_found = i;
          hobj.last_item_countdown = 60;
          
          hobj.found_count++;
          
          if (hobj.found_count < hobj.found_goal) {
            soundfx.play(SFX_POSITIVE);
          }
          else if (hobj.found_count >= hobj.found_goal) {
            soundfx.play(SFX_FANFARE);
         
            // stop timer immediately if this is the final item
           stats.stop_timer(); 
          }
        
          redraw = true;
          // early quit, only find the first/topmost matching item
          return i;
        }
      }
    }
  }
  
  // step 2: check for mismatched items
  // search items last drawn to first drawn to prioritize overlaps
  for (var i=hobj.scene.item_def.length-1; i>=0; i--) {
      
    // skip checking this object if already found
    if (!hobj.found[i]) {
            
      // only match if item is NOT on our search list
      if (hobj.search_list.indexOf(i) == -1) {
            
        // item definition has an x,y,w,h so we can treat it like a Rect object
        if (isWithin(click_pos, hobj.scene.item_def[i])) {
          
          // clicked a wrong item, apply the penalty
          hobj.misclick_count++;
          hobj.misclick_timer = 30; // 1 second at 30fps
          hobj.misclick_pos = click_pos;                  
          redraw = true;
          
          soundfx.play(SFX_NEGATIVE);
          
          // early quit
          return i;
        }
      }
      
    }
  }
  
  
  // no item found (click not used)
  return -1;
  
}


// return true if the click was used
// return false if the click is unused
hobj.logic_ui = function(click_pos) {
  
  // if the list is centered at scene start, any click dismisses the list
  if (hobj.list_state == LIST_CENTER) {
    hobj.list_state = LIST_HIDDEN;
    redraw = true;
    soundfx.play(SFX_BOOK);
    return true;
  }
  
  // check LIST tabs
  if (click_pos.y < 14) {
    if (click_pos.x < 34) {
      if (hobj.list_state == LIST_HIDDEN || hobj.list_state == LIST_RIGHT) {
        hobj.list_state = LIST_LEFT;
        redraw = true;
        soundfx.play(SFX_PAGE);;
        return true;
      }
    }
    
    if (click_pos.x > 206) {
      if (hobj.list_state == LIST_HIDDEN || hobj.list_state == LIST_LEFT) {
        hobj.list_state = LIST_RIGHT;
        redraw = true;
        soundfx.play(SFX_PAGE);
        return true;
      }      
    }
  }
  
  // check clicking on list to dismiss
  if (hobj.list_state == LIST_LEFT) {
    if (click_pos.x < 100) {
      hobj.list_state = LIST_HIDDEN;      
      redraw = true;
      soundfx.play(SFX_BOOK);
      return true;
    }      
  }
  else if (hobj.list_state == LIST_RIGHT) {
    if (click_pos.x > 140) {
      hobj.list_state = LIST_HIDDEN;
      redraw = true;
      soundfx.play(SFX_BOOK);
      return true;
    }          
  }
  
  // did not click on any ui element
  return false;
 
}

hobj.render = function() {  
  // background
  imageset.render(hobj.scene.bg_img, 0, 0, VIEW_WIDTH, VIEW_HEIGHT, 0, 0);
  
  // objects  
  for (var i=0; i<hobj.scene.item_def.length; i++) {
    if (!hobj.found[i]) {
      hobj.render_item(i);
    }
  }
  
  // animate last item found
  if (hobj.last_item_countdown > 0) {
    // blinking
    if (hobj.last_item_countdown % 10 < 5) {
      hobj.render_item(hobj.last_item_found);       
    }
  }
  
  // animate mistake penalty
  if (hobj.misclick_timer > 0) {
    // blinking
    if (hobj.misclick_timer % 10 > 5) {
      imageset.render(hobj.miss_img, 0, 0, 16, 16, hobj.misclick_pos.x-8, hobj.misclick_pos.y-8);
    }
  }
  
  
  // search list ui
  hobj.render_list();
}

hobj.render_item = function(item_id) {
  imageset.render(hobj.scene.item_img[hobj.scene.item_def[item_id].src_img],
    hobj.scene.item_def[item_id].x,
    hobj.scene.item_def[item_id].y,
    hobj.scene.item_def[item_id].w,
    hobj.scene.item_def[item_id].h,
    hobj.scene.item_def[item_id].x,
    hobj.scene.item_def[item_id].y);
}

hobj.render_list = function() {
  
  if (hobj.list_state == LIST_NONE) return;
  
  var list_pos_x = 0;
  var list_margin_left = 8;
  var list_margin_top = 8;
  var list_line_height = 12;
  
  // render the list unless it's hidden
  if (hobj.list_state != LIST_HIDDEN) {
    if (hobj.list_state == LIST_LEFT) {
      list_pos_x = 0;
    }
    else if (hobj.list_state == LIST_RIGHT) {
      list_pos_x = 140;
    }
    else if (hobj.list_state == LIST_CENTER) {
      list_pos_x = 70; 
    }
    
    // background
    imageset.render(hobj.list_bg_img, 0, 0, 100, 160, list_pos_x, 0);  
    
    // search list
    for (var i=0; i<10; i++) {    
      bitfont.render(hobj.scene.item_def[hobj.search_list[i]].name,
        list_pos_x + list_margin_left,
        list_margin_top + i*list_line_height,
        0);
      
      // scratch out list items if found
      if (hobj.found[hobj.search_list[i]]) {
        var name_length = bitfont.calcwidth(hobj.scene.item_def[hobj.search_list[i]].name);
        imageset.render(hobj.list_scratch_img, 0, list_margin_top + i*list_line_height, list_margin_left + name_length + 2, list_line_height, list_pos_x, list_margin_top + i*list_line_height);
      }
    }
    
  }
  
  // render the list tabs if the option is available
  if (hobj.list_state == LIST_HIDDEN || hobj.list_state == LIST_RIGHT) {
    // show left tab
    imageset.render(hobj.list_tab_img, 0, 0, 34, 13, 0, 0);
  }
  if (hobj.list_state == LIST_HIDDEN || hobj.list_state == LIST_LEFT) {
    // show right tab
    imageset.render(hobj.list_tab_img, 36, 0, 34, 13, 206, 0);
  }
}
