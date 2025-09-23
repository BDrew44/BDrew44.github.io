(function (window, createjs) {
  const canvas = document.getElementById("canvas");
  const stage = new createjs.Stage(canvas);
  createjs.Ticker.framerate = 60;


  const centerX = canvas.width / 2;
  const centerY = canvas.height / 2;

  // make a face
  function makeFace(x, y, size, headColor) {
    const container = new createjs.Container();
    // head
    const head = new createjs.Shape();
    head.graphics.beginFill(headColor || "#00eeffff").drawCircle(0, 0, size);
    // eyes
    const leftEye = new createjs.Shape();
    leftEye.graphics.beginFill("#FFF").drawCircle(0, 0, size * 0.2);
    leftEye.x = -size * 0.37;
    leftEye.y = -size * 0.27;
    const rightEye = new createjs.Shape();
    rightEye.graphics.beginFill("#FFF").drawCircle(0, 0, size * 0.2);
    rightEye.x = size * 0.37;
    rightEye.y = -size * 0.27;
    // Pupils replaced with faces
    let leftMiniFace, rightMiniFace;
    if (size > 10) {
      leftMiniFace = makeFace(leftEye.x, leftEye.y, size * 0.13, "#0105f7"); // blue
      rightMiniFace = makeFace(rightEye.x, rightEye.y, size * 0.13, "#ff0000"); // red
    }
    // mouth
    const mouth = new createjs.Shape();
    mouth.graphics
      .setStrokeStyle(size * 0.04)
      .beginStroke("#31a02dff")
      .arc(0, 0, size * 0.4, Math.PI * 0.1, Math.PI * 0.9);
    mouth.x = 0;
    mouth.y = size * 0.4;
    container.addChild(head, leftEye, rightEye);
    if (leftMiniFace) container.addChild(leftMiniFace);
    if (rightMiniFace) container.addChild(rightMiniFace);
    container.addChild(mouth);
    container.x = x;
    container.y = y;
    return container;
  }

  // main face
  const mainFace = makeFace(centerX, centerY, 150);
  stage.addChild(mainFace);

  // ring 1
  const ring1 = [];
  const ring1Count = 8;
  const ring1Radius = 220;
  for (let i = 0; i < ring1Count; i++) {
    const angle = (i / ring1Count) * Math.PI * 2;
    const face = makeFace(
      centerX + ring1Radius * Math.cos(angle),
      centerY + ring1Radius * Math.sin(angle),
      40
    );
    ring1.push(face);
    stage.addChild(face);
  }

  // ring 2
  const ring2 = [];
  const ring2Count = 14;
  const ring2Radius = 320;
  for (let i = 0; i < ring2Count; i++) {
    const angle = (i / ring2Count) * Math.PI * 2;
    const face = makeFace(
      centerX + ring2Radius * Math.cos(angle),
      centerY + ring2Radius * Math.sin(angle),
      25
    );
    ring2.push(face);
    stage.addChild(face);
  }

  let tick = 0;
  createjs.Ticker.on("tick", function () {
    tick += 0.01;

    const xOffset = Math.sin(tick) * 100;

    // move main face
    mainFace.x = centerX + xOffset;
    mainFace.y = centerY;

    // move ring 1
    for (let i = 0; i < ring1Count; i++) {
      const angle = (i / ring1Count) * Math.PI * 2 + tick;
      ring1[i].x = centerX + ring1Radius * Math.cos(angle) + xOffset;
      ring1[i].y = centerY + ring1Radius * Math.sin(angle);
    }
    // move ring 2
    for (let i = 0; i < ring2Count; i++) {
      const angle = (i / ring2Count) * Math.PI * 2 - tick * 1.3;
      ring2[i].x = centerX + ring2Radius * Math.cos(angle) + xOffset;
      ring2[i].y = centerY + ring2Radius * Math.sin(angle);
    }
    stage.update();
  });
})(window, window.createjs);
