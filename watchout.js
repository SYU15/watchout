// start slingin' some d3 here.
var gameWindow = {
  width: 800,
  height: 600,
  fill: '#888',
  borderColor: '#fff',
  borderWidth: 2
};

var scoreBoard = {
  width: 800,
  height: 60,
  fill: '#555',
  borderColor: '#fff',
  borderWidth: 2
};

var gameObjects = {
  highScore: 0,
  currentScore: 0,
  maxEnemies: 20
};


var player = {
  centerX: gameWindow.width/2,
  centerY: gameWindow.height/2,
  radius: 20,
  fill: '#0000ff',
  borderColor: '#fff',
  borderWidth: 3
};

var enemy = {
  centerX: 0,
  centerY: 0,
  radius: 20,
  fill: '#ff0000',
  borderColor: '#fff',
  borderWidth: 3
};

var currentEnemies = [];
