/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
  };

  var walker = {
    positionX: 0, // initial x position of the walker
    positionY: 0, // initial y position of the walker
    speedX: 0, // initial speed in x direction
    speedY: 0, // initial speed in y direction
  };

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on("keydown", handleKeyDown); // use the correct handler name
  $(document).on("keyup", handleKeyUp); // use the correct handler name
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  function newFrame() {
    repositionGameItem(); // update the position of walker based on its speed
    redrawGameItem(); // update the position of walker
    wallCollision(); // check for wall collisions
  }

  /* 
  Called in response to events.
  */
  function handleKeyDown(event) {
    if (event.which === KEY.ENTER) {
      console.log("enter pressed");
    } else if (event.which === KEY.LEFT) {
      console.log("left pressed");
    } else if (event.which === KEY.RIGHT) {
      console.log("right pressed");
    } else if (event.which === KEY.UP) {
      console.log("up pressed");
    } else if (event.which === KEY.DOWN) {
      console.log("down pressed");
    } else {
      console.log("unhandled key pressed: " + event.which);
    }

    if (event.which === KEY.LEFT) {
      walker.speedX = -5; // move left
      walker.speedY = 0; // no vertical movement
    } else if (event.which === KEY.RIGHT) {
      walker.speedX = 5; // move right
      walker.speedY = 0; // no vertical movement
    } else if (event.which === KEY.UP) {
      walker.speedX = 0; // no horizontal movement
      walker.speedY = -5; // move up
    } else if (event.which === KEY.DOWN) {
      walker.speedX = 0; // no horizontal movement
      walker.speedY = 5; // move down
    } else {
      walker.speedX = 0; // stop horizontal movement
      walker.speedY = 0; // stop vertical movement
    }
  }
  function handleKeyUp(event) {
    if (event.which === KEY.LEFT || event.which === KEY.RIGHT) {
      walker.speedX = 0; // stop horizontal movement
    } else if (event.which === KEY.UP || event.which === KEY.DOWN) {
      walker.speedY = 0; // stop vertical movement
    }
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

function wallCollision() {
  // Prevent walker from leaving the left or right walls
  if (walker.positionX < 0) {
    walker.positionX = 0;
    walker.speedX = 0;
  } else if (walker.positionX > $("#board").width() - $("#walker").width()) {
    walker.positionX = $("#board").width() - $("#walker").width();
    walker.speedX = 0;
  }

  // Prevent walker from leaving the top or bottom walls
  if (walker.positionY < 0) {
    walker.positionY = 0;
    walker.speedY = 0;
  } else if (walker.positionY > $("#board").height() - $("#walker").height()) {
    walker.positionY = $("#board").height() - $("#walker").height();
    walker.speedY = 0;
  }
}
  function repositionGameItem() {
    // reposition the game item based on its speed and position
    walker.positionX += walker.speedX;
    walker.positionY += walker.speedY;
  }

  function redrawGameItem() {
    // update the position of the game item in the DOM
    $("#walker").css({
      left: walker.positionX + "px",
      top: walker.positionY + "px",
    });
  }

  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
