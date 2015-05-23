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
  speed: 3000,
  totalCollisions: 0
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

var collideCheck = function(){
d3.selectAll(".enemy").each(function(enemy) {
  var player1 = d3.select(".player");
  var playerCx = parseInt(player1.attr("transform").replace(/[^0-9,]/g, "").split(",")[0]);
  var playerCy = parseInt(player1.attr("transform").replace(/[^0-9,]/g, "").split(",")[1]);
  var playerR = player.radius;
  var currentEnemy = d3.select(this);
  var currentEnemyCx = parseInt(currentEnemy.attr("cx"));
  var currentEnemyCy = parseInt(currentEnemy.attr("cy"));

  var distanceCx = currentEnemyCx - playerCx;
  var distanceCy = currentEnemyCy - playerCy;
  var distance = playerR * 2;
  var collided = distanceCx* distanceCx + distanceCy * distanceCy <= distance * distance;
  if(collided) {
    if (gameOptions.currentScore > gameOptions.highScore) {
      gameOptions.highScore = gameOptions.currentScore;
      d3.select(".highscore").text(gameOptions.highScore);
    }
    gameOptions.currentScore = 0;
    d3.select(".currentscore").text(gameOptions.currentScore);
    gameOptions.totalCollisions++;
    d3.select(".totalcollisions").text(gameOptions.totalCollisions);
  }
  });
};

var updateAllEnemyPositions = function() {
  d3.selectAll(".enemy").each(function(){
    d3.select(this).transition().duration(3000).ease("bounce")
    .attr("cx", Math.floor(Math.random() * gameWindow.width * 0.8))
    .attr("cy",Math.floor(Math.random() * gameWindow.height * 0.8))
    .attr("fill", randomColor())
  });
};

// var randomColor = function() {
//   var r = Math.floor(Math.random() * 255);
//   var g = Math.floor(Math.random() * 255);
//   var b = Math.floor(Math.random() * 255);
//   return "rgb("+r+","+g+","+b+")";
// }

var colors = ["red","yellow","purple","orange","cyan"];
var randomColor = function() {
  return colors[Math.floor(Math.random() * colors.length)];
}
var updateScoreboard = function() {
  d3.select(".currentscore").text(gameOptions.currentScore);
  gameOptions.currentScore += 100;
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
updateScoreboard();
collideCheck();
updateAllEnemyPositions();
setInterval(updateAllEnemyPositions ,3000);
var gameLoop = function(){
  return function(){
    collideCheck();
    updateScoreboard();
    d3.timer(gameLoop(), 100);
    return true;
  }
};
d3.timer(gameLoop(), gameOptions.speed);
