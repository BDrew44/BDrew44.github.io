(function (window, createjs, opspark, _) {
  // Variable declarations for libraries and the game engine
  const draw = opspark.draw; // library for drawing using createJS
  const physikz = opspark.racket.physikz; // library for defining physics properties like velocity
  const engine = opspark.V6().activateResize(); // game engine for actively rendering + running the game's mechanics
  const canvas = engine.getCanvas(); // object for referencing the height / width of the window
  const stage = engine.getStage(); // object to hold all visual components

  // load some sounds for the demo - play sounds using: createjs.Sound.play("wall");
  createjs.Sound.on("fileload", handleLoadComplete);
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.registerSounds(
    [
      { src: "hit.ogg", id: "hit" },
      { src: "wall.ogg", id: "wall" },
    ],
    "assets/sounds/"
  );

  function handleLoadComplete(event) {
    console.log("sounds loaded");
  }

  engine
    .addTickHandlers(update) // establish the update function as the callback for every timer tick
    .activateTick();

  // Variable declarations for the paddles, ball, and score display
  const paddlePlayer = createPaddle();
  const paddleCPU = createPaddle({
    x: canvas.width - 30,
    y: canvas.height - 100,
  });
  const ball = draw.circle(20, "#CCC");
  let playerScore = 0;
  let cpuScore = 0;
  const txtScore = draw.textfield(
  `Player: ${playerScore}  AI: ${cpuScore}`,
    "bold 24px Arial",
    "#000000ff",
    "center",
    "top",
    canvas.width / 2,
    30
  );

  // set initial properties for the paddles
  paddlePlayer.yVelocity = 0;
  paddleCPU.yVelocity = 6;

  // set initial properties for the ball
  ball.x = canvas.width / 2;
  ball.y = canvas.height / 2;
  ball.xVelocity = 5;
  ball.yVelocity = 5;

  // add the paddles, ball, and score to the view
  stage.addChild(paddlePlayer, paddleCPU, ball, txtScore);

  document.addEventListener("keyup", onKeyUp);
  document.addEventListener("keydown", onKeyDown);

  // when an Arrow key is pressed down, set the paddle in motion
  function onKeyDown(event) {
    if (event.key === "ArrowUp") {
      paddlePlayer.yVelocity = -5;
    } else if (event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 5;
    }
  }

  // when either the Arrow Up or Arrow Down key are released, stop the paddle from moving
  function onKeyUp(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      paddlePlayer.yVelocity = 0;
    }
  }

  function update(event) {
    const boundsCPU = paddleCPU.getBounds();
    const widthCPU = boundsCPU.width;
    const heightCPU = boundsCPU.height;
    const midCPU = heightCPU / 2;
    const boundsPlayer = paddlePlayer.getBounds();
    const widthPlayer = paddlePlayer.width;
    const heightPlayer = paddlePlayer.height;

    // Ball movement: the xVelocity and yVelocity is the distance the ball moves per update
    ball.x = ball.x + ball.xVelocity;
    ball.y = ball.y + ball.yVelocity;

    // Player movement //
    paddlePlayer.y += paddlePlayer.yVelocity;
    if (paddlePlayer.y < 0) {
      paddlePlayer.y = 0;
    }
    if (paddlePlayer.y > canvas.height - paddlePlayer.height) {
      paddlePlayer.y = canvas.height - heightPlayer;
    }

    // AI movement: CPU follows ball //
    if (paddleCPU.y + midCPU < ball.y - 14) {
      paddleCPU.y += paddleCPU.yVelocity;
    } else if (paddleCPU.y + midCPU > ball.y + 14) {
      paddleCPU.y -= paddleCPU.yVelocity;
    }
    // if the hard coded value of 14 is lowered, the AI will be more accurate
    // if the hard coded value of 14 is increased, the AI will be less accurate

    // Bounce the ball off the top and bottom walls only
    if (ball.y <= 0 + 10) {
      ball.yVelocity = -ball.yVelocity;
      createjs.Sound.play("wall");
    } else if (ball.y >= canvas.height - 10) {
      ball.yVelocity = -ball.yVelocity;
      createjs.Sound.play("wall");
    }

    // Bounce the ball off each of the paddles
    if (
      ball.x <= widthPlayer + 10 &&
      ball.y >= paddlePlayer.y &&
      ball.y <= paddlePlayer.y + heightPlayer
    ) {
      ball.xVelocity = -ball.xVelocity;
      createjs.Sound.play("hit");
    } else if (
      ball.x >= canvas.width - widthCPU - 10 &&
      ball.y >= paddleCPU.y &&
      ball.y <= paddleCPU.y + heightCPU
    ) {
      ball.xVelocity = -ball.xVelocity;
      createjs.Sound.play("hit");
    }

    // Score and reset the ball if it goes past the left or right side of the screen
    if (ball.x <= 0 - 10) {
  cpuScore++;
  txtScore.text = `Player: ${playerScore}  AI: ${cpuScore}`;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.xVelocity = Math.abs(ball.xVelocity); // always send ball to the right after reset
    } else if (ball.x >= canvas.width + 10) {
  playerScore++;
  txtScore.text = `Player: ${playerScore}  AI: ${cpuScore}`;
      ball.x = canvas.width / 2;
      ball.y = canvas.height / 2;
      ball.xVelocity = -Math.abs(ball.xVelocity); // always send ball to the left after reset
    }
  }

  // helper function that wraps the draw.rect function for easy paddle making
  function createPaddle({
    width = 20,
    height = 100,
    x = 0,
    y = 0,
    color = "#CCC",
  } = {}) {
    const paddle = draw.rect(width, height, color);
    paddle.x = x;
    paddle.y = y;
    return paddle;
  }
})(window, window.createjs, window.opspark, window._);
