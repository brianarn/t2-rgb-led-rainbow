var five = require('johnny-five');
var Tessel = require('tessel-io');
var board = new five.Board({
  io: new Tessel()
});

board.on('ready', function () {
  var rgb = new five.Led.RGB({
    pins: ['A5', 'B5', 'B6'],
    isAnode: true
  });

  // Start with red
  var colors = [255, 0, 0];
  rgb.color(colors);

  // Color names by indexing, for easier logging output
  var colorNames = ['red', 'green', 'blue'];

  // Determine which colors to be incrementing/decrementing
  // as indexes into the colors array. We'll start with red/green.
  var decColor = 0;
  var incColor = 1;
  console.log('Now decrementing %s, incrementing %s', colorNames[decColor], colorNames[incColor]);

  // Set up our next determination.
  function nextColor() {
    // If our increment is up at 255, it's time to change up
    // who's incrementing/decrementing.
    if (colors[incColor] >= 255) {
      decColor = incColor;
      incColor = (incColor + 1) % 3;
      console.log('Now decrementing %s, incrementing %s', colorNames[decColor], colorNames[incColor]);
    }

    // Do our decrement/increment and display it.
    colors[decColor]--;
    colors[incColor]++;
    rgb.color(colors);
  }

  // Start it up
  setInterval(nextColor, 10);
});
