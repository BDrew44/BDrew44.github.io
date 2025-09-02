# Calculating Rotation (calculate-rotation)

### Project Overview

In this quick project, we're going to demonstrate calculating the degrees of an angle between the position of the mouse and our spaceship asset.

In our `update()` Function, we'll constantly calculate the degrees of this angle, then apply these degrees to the rotation of our ship, such that the ship continually turns to face the mouse.

<hr>

#### Key Takeaways
- Using the `stage.mouseX` and `stage.mouseY` properties to get the mouse position.
- Using our `getAngleDegrees()` method from our library to calculate the degrees of an angle.
- Using the `rotation` property of Display Objects to set rotation.

<hr>

#### How to Install / Get Started
- run the command: `os install`, select this class, and follow the prompts to download `calculate-rotation`
- open up the file `index.html` and press **Run**
- open up the file `index.js`

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

#### TODO 0: cd into the directory projects/calc-dist

Go to the command line in Cloud9, `cd` into the project's directory.  If you're in the root of the `workspace`, you can run the command:

```
cd projects/calculate-rotation
```

This will move the command line into the directory `projects/calculate-rotation`.

As always, double-check you're in the correct directory on the command line.  Your command line prompt will show the path to the directory you're currently within.  And, you can always run the commands `ls` or `pwd` to be sure.  If you're not in the directory `~/workspace/projects/calculate-rotation`, then find your way there!


<hr>

#### TODO 1: Install and save your gaming library using bower

Go to the command line in Cloud9, and type the following command, **BUT replace `<my-gaming-lib>` with the name of the gaming library that you published on `bower`**:

```
bower install --save <my-gaming-lib>
```

This will download and install into the directory `bower_components` your gaming library. To insure success, you can check the directory `projects/calculate-rotation/bower_components`, and in there, you should see your library's directory.

<hr>

#### TODO 2: In the index.html file, load your gaming library

Now that your gaming library is downloaded locally, we need to wire it into the application.

Open up the project's `index.html` file, at `projects/calculate-rotation/index.html`.  In this file, go to the `<head>` and find `TODO 2`.  Here, use a `<script>` tag to load your gaming library. In the example below, **replace `my-gaming-lib` with the name of your library**:

```html
    <!-- TODO 2: Load your gaming library using bower (see above examples) -->
    <script src=\"bower_components/my-gaming-lib/index.js\"></script>
</head>
```

Save your changes to `index.html`.

<hr>

#### TODO 3: Pass your gaming library into the index.js module

Now open up the file `index.js`.

**At the very bottom** of the `index.js` file, add your library to the list of dependencies being passed into the `index.js` module. In the example below, you'll change `window.my-game-lib` to `window.` - whatever you named your library.

```javascript
  // OUR MODULE CODE GOES ABOVE HERE //
}(window, window.createjs, window.opspark, window.my-game-lib));
```

<hr>

#### TODO 4: Add a parameter for your gaming library in the index.js module

Now, **at the very top** of the `index.js` file, add a parameter for your library to the list of parameters required by the `index.js` module:

```javascript
// TODO 4: Add a parameter for your gaming library in the index.js module:
(function(window, createjs, opspark, my-game-lib) {
```

Of course, replace `my-game-lib` with the name you've used for your gaming library.  Within the scope of the `index.js` module, this now makes the API of your gaming library available at the variable you named the parameter.

**NOTE:** You'll do these steps, from `TODO 0` through `TODO 4`, many more times in this course, so keep the process in mind...

<hr>

#### TODO 5: Center the ship on the stage

We've already created the ship for your in the starter code with:

```javascript
const ship = assets.makeShip('#4286f4');
```

Note: To `makeShip()`, we're passing a String that represents a [hexadecimal](https://en.wikipedia.org/wiki/Hexadecimal) number, which maps to a color. If you want to choose a different color, try a color picker [like this one](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Colors/Color_picker_tool).

Also, if you want to see how the ship is drawn, open of the file `assets.js` and inspect the code.

But, let's position it on the stage, dead center. We want you to figure this out, and of course, that means setting the `x` and `y` properties of the `ship`. Also, to find the center of the stage, you want to use what properties of the `canvas`?

Find **TODO 5** and center the ship!

<hr>

#### TODO 6: Add the ship as a child of the stage.

We need to add our ship to the `stage` - what API of the `stage` Object do you need to use?

Find **TODO 6** and add the ship as a child of the stage.

**Save your work**, and if you haven't already, run the `index.html` file, open the link to the running app, and check your work - you should see the ship in the center of the stage.

<hr>

#### TODO 7: Calculate the angle degrees

Inside the `update()` Function, you're going to make use of your game library's recently added `getAngleDegrees()` method to calculate the degrees of the angle between the mouse and the ship.

Remember, like your `getDistance()` method, `getAngleDegrees()` takes to points - Objects with `x` and `y` properties.  The `ship` already has `x` and `y` properties, so you can simply pass the ship as the first argument to `getAngleDegrees()`.  BUT, what do you need to do with `stage.mouseX` and `stage.mouseX` to package them for use with `getAngleDegrees()`.

Find **TODO 7** and assign the result of `getAngleDegrees()` to a `const` named `degrees`.

<hr>

#### TODO 8: Assign degrees to the ship's rotation property

Now that you've calculated the degrees of the angle between the ship and the mouse, find **TODO 8** and assign `degree` to `ship.rotation`.

<hr>

#### TODO 9: Uncomment the last line of code in the update() Function

This line uses the `degrees` const you created in **TODO 7**.  Now that `degrees` exists, you can reference it.  Uncomment this line to update the textfield with the current value of the degrees.

```javascript
assets.updateText(textfield, `Degrees: ${ degrees.toFixed(3) }°`, canvas);
```

Save your work, flip back to the app, reload and test your work!
"
