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

// var draggable =
//   d3.behavior.drag()
//   .origin(Object)
//   .on("drag", dragmove);

var playerSvg = function(){
  gameWindowSvg.append("circle")
  .attr("cx",player.centerX)
  .attr("cy",player.centerY)
  .attr("r",player.radius)
  .attr("fill",player.fill)
  .attr("stroke",player.borderColor)
  .attr("stroke-width",player.borderWidth)
  // .on("click", function(){
  //   console.log("clicked player");
  // })
  // .call(draggable);
}

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

var updateAllEnemyPositions = function() {
  d3.selectAll(".enemy").each(function(){
    d3.select(this).transition().duration(3000)
    .attr("cx", Math.floor(Math.random() * gameWindow.width * 0.8))
    .attr("cy",Math.floor(Math.random() * gameWindow.height * 0.8))
  });
};

var updateScoreboard = function() {
  gameOptions.currentScore += 100;
  d3.select(".currentscore").text(gameOptions.currentScore);
};

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





