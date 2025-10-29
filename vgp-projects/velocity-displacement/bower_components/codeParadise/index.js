(function (window, _) {
  window.codeParadise = window.codeParadise || {
    numz: {
      calculateDistance(player1, player2) {
        let distanceX = player1.x - player2.x;
        let distanceY = player1.y - player2.y;
        return Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      },
    },
    phyz: {
      makeBody(type) {
        // minimal body factory: returns basic physical properties and helpers
        return {
          type: type,
          velocityX: 0,
          velocityY: 0,
          mass: 1,
          // updatePosition moves the body by its velocity
          updatePosition(body) {
            if (typeof body.x === "number") body.x += body.velocityX;
            if (typeof body.y === "number") body.y += body.velocityY;
          },
          // updateVelocity applies simple damping and propulsion if present
          updateVelocity(body, forceX = 0, forceY = 0) {
            // acceleration = force / mass
            const ax = forceX / (body.mass || 1);
            const ay = forceY / (body.mass || 1);
            body.velocityX = (body.velocityX || 0) + ax;
            body.velocityY = (body.velocityY || 0) + ay;
            // simple damping
            body.velocityX *= 0.99;
            body.velocityY *= 0.99;
          },
        };
      },
      // convenience wrapper for updating position of a body
      updatePosition(body) {
        if (body && typeof body.x === "number") {
          body.x += body.velocityX || 0;
          body.y += body.velocityY || 0;
        }
      },
    },
  };

  var player1 = { x: 2, y: 1 };
  var player2 = { x: 5, y: 5 };
})(window, window._);
