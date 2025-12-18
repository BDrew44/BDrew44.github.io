// TODO 4: add a param for your game lib last //
(function (window, createjs, opspark, codeParadise) {
  console.log("index.js initialized!");

  const assets = opspark.assets,
    engine = opspark.V6().activateResize(),
    canvas = engine.getCanvas(),
    stage = engine.getStage(),
    textfield = assets.makeTextfield("Degrees: ");

  stage.addChild(textfield);

  // try a different hex color if you want //
  const ship = assets.makeShip("#4286f4");

  // TODO 5: Center the ship on the stage //
  ship.x = canvas.width / 2;
  ship.y = canvas.height / 2;

  // TODO 6: Add the ship to the stage //
  stage.addChild(ship);
  // create a second ship that will follow the mouse
  const shipB = assets.makeShip("#f44242");
  // start the second ship slightly to the right
  shipB.x = canvas.width / 2 + 120;
  shipB.y = canvas.height / 2;
  stage.addChild(shipB);

  // --- Ship random movement state ---
  let shipTarget = { x: ship.x, y: ship.y };
  let shipStart = { x: ship.x, y: ship.y };
  let shipMoveStart = 0;
  let shipMoving = false;
  let shipMoveDuration = 1.0; // seconds
  function pickRandomShipTarget() {
    shipStart = { x: ship.x, y: ship.y };
    shipTarget = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    };
    shipMoveStart = Date.now() / 1000;
    shipMoving = true;
  }
  setInterval(pickRandomShipTarget, 5000);
  // prefer the library implementation but fall back to a local one
  const getAngleDegrees =
    (codeParadise && codeParadise.numz && codeParadise.numz.getAngleDegrees) ||
    (codeParadise && codeParadise.getAngleDegrees) ||
    function (a, b) {
      const dx = (b.x || 0) - (a.x || 0);
      const dy = (b.y || 0) - (a.y || 0);
      const rad = Math.atan2(dy, dx);
      return (rad * 180) / Math.PI;
    };
  function update(event) {
    // --- Animate ship to its target over 1s ---
    if (shipMoving) {
      const now = Date.now() / 1000;
      const t = Math.min(1, (now - shipMoveStart) / shipMoveDuration);
      ship.x = shipStart.x + (shipTarget.x - shipStart.x) * t;
      ship.y = shipStart.y + (shipTarget.y - shipStart.y) * t;
      if (t >= 1) shipMoving = false;
    }
    /*
     * TODO 7: Use your game lib's getAngleDegrees to get
     * the degrees of the angle between the ship and the
     * mouse position, and assign it to a const called
     * degrees.
     *
     * Remember, the (x, y) location of the mouse is available
     * stage.mouseX and stage.mouseY, BUT, your getAngleDegrees()
     * method takes two points. What do you need to do to translate
     * these values such that they're packed into a point?
     */
    // move shipB toward the mouse (simple linear speed)
    const dt = event && event.delta ? event.delta / 1000 : 0.016;
    const mx = stage.mouseX || 0;
    const my = stage.mouseY || 0;
    const dx = mx - shipB.x;
    const dy = my - shipB.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
    const speed = 220; // px/sec
    const move = Math.min(speed * dt, dist);
    if (dist > 1) {
      shipB.x += (dx / dist) * move;
      shipB.y += (dy / dist) * move;
    }

    // make both ships point at each other
    const degreesToB = getAngleDegrees(ship, shipB);
    ship.rotation = degreesToB;
    const degreesToA = getAngleDegrees(shipB, ship);
    shipB.rotation = degreesToA;
    const degrees = degreesToB;
    /*
     * TODO 9: Uncomment the line below to update the textfield
     * with the current angle degrees. Degrees will be a value
     * between π and -π, or, 180 and -180.
     */
    assets.updateText(textfield, `Degrees: ${degrees.toFixed(3)}°`, canvas);
  }

  engine.addTickHandlers(update).activateTick();

  // TODO 3: pass your game lib last with, window.my-game-lib //
})(window, window.createjs, window.opspark, window.codeParadise);
