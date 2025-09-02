# Collision (collision)

### Project Overview

Our mission in this project is to code the collision detection and collision response mechanics.

You won't need to import your gaming library for this project, but consider how you might abstract some of the methods you code to deal with collision.

<hr>

#### Key Takeaways
- A more modularized application, including modules for adding and removing Display Objects to/from the Stage, capturing keyboard strokes, and better space management.
- Have a look at the decoupled communication between modules, aided by the use of an event dispatcher, shared between modules as the `messenger` parameter.
- Calculating the distance between circular bodies.
- Hit testing on circular bodies.
- Calculating a spring-to point.
- Calculating the velocity needed to reach the spring-to point.
- Dampening the spring effect.
- Appying and inversely applying this velocity such that bodies spring away from each other on collision.

<hr>

#### How to Install / Get Started
- From the `workspace` directory, run the command:`os install`, select this class, and follow the prompts to download `Collision`
- open up the file `index.html` and press **Run**
- open up the file `space.js`

<hr>

#### How to work on this project
**Starter Code**
We've put some of the code in place for you, such that you can focus on solving the problem at hand.

<hr>

**Where to code**
All of the code you'll write for this project will be in `index.js` and *where* you write your code will be identified by comments labeled by a TODO number: `// TODO X: Instructions`.

* Always write your code for the particular  `TODO` immediately below the `TODO` comment.
* Any other comment NOT marked with a numbered `TODO` is a comment to help explain what the code is doing.

<hr>

**Guided Notes**
There are no guided notes for this project.

<hr>

### TODOs

We're going to code the hit dectection for our bodies. All our bodies are circular, so they are perfect for distance based collision dectection, using the `body.radius` property.

All TODO's are within the `space.js` file.

<hr>

#### TODO 1: Calculate hit test components

Let's first create all the variables we'll need to calculate the `distance` and `minimumDistance`. With these values, you'll be able to compare the actual distance of the two bodies being compared to their combined radii.

You'll need to make use of the Pythagorean Theorem, so dust that one off.  We'll give you a head start, you'll need:

* `distanceX`
* `distanceY`
* `distance`
* `minimumDistance`

You know what to do...

<hr>

#### TODO 2: Do collision check: how do we know if bodies are colliding?

Under **TODO 2**, within the parentheses of the `if()` statement, replace the comment **and the false** value, and code the collision
check. Remember the `doRadiiHitTest()` exercise?  Same thing here.

```javascript
if(/* replace with collision check */ false) {
  // console.log('hit!');
  // other code...
}
```

To test your results, within the `if()` block, uncomment the line:

```javascript
  // console.log('hit!');
```
Save your work! Return the the app and refresh, and watch the bodies for collision. If you've coded the hit test correctly, when bodies intersect, the console should print `hit!`.

Once you've got this working, comment-out the `console.log('hit!');` statement.  Printing to the console can create a significant loss in performance.  This may be noticeable in a drop to the `FPS` value being printed to the top left of the screen.  We want to keep the `FPS` to near `60`.

<hr>

#### TODO 3: Calculate springToX and springToY

With the code block of the `if()` statement, we've got a hit, so we need to next calculate `springToX` and `springToY` point.  To do this, we first need to calculate the `angle` of approach between `bodyB` and `bodyA`.

To do this, we use `Math.atan2()`.

Remember that `Math.atan2()` takes two arguments, `distanceY` first, and `distanceX` second.  You've already calculated `distanceY` and `distanceX` in **TODO 1**, so these variables are already in your scope.  Pass these to `Math.atan2()` to get the `angle`.

Once you've calcuated the `angle`, we need to calcuate `springToX` and `springToY`.

For `springToX`: 
* Use `Math.cos(angle)` to get the percentage of the `x` distance in relation to a hypotenuse of `1`.
* Then, multiply this by our `minimumDistance`.  This gives you the length on `x`, but not the location of `springToX`.
* We must add this length to `bodyA.x` to get the actual location of `springToX`.

For `springToY`:
* Use `Math.sin(angle)` to get the percentage of the `y` distance in relation to a hypotenuse of `1`.
* Then, multiply this by our `minimumDistance`.  This gives you the length on `y`, but not the location of `springToY`.
* We must add this length to `bodyA.y` to get the actual location of `springToY`.

<hr>

#### TODO 4: Calculate acceleration to spring-to point, factor in dampeningForce

To get the `accelerationOnX` for `bodyB`, we subtract `bodyB.x` from `springToX` and then multiply the result of that subtraction by the `dampeningForce`.  The `dampeningForce` variable is already created at the top of the space module.

This gives us how many pixels on the `x` axis we must move `bodyB` to accelerate to `springToX` on the next `tick`.

To get the `accelerationOnY` for `bodyB`, we subtract `bodyB.y` from `springToY` and then multiply the result of that subtraction by the `dampeningForce`.

This gives us how many pixels on the `y` axis we must move `bodyB` to accelerate to `springToY` on the next `tick`.

If you've done everything correctly up to this point, you should have additionally values for:

* `angle`
* `springToX`
* `springToY`
* `accelerationOnX`
* `accelerationOnY`

<hr>

#### TODO 5: Apply acceleration to bodyB

To update the velocity of `bodyB`, we add `accelerationOnX` to `bodyB.velocityX` and add `accelerationOnY` to `bodyB.velocityY`.

<hr>

#### TODO 6: Apply inverse acceleration to bodyA

To apply this acceleration to `bodyA`, we simply subtract the acceleration values from the velocity of `bodyA`.

Save your work and test the app!  Your bodies should now collide with a nice cushy springing effect!

<hr>

#### TODO Infinity: Extra Credit

Open in the `index.js` file, and study the pattern for creating `playerOne`. Note everywhere `playerOne` is used in the `index.js` file.  Following this pattern, how can you create a `playerTwo` with a different color and using keys `W`, `A` and `D` for `propulsion`, right and left rotation?

You may want to open up the `ship-manager.js` file and study its API.

We'll help you out on the keyboard mapping for `playerTwo`. The `ship-manager` module exposes an API called `setKeyMap()` that allows you to set the keys to control the ship. Once you've created `playerTwo` and set everything else up, try the following:

```javascript
playerTwo.setKeyMap({UP: controls.KEYS.W, LEFT: controls.KEYS.A, RIGHT: controls.KEYS.D});
```

Now you and your bud can bounce around the screen together!
