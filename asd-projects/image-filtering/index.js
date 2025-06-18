// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilter(reddify);
  applyFilter(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2, 3 & 5: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var row = 0; row < image.length; row++) {
    for (var col = 0; col < image[row].length; col++) {
      var pixel = image[row][col];
      var pixelArray = rgbStringToArray(pixel);
      filterFunction(pixelArray);
      var updatedPixel = rgbArrayToString(pixelArray);
      image[row][col] = updatedPixel;
    }
  }
}

// TODO 6: Create the keepInBounds function
function keepInBounds(num1) {
  return num1 < 0 ? 0 : num1 > 255 ? 255 : num1; // If num1 is less than 0, return 0
}
console.log(keepInBounds(-20)); // should print 0
console.log(keepInBounds(300)); // should print 255
console.log(keepInBounds(125)); // should print 125

// TODO 4: Create reddify filter function
function reddify(pixel) {
  const RED = 0;
  pixel[RED] = 200;
}
var testArray = [100, 100, 100];
reddify(testArray);
console.log(testArray); // Should show [200, 100, 100]
// TODO 7 & 8: Create more filter functions
function decreaseBlue(pixelArray) {
  const BLUE = 2;
  pixelArray[BLUE] = keepInBounds(pixelArray[BLUE] - 50);
}
function increaseGreenByBlue(pixelArray) {
  const GREEN = 1;
  const BLUE = 2;
  pixelArray[GREEN] = keepInBounds(pixelArray[GREEN] + pixelArray[BLUE]);
}
// TODO 9: Write a new function that applies a filter to every pixel except those matching the background color (the top-left pixel).
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = image[0][0];
  for (var row = 0; row < image.length; row++) {
    for (var col = 0; col < image[row].length; col++) {
      var pixel = image[row][col];
      if (pixel !== backgroundColor) {
        var pixelArray = rgbStringToArray(pixel);
        filterFunction(pixelArray);
        var updatedPixel = rgbArrayToString(pixelArray);
        image[row][col] = updatedPixel;
      }
    }
  }
}

// CHALLENGE code goes below here
