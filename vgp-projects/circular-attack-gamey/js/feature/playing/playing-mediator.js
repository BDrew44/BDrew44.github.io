(function (opspark, _) {
  // create a namespace for the playingMediator //
  _.set(
    opspark,
    "playa.playingMediator",
    /**
     * Creates and returns the playing mediator.
     */
    function (view, game, data) {
      const level = data.levels[data.currentLevel],
        canvas = game.canvas,
        controls = opspark.controlFreak(),
        messenger = opspark.factory.dispatcher(),
        viewManager = opspark.playa
          .viewManager(view.container, messenger)
          .activate(),
        fx = opspark.playa.fx(game, view.container),
        assets = opspark.playa.assets(canvas, fx, level),
        hud = opspark.playa.hud(game, messenger).activate(),
        space = opspark.playa.space(messenger, level),
        ship = opspark.playa
          .ship(
            assets,
            controls,
            messenger,
            opspark.playa.projectile(fx, assets, messenger),
            fx.makePlayerEmitter(),
            level
          )
          .spawn(),
        shipTwo = opspark.playa
          .ship(
            assets,
            controls,
            messenger,
            opspark.playa.projectile(fx, assets, messenger),
            fx.makePlayerEmitter(),
            level
          )
          .setKeyMap({
            UP: controls.KEYS.W,
            LEFT: controls.KEYS.A,
            RIGHT: controls.KEYS.D,
            FIRE: controls.KEYS.SHIFT_LEFT,
          })
          .spawn("#f44242"),
        orb = opspark.playa.orb(assets, fx, messenger).spawn(25);
      // add code to create or spawn power up
      const powerup = opspark.playa.powerup(assets, fx, messenger).spawn(1);
      const activeShields = [];
      const shieldUpdater = {
        update(event) {
          activeShields.forEach((s) => {
            if (s && typeof s.update === "function") s.update(event);
          });
        },
      };
      game.view.addChild(view.container);

      // event handlers here //

      function onPowerupCollect(event) {
        const player = event.incoming;
        if (!player) return;

        const draw = opspark.draw;
        const phyz = opspark.racket.physikz;
        const shields = [];
        const count = 6;
        const orbitRadius = (player.radius || 25) + 16;
        const orbitDuration = 4; // seconds per rotation
        const speed = (Math.PI * 2) / orbitDuration; // radians per second

        for (let i = 0; i < count; i++) {
          const angle = (i / count) * Math.PI * 2;
          const shield = draw.circle(6, "#ff0000");
          // ensure the shield has a radius property for collision tests
          shield.radius = 6;
          shield.integrity = 1;
          Object.assign(
            shield,
            phyz.makeBody("shield", { density: 0.1, volatility: 0.001 })
          );
          shield.type = "shield";
          shield.orbitRadius = orbitRadius;
          shield.orbitAngle = angle;
          shield.orbitSpeed = speed;
          shield.update = function (event) {
            this.orbitAngle +=
              this.orbitSpeed *
              (event && event.delta ? event.delta / 1000 : 0.016);
            this.x = player.x + Math.cos(this.orbitAngle) * this.orbitRadius;
            this.y = player.y + Math.sin(this.orbitAngle) * this.orbitRadius;
            this.velocityX = 0;
            this.velocityY = 0;
          };
          // make shield destroy orbs it collides with (single-use)
          shield.handleCollision = function (impact, body) {
            if (this._dead) return;
            if (!body) return;
            if (body.type === "orb") {
              // don't pool the shield yet; wait until its fade completes
              this._dead = true;
              fx.makeEmitter(2, 3, "rgba(255,0,0,0.3)", null, [
                new Proton.RandomDrift(4, 0, 0.35),
              ]).emit({ x: body.x, y: body.y }, 0.4);
              const createjs = window.createjs;
              // fade out the orb, then remove it from view and pool it
              createjs.Tween.get(body, { override: true })
                .to(
                  { alpha: 0, scaleX: 0.1, scaleY: 0.1 },
                  400,
                  createjs.Ease.linear
                )
                .call(() => {
                  messenger.dispatch({
                    type: "DESPAWN",
                    bodies: [body],
                    source: "shield",
                  });
                  messenger.dispatch({
                    type: "POOL",
                    bodies: [body],
                    source: "shield",
                  });
                  messenger.dispatch({
                    type: "EXPLOSION",
                    source: "shield",
                    target: body,
                    incoming: this,
                  });
                });

              // fade and remove this shield (single-use)
              createjs.Tween.get(this, { override: true })
                .to(
                  { alpha: 0, scaleX: 0.1, scaleY: 0.1 },
                  200,
                  createjs.Ease.linear
                )
                .call(() => {
                  messenger.dispatch({
                    type: "DESPAWN",
                    bodies: [this],
                    source: "shield",
                  });
                  messenger.dispatch({
                    type: "POOL",
                    bodies: [this],
                    source: "shield",
                  });
                });
            }
          };
          shields.push(shield);
        }

        messenger.dispatch({
          type: "SPAWN",
          bodies: shields,
          source: "shield",
        });

        // keep track of spawned shields so the mediator updater can orbit them
        activeShields.push(...shields);

        // remove shields after 10 seconds
        setTimeout(() => {
          messenger.dispatch({
            type: "DESPAWN",
            bodies: shields,
            source: "shield",
          });
          // also remove from activeShields in case DESPAWN isn't processed immediately
          shields.forEach((s) => {
            const i = activeShields.indexOf(s);
            if (i > -1) activeShields.splice(i, 1);
          });
        }, 10000);
      }

      function onPowerupSpawn(event) {
        if (event.source !== "powerup") return;
        if (!activeShields || activeShields.length === 0) return;
        // immediately remove shields from the view container (avoid lingering visuals)
        try {
          view.container.removeChild(...activeShields);
        } catch (e) {}
        // clear local tracking so updater stops processing them
        const toRemove = activeShields.slice();
        activeShields.length = 0;
        // Additionally, scan the view container for any shield instances
        // that might not be tracked in activeShields (robust catch-all).
        try {
          const found = view.container.children.filter(
            (c) => c && c.type === "shield"
          );
          found.forEach((c) => {
            if (toRemove.indexOf(c) === -1) toRemove.push(c);
          });
        } catch (e) {}
        // aggressively clean up each shield: ensure it's removed visually,
        // marked dead, and inform other systems to despawn + pool it.
        toRemove.forEach((s) => {
          try {
            s._dead = true;
            if (s.parent) s.parent.removeChild(s);
            s.alpha = 0;
            s.scaleX = s.scaleY = 0.1;
          } catch (e) {}
          messenger.dispatch({
            type: "DESPAWN",
            bodies: [s],
            source: "shield",
          });
          messenger.dispatch({ type: "POOL", bodies: [s], source: "shield" });
        });
        // Debug log to indicate forced cleanup
        try {
          console.log(
            "[FORCE-CLEANUP] powerup spawned - cleaned shields:",
            toRemove.length
          );
        } catch (e) {}
      }

      function onShieldDespawn(event) {
        if (event.source !== "shield") return;
        event.bodies.forEach((b) => {
          const i = activeShields.indexOf(b);
          if (i > -1) activeShields.splice(i, 1);
        });
      }

      // Temporary lifecycle logger for debugging SPAWN/DESPAWN/POOL ordering
      function logLifecycle(event) {
        try {
          const types = (event.bodies || []).map((b) =>
            b && b.type
              ? b.type
              : String((b && b.constructor && b.constructor.name) || "unknown")
          );
          console.log(
            "[LIFECYCLE]",
            event.type,
            "source=",
            event.source,
            "count=",
            (event.bodies || []).length,
            "types=",
            types
          );
        } catch (e) {
          console.log(
            "[LIFECYCLE]",
            event.type,
            "source=",
            event.source,
            "bodies=",
            event.bodies
          );
        }
      }

      function onExplosion(event) {
        switch (event.source) {
          case "ship":
            messenger.off("EXPLOSION", onExplosion);
            setTimeout(() => game.end({ message: "GAME OVER" }), 2000);
            break;
          case "orb":
            if (orb.getNumberActive() < 1) {
              messenger.off("EXPLOSION", onExplosion);
              setTimeout(() => game.end({ message: "HOT THING" }), 2000);
            }
            break;
        }
      }

      // handle pause key stroke //
      function onKeyDown(event) {
        if (
          (event.metaKey || event.ctrlKey) &&
          String.fromCharCode(event.which).toLowerCase() === "p"
        ) {
          event.preventDefault();
          event.stopPropagation();
          window.removeEventListener("keydown", onKeyDown);
          game.pause();
        }
      }

      /*
       * Return the mediator API: Each mediator must expose its view,
       * a liquify() method used for repositioning components on screen
       * resize, a destroy() method used to clean up any references, and
       * methods enter(), exit(), which must return a Promise that
       * resolves when the enter or exit sequence is complete.
       */
      return {
        view,
        liquify() {
          hud.liquify();
          return view.liquify();
        },
        enter() {
          return new Promise(function (resove, reject) {
            game.stage.enableMouseOver(0);
            window.addEventListener("keydown", onKeyDown);

            view.open();

            controls.activate();
            hud.activate();

            game.addUpdateable(fx, ship, shipTwo, space, shieldUpdater);

            // orbManager.on('EXPLOSION', onOrbExplosion);
            messenger.on("EXPLOSION", onExplosion);
            messenger.on("COLLECT", onPowerupCollect);
            messenger.on("DESPAWN", onShieldDespawn);
            messenger.on("SPAWN", onPowerupSpawn);
            // register lifecycle logging for debugging (use existing on/off API)
            messenger.on("SPAWN", logLifecycle);
            messenger.on("DESPAWN", logLifecycle);
            messenger.on("POOL", logLifecycle);

            resove();
          });
        },
        exit() {
          return new Promise(function (resove, reject) {
            view.close();

            controls.deactivate();
            hud.deactivate();

            game.removeUpdateable(space, ship, shipTwo, fx, shieldUpdater);
            messenger.off("COLLECT", onPowerupCollect);
            messenger.off("DESPAWN", onShieldDespawn);
            messenger.off("SPAWN", onPowerupSpawn);
            // unregister lifecycle logging
            messenger.off("SPAWN", logLifecycle);
            messenger.off("DESPAWN", logLifecycle);
            messenger.off("POOL", logLifecycle);
            game.stage.enableMouseOver(20);
            resove();
          });
        },
        destroy() {
          window.removeEventListener("keydown", onKeyDown);
          messenger.clearHandlers();

          hud.destroy();
          controls.deactivate();
          viewManager.deactivate();
          messenger.off("COLLECT", onPowerupCollect);
          messenger.off("DESPAWN", onShieldDespawn);

          // orbManager.off('EXPLOSION', onOrbExplosion);
          // playerManager.off('EXPLOSION', onPlayerExplosion);

          game.view.removeChild(view.container);
        },
      };
    }
  );
})(window.opspark, window._);
