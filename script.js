// CHANGE LENGTH OF SESSIONS
  // Decrease or increase by minute the timer for each activity; prevent negative and null times, sessions longer than thirty minutes.
function lessWork() {
      work.innerHTML--;
        if (work.innerHTML <= 1) {work.innerHTML = 1;}
}
function moreWork() {
      work.innerHTML++;
        if (work.innerHTML >= 30) {work.innerHTML = 30;}
}
function lessPlay() {
      play.innerHTML--;
        if (play.innerHTML <= 1) {play.innerHTML = 1;}
}
function morePlay() {
      play.innerHTML++;
        if (play.innerHTML >= 30) {play.innerHTML = 30;}
}

///// ALARM SOUND
function soundAlarm() {
  var sound = document.getElementById("alarm");
  sound.play();
}
//// DEFAULT STATES
  // timerOn, used in timerToggle, prevents two startTimer functions from running at once
 var timerOn = false;
  // working, used in pomodoro >> setInterval, switches between workTime and playTime counts
 var working = true;
  // paused, used in pauseTimer and pomodoro,
 var paused = false;

//// TIMER SETUP
function pomodoro(time, nextTime) {
var timer = time, min, sec;
    activity.innerHTML = "keep working";
      if (paused === true) {
      timer = pauseTime;
      activity.innerHTML = pauseActivity;
      pauseicon.innerHTML="pause";
      paused = false;
    }
  ////////// TIMER SETUP
 countdownContent =  setInterval(function() {
      min = parseInt(timer / 60, 10);
      sec = parseInt(timer % 60, 10);
            // add zero if single digit
            if (sec <= 9) {sec = "0" + sec;}
            if (min <= 9) {min = "0" + min;}
            // end add zero
      countdown.innerHTML = min + ":" + sec;
      if (--timer < 0) {
        soundAlarm();
        if (working === true) {
          timer = nextTime;
          activity.innerHTML = "playtime!";
          working = false;
        }
        else {
          timer = time;
          activity.innerHTML = "keep working";
          working = true;
        }
      }
    }, 1000);
}
//////////// END TIMER SETUP

 function startTimer() {
  workTime = (60 * work.innerHTML) - 1;
  playTime = (60 * play.innerHTML) - 1;
   pomodoro(workTime, playTime)
}
 
 function pauseTimer () {
   if (paused === false && countdown.innerHTML !== "start") {
  pauseTime = countdown.innerHTML;
     //this is taking as string
  pauseActivity = activity.innerHTML;
  clearInterval(countdownContent);       countdown.innerHTML = pauseTime;
  activity.innerHTML = "paused";
  pauseicon.innerHTML = "play_arrow";
  pauseTime = pauseTime.split(":");
  pauseTime = parseInt((pauseTime[0] * 60)) + parseInt(pauseTime[1]) - 1;
  paused = true;
   }
   else {
     startTimer();
     pauseicon.innerHTML = "pause";
     paused = false;
   }
 }
 
 function stopTimer () {
   clearInterval(countdownContent);
   activity.innerHTML = "get to work";
   countdown.innerHTML = "start";
   timerOn = false;
 }

function toggleTimer () {
  if (timerOn === false) {
    startTimer();
    timerOn = true;
  }
  else {
    pauseTimer();
    timerOn = false;
  }
}
/////////// END CALL TIMER

/*
FUNCTIONS
-set workTime
-set playTime

-start timer
--when started, disable clicking "start" span
--loop between work and play times
--play sound on switch


-pause timer
--when active, turn pause button into resume
-resume timer
--when active, turn resume button into pause

-stop timer

initiate function on click
take minute variable from work/play buttons

if play, play button should be replaced by pause and stop (rest) buttons

*/