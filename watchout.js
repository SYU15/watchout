// start slingin' some d3 here.
var gameWindow = {
  width: 800,
  height: 600,
  // fill: '#888',
  // borderColor: '#fff',
  // borderWidth: 2
};

// var scoreBoard = {
//   width: 800,
//   height: 60,
//   fill: '#555',
//   borderColor: '#fff',
//   borderWidth: 2
// };

var gameOptions = {
  highScore: 0,
  currentScore: 0,
  maxEnemies: 20,
  speed: 3000
};


var player = {
  centerX: gameWindow.width/2,
  centerY: gameWindow.height/2,
  radius: 15,
  fill: '#0000ff',
  borderColor: '#000',
  borderWidth: 3
};

var enemy = {
  centerX: 0,
  centerY: 0,
  radius: 15,
  fill: '#ff0000',
  borderColor: '#000',
  borderWidth: 3,
  enemyId: 0,

};

var gameWindowSvg = d3.select(".gamewindow").append("svg")
  .attr("width",gameWindow.width)
  .attr("height",gameWindow.height);

var dragMove = function(){
  d3.select(this)
  .attr("transform", "translate(" + d3.event.x + "," + d3.event.y +")");
};

var drag = d3.behavior.drag()
  .on("drag", dragMove);

var playerSvg = function(){
  gameWindowSvg.append("circle")
  .attr("cx",0)
  .attr("cy",0)
  .attr("r",player.radius)
  .attr("fill",player.fill)
  .attr("stroke",player.borderColor)
  .attr("stroke-width",player.borderWidth)
  .attr("class","player")
  .attr("transform", "translate(" + player.centerX + "," + player.centerY +")")
  .call(drag)
};

var populatePlayers = function(){
  playerSvg();
}

var enemySvg = function() {
  gameWindowSvg.append("circle")
  .attr("cx", Math.floor(Math.random() * gameWindow.width * 0.8))
  .attr("cy",Math.floor(Math.random() * gameWindow.height * 0.8))
  .attr("r",enemy.radius)
  .attr("fill",enemy.fill)
  .attr("stroke",enemy.borderColor)
  .attr("stroke-width",enemy.borderWidth)
  .attr("enemyId", enemy.enemyId)
  .attr("class", "enemy");

  enemy.enemyId++;
}

var populateEnemies = function(){
  for(var i = 0; i < gameOptions.maxEnemies; i++) {
    enemySvg();
  }
};

var collideCheck = function() {
  var player1 = d3.select(".player");
  var playerR = player.radius;
  console.log(player.radius);
  var playerX = parseInt(player1.attr("transform").replace(/[^0-9,]/g, "").split(",")[0]);
  var playerY = parseInt(player1.attr("transform").replace(/[^0-9,]/g, "").split(",")[1]);
  var playerCxMin = playerX - playerR;
  var playerCxMax = playerX + playerR;
  var playerCyMin = playerY - playerR;
  var playerCyMax = playerY + playerR;

  var currentEnemy = d3.select(this);
  var currentEnemyCxMin = currentEnemy.attr("cx") - currentEnemy.attr("r");
  var currentEnemyCxMax = currentEnemy.attr("cx") + currentEnemy.attr("r");
  var currentEnemyCyMin = currentEnemy.attr("cy") - currentEnemy.attr("r");
  var currentEnemyCyMax = currentEnemy.attr("cy") + currentEnemy.attr("r");
  if (playerCxMin > currentEnemyCxMax || playerCxMax < currentEnemyCxMin ||
  playerCyMin > currentEnemyCyMax || playerCyMax < currentEnemyCyMin) {
    console.log("collideCheck detected collision");
  }
}

var updateAllEnemyPositions = function() {
  d3.selectAll(".enemy").each(function(){
    d3.select(this).transition().duration(3000).ease("bounce")
    .attr("cx", Math.floor(Math.random() * gameWindow.width * 0.8))
    .attr("cy",Math.floor(Math.random() * gameWindow.height * 0.8))
    .tween("attr", collideCheck);
  });
};

var updateScoreboard = function() {
  gameOptions.currentScore += 100;
  d3.select(".currentscore").text(gameOptions.currentScore);
};

// var acceptKeyboardInput = function(){
//   d3.select("body")
//   .
// };

var init = function(){
  populatePlayers();
  populateEnemies();
};

init();
updateAllEnemyPositions();
var gameLoop = function(){
  return function(){
    updateAllEnemyPositions();
    updateScoreboard();
    d3.timer(gameLoop(), gameOptions.speed);
    return true;
  }
};
d3.timer(gameLoop(), gameOptions.speed);





