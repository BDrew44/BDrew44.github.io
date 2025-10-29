// TODO 5.d: Replace *my-game-lib* with the name of your game lib
(function (window, opspark, codeParadise) {
  // holds all bodies active in our space //
  const active = [];

  opspark.space = {
    add(...bodies) {
      active.push(...bodies);
      return this;
    },
    remove(body) {
      return active.splice(active.indexOf(body), 1)[0];
    },
    update(event) {
      // loop thru all bodies in the space //
      active.forEach((body) => {
        // ask the body to update its velocity //
        body.update(event);

        /*
         * TODO 8: use your gaming lib to
         * update the position of the body
         */
        // use codeParadise phyz API to update the position based on velocity
        if (
          codeParadise &&
          codeParadise.phyz &&
          typeof codeParadise.phyz.updatePosition === "function"
        ) {
          codeParadise.phyz.updatePosition(body);
        } else if (
          codeParadise &&
          codeParadise.phyz &&
          typeof codeParadise.phyz.update === "function"
        ) {
          // fallback to a generic update if provided
          codeParadise.phyz.update(body);
        }
      });
    },
  };
  // TODO 5.c: Replace *my-game-lib* with the name of your game lib
})(window, window.opspark, window.codeParadise);
