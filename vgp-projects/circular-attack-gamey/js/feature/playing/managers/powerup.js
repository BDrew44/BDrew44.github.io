(function (window, opspark, _) {
  const Proton = window.Proton;

  // create a namespace for the powerup manager //
  _.set(
    opspark,
    "playa.powerup",
    /**
     * Creates and returns the powerup manager.
     */
    function (assets, fx, messenger) {
      const active = [],
        objects = [],
        timeouts = [],
        pool = {
          active,
          objects,

          get: function () {
            if (objects.length > 0) {
              return objects.pop();
            }
            return makeObject();
          },

          recycle: function (object) {
            messenger.dispatch({
              type: "POOL",
              bodies: [object],
              source: "powerup",
            });
            // remove object from the active Array //
            const i = active.indexOf(object);
            if (i > -1) {
              active.splice(i, 1);
            }

            // reset and pool the object off the stage //
            object.x = -object.width;
            object.alpha = 1;
            object.scaleX = object.scaleY = 1;
            objects.push(object);
          },
        },
        powerupManager = {
          getNumberActive() {
            return active.length;
          },
          spawn(number = 1) {
            const spawned = [];
            for (let i = 0; i < number; i++) {
              spawned.push(pool.get());
            }
            // randomize spawn positions (use window size as canvas proxy)
            spawned.forEach((b) => {
              b.x = Math.round(Math.random() * window.innerWidth);
              b.y = Math.round(Math.random() * window.innerHeight);
            });
            active.push(...spawned);
            messenger.dispatch({
              type: "SPAWN",
              bodies: spawned,
              source: "powerup",
            });
            return this;
          },
          destroy() {
            // clear any pending respawn timers
            while (timeouts.length) {
              clearTimeout(timeouts.pop());
            }
          },
        };

      function makeObject() {
        const powerup = assets.makePowerUp();
        powerup.handleCollision = handleCollision;
        return powerup;
      }

      function handleCollision(impact, body) {
        // don't handle collisions between powerups //
        if (body.type === this.type) return;
        // this = powerup
        // body = obstacle or player
        // if the player collected the powerup, recycle it immediately
        if (body.type === "ship") {
          fx.makeEmitter(2, 4, "rgba(255,255,255,0.3)", null, [
            new Proton.RandomDrift(6, 0, 0.35),
          ]).emit({ x: this.x, y: this.y }, 0.4);
          pool.recycle(this);
          messenger.dispatch({
            type: "COLLECT",
            source: "powerup",
            target: this,
            incoming: body,
          });
          // schedule respawn after 10 seconds
          const id = setTimeout(() => {
            try {
              powerupManager.spawn(1);
            } catch (e) {
              /* ignore if manager gone */
            }
          }, 10000);
          timeouts.push(id);
          return;
        }
        /*
         * Because the explosion is async, the powerup may exist
         * but have already exploded, so check first to see
         * if it has integrity before running check to exlode.
         */
        if (this.integrity > 0) {
          console.log(impact);
          this.integrity -= impact;
          if (this.integrity <= 0) {
            fx.makeEmitter(2, 3, "rgba(214, 36, 84, 0.2)", null, [
              new Proton.RandomDrift(5, 0, 0.35),
            ]).emit({ x: this.x, y: this.y }, 0.5);
            pool.recycle(this);
            messenger.dispatch({
              type: "EXPLOSION",
              source: "powerup",
              target: this,
              incoming: body,
            });
          }
        }
      }

      // return powerup manager api //
      return powerupManager;
    }
  );
})(window, window.opspark, window._);
