// stats keeping functionality
// used for levelscreen display

var stats = new Object();

stats.init = function() {  
  stats.framecount = 0;
  stats.timer_active = false;
};

stats.start_timer = function() {
  stats.timer_active = true; 
}

stats.stop_timer = function() {
  stats.timer_active = false; 
}

stats.tick_timer = function() {
  if (stats.timer_active) {
    stats.framecount++;
  }  
}

stats.reset_timer = function() {
  stats.framecount = 0; 
}

stats.frames_to_timestring = function(framecount) {
  var seconds = framecount / 30;  
  var minutes = Math.floor(seconds / 60);
  seconds = Math.floor(seconds % 60);
  
  var strtime = minutes.toString() + ":";  
  if (seconds < 10) strtime += "0";
  strtime += seconds.toString();
  return strtime;    
}

stats.get_time = function() {
  return stats.frames_to_timestring(stats.framecount);
};
