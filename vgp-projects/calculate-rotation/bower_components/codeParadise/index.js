(function(window, _) {
  window.codeParadise = window.codeParadise || {
    numz: {
      calculateDistance(player1, player2){
  let distanceX = player1.x - player2.x
  let distanceY = player1.y - player2.y
  return Math.sqrt (distanceX * distanceX + distanceY * distanceY)
      }
    },
    phyz: {},
  };

var player1 = { x: 2, y: 1 };
var player2 = { x: 5, y: 5 };

}(window, window._));