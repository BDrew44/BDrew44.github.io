(function (window, opspark, racket) {
  console.log("collision/index.js loaded");
  let engine,
    canvas,
    stage,
    assets,
    controls,
    messenger,
    view,
    orbManager,
    playerOne,
    playerTwo,
    space;
  try {
    engine = opspark.V6().activateResize();
    canvas = engine.getCanvas();
    stage = engine.getStage();
    assets = opspark.assets(canvas);
    controls = opspark.controlFreak();
    // try to use the shared factory dispatcher if available, otherwise create a small fallback
    if (opspark.factory && typeof opspark.factory.dispatcher === "function") {
      messenger = opspark.factory.dispatcher();
      console.log("using opspark.factory.dispatcher()");
    } else {
      console.warn(
        "opspark.factory.dispatcher() not found — using fallback messenger"
      );
      messenger = (function () {
        const handlers = {};
        return {
          on(type, fn) {
            (handlers[type] = handlers[type] || []).push(fn);
          },
          off(type, fn) {
            if (!handlers[type]) return;
            if (!fn) {
              delete handlers[type];
              return;
            }
            const i = handlers[type].indexOf(fn);
            if (i > -1) handlers[type].splice(i, 1);
          },
          dispatch(event) {
            const list = (handlers[event.type] || []).slice();
            list.forEach((fn) => {
              try {
                fn(event);
              } catch (err) {
                console.error("messenger handler error", err);
              }
            });
          },
          clearHandlers() {
            for (const k in handlers) delete handlers[k];
          },
        };
      })();
    }
    view = opspark.viewManager(stage, messenger);
    orbManager = opspark.orbManager(assets, messenger);
    playerOne = opspark.shipManager(assets, controls, messenger);
    // create a second player using the same ship-manager API
    playerTwo = opspark.shipManager(assets, controls, messenger);
    space = opspark.space(messenger);
  } catch (err) {
    console.error("Error initializing collision engine:", err);
    // rethrow so the console stack shows location, but keep the log for easier debugging
    throw err;
  }

  console.log("collision engine initialized OK");

  orbManager.spawn(15);
  playerOne.spawn();
  // spawn playerTwo with a different color and set its key map to W/A/D
  playerTwo.setKeyMap({
    UP: controls.KEYS.W,
    LEFT: controls.KEYS.A,
    RIGHT: controls.KEYS.D,
  });
  playerTwo.spawn("#e84c3c");

  controls.activate();

  const fps = opspark.draw.fps("#000");
  stage.addChild(fps);

  engine
    .addTickHandlers(
      fps.update,
      space.update,
      playerOne.update,
      playerTwo.update
    )
    .activateTick();
})(window, window.opspark, window.opspark.racket);
