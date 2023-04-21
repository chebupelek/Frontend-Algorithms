playMusic()
var CanvasKmeans = document.getElementById("CanvasKmeans");
var CanvasHierarchy = document.getElementById("CanvasHierarchy");
var CanvasHierarchyInteresting = document.getElementById("CanvasHierarchyInteresting");
var ctxCanvasKmeans = CanvasKmeans.getContext("2d");
var ctxCanvasHierarchy = CanvasHierarchy.getContext("2d");
var ctxCanvasHierarchyInteresting = CanvasHierarchyInteresting.getContext("2d");
var circleKmeans = [];
var circleHierarchy = [];
var circleHierarchyInteresting = [];
var circlesX = [];
var circlesY = [];
var radius = 5;


function playMusic() {
  let music = document.createElement("audio");
  music.src = "../sound/vargan.mp3"
  music.autoplay = true;
}


CanvasKmeans.addEventListener("click", function(event){
  var x = event.offsetX;
  var y = event.offsetY;
  let selected = document.querySelector('input[name="circles"]:checked').value;
  if(selected == 1)
  {
    circlesX.push(x);
    circlesY.push(y);
    circleKmeans.push(-1);
    circleHierarchy.push(-1);
    circleHierarchyInteresting.push(-1);
    drawCircleCanvasKmeans(x, y, -1);
    drawCircleCanvasHierarchy(x, y, -1);
    drawCircleCanvasHierarchyInteresting(x, y, -1);
  }
  if(selected == 2)
  {
    for(var index = 0; index < circlesX.length; ++index)
    {
      if(dist(x, circlesX[index], y, circlesY[index]) <= radius)
      {
        circlesX.splice(index, 1);
        circlesY.splice(index, 1);
        circleKmeans.splice(index, 1);
        circleHierarchy.splice(index, 1);
        circleHierarchyInteresting.splice(index, 1);
        changeColorKmeans();
        changeColorHierarchy();
        changeColorHierarchyInteresting();
      }
    }
  }
});

CanvasHierarchy.addEventListener("click", function(event){
  var x = event.offsetX;
  var y = event.offsetY;
  let selected = document.querySelector('input[name="circles"]:checked').value;
  if(selected == 1)
  {
    circlesX.push(x);
    circlesY.push(y);
    circleKmeans.push(-1);
    circleHierarchy.push(-1);
    circleHierarchyInteresting.push(-1);
    drawCircleCanvasKmeans(x, y, -1);
    drawCircleCanvasHierarchy(x, y, -1);
    drawCircleCanvasHierarchyInteresting(x, y, -1);
  }
  if(selected == 2)
  {
    for(var index = 0; index < circlesX.length; ++index)
    {
      if(dist(x, circlesX[index], y, circlesY[index]) <= radius)
      {
        circlesX.splice(index, 1);
        circlesY.splice(index, 1);
        circleKmeans.splice(index, 1);
        circleHierarchy.splice(index, 1);
        circleHierarchyInteresting.splice(index, 1);
        changeColorKmeans();
        changeColorHierarchy();
        changeColorHierarchyInteresting();
      }
    }
  }
});

CanvasHierarchyInteresting.addEventListener("click", function(event){
  var x = event.offsetX;
  var y = event.offsetY;
  let selected = document.querySelector('input[name="circles"]:checked').value;
  if(selected == 1)
  {
    circlesX.push(x);
    circlesY.push(y);
    circleKmeans.push(-1);
    circleHierarchy.push(-1);
    circleHierarchyInteresting.push(-1);
    drawCircleCanvasKmeans(x, y, -1);
    drawCircleCanvasHierarchy(x, y, -1);
    drawCircleCanvasHierarchyInteresting(x, y, -1);
  }
  if(selected == 2)
  {
    for(var index = 0; index < circlesX.length; ++index)
    {
      if(dist(x, circlesX[index], y, circlesY[index]) <= radius)
      {
        circlesX.splice(index, 1);
        circlesY.splice(index, 1);
        circleKmeans.splice(index, 1);
        circleHierarchy.splice(index, 1);
        circleHierarchyInteresting.splice(index, 1);
        changeColorKmeans();
        changeColorHierarchy();
        changeColorHierarchyInteresting();
      }
    }
  }
});

function clearCanvas() 
{
  ctxCanvasKmeans.clearRect(0, 0, CanvasKmeans.width, CanvasKmeans.height);
  ctxCanvasHierarchy.clearRect(0, 0, CanvasHierarchy.width, CanvasHierarchy.height);
  ctxCanvasHierarchyInteresting.clearRect(0, 0, CanvasHierarchyInteresting.width, CanvasHierarchyInteresting.height);
  circlesX = [];
  circlesY = [];
  circleKmeans = [];
  circleHierarchy = [];
  circleHierarchyInteresting = [];
}

function drawCircleCanvasKmeans(x, y, col) 
{
  ctxCanvasKmeans.beginPath();
  ctxCanvasKmeans.arc(x, y, radius, 0, 2 * Math.PI);
  if(col == -1)
  {
    ctxCanvasKmeans.fillStyle = "Black";
  }
  if(col == 0)
  {
    ctxCanvasKmeans.fillStyle = "Blue";
  }
  if(col == 1)
  {
    ctxCanvasKmeans.fillStyle = "Gold";
  }
  if(col == 2)
  {
    ctxCanvasKmeans.fillStyle = "Red";
  }
  if(col == 3)
  {
    ctxCanvasKmeans.fillStyle = "Green";
  }
  if(col == 4)
  {
    ctxCanvasKmeans.fillStyle = "Navy";
  }
  if(col == 5)
  {
    ctxCanvasKmeans.fillStyle = "Maroon";
  }
  if(col == 6)
  {
    ctxCanvasKmeans.fillStyle = "Teal";
  }
  if(col == 7)
  {
    ctxCanvasKmeans.fillStyle = "Lime";
  }
  if(col == 8)
  {
    ctxCanvasKmeans.fillStyle = "Olive";
  }
  if(col == 9)
  {
    ctxCanvasKmeans.fillStyle = "Orange";
  }
  ctxCanvasKmeans.fill();
}

function drawCircleCanvasHierarchy(x, y, col) 
{
  ctxCanvasHierarchy.beginPath();
  ctxCanvasHierarchy.arc(x, y, radius, 0, 2 * Math.PI);
  if(col == -1)
  {
    ctxCanvasHierarchy.fillStyle = "Black";
  }
  if(col == 0)
  {
    ctxCanvasHierarchy.fillStyle = "Blue";
  }
  if(col == 1)
  {
    ctxCanvasHierarchy.fillStyle = "Gold";
  }
  if(col == 2)
  {
    ctxCanvasHierarchy.fillStyle = "Red";
  }
  if(col == 3)
  {
    ctxCanvasHierarchy.fillStyle = "Green";
  }
  if(col == 4)
  {
    ctxCanvasHierarchy.fillStyle = "Navy";
  }
  if(col == 5)
  {
    ctxCanvasHierarchy.fillStyle = "Maroon";
  }
  if(col == 6)
  {
    ctxCanvasHierarchy.fillStyle = "Teal";
  }
  if(col == 7)
  {
    ctxCanvasHierarchy.fillStyle = "Lime";
  }
  if(col == 8)
  {
    ctxCanvasHierarchy.fillStyle = "Olive";
  }
  if(col == 9)
  {
    ctxCanvasHierarchy.fillStyle = "Orange";
  }
  ctxCanvasHierarchy.fill();
}

function drawCircleCanvasHierarchyInteresting(x, y, col) 
{
  ctxCanvasHierarchyInteresting.beginPath();
  ctxCanvasHierarchyInteresting.arc(x, y, radius, 0, 2 * Math.PI);
  if(col == -1)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Black";
  }
  if(col == 0)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Blue";
  }
  if(col == 1)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Gold";
  }
  if(col == 2)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Red";
  }
  if(col == 3)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Green";
  }
  if(col == 4)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Navy";
  }
  if(col == 5)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Maroon";
  }
  if(col == 6)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Teal";
  }
  if(col == 7)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Lime";
  }
  if(col == 8)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Olive";
  }
  if(col == 9)
  {
    ctxCanvasHierarchyInteresting.fillStyle = "Orange";
  }
  ctxCanvasHierarchyInteresting.fill();
}

function changeColorKmeans() 
{
  ctxCanvasKmeans.clearRect(0, 0, CanvasKmeans.width, CanvasKmeans.height);
  for (var i = 0; i < circlesX.length; i++) 
  {
    drawCircleCanvasKmeans(circlesX[i], circlesY[i], circleKmeans[i]);
  }
}

function changeColorHierarchy() 
{
  ctxCanvasHierarchy.clearRect(0, 0, CanvasHierarchy.width, CanvasHierarchy.height);
  for (var i = 0; i < circlesX.length; i++) 
  {
    drawCircleCanvasHierarchy(circlesX[i], circlesY[i], circleHierarchy[i]);
  }
}

function changeColorHierarchyInteresting() 
{
  ctxCanvasHierarchyInteresting.clearRect(0, 0, CanvasHierarchyInteresting.width, CanvasHierarchyInteresting.height);
  for (var i = 0; i < circlesX.length; i++) 
  {
    drawCircleCanvasHierarchyInteresting(circlesX[i], circlesY[i], circleHierarchyInteresting[i]);
  }
}

function sleep() 
{
  return new Promise(resolve => setTimeout(resolve, document.getElementById("time").value));
}

function dist(x1, x2, y1, y2)
{
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function clusterization()
{
  document.getElementById('count').disabled = true;
  document.getElementById('clearMap').disabled = true;
  document.getElementById('claster').disabled = true;

  Kmeans();
  Hierarchy();
  HierarchyInteresting();

  document.getElementById('count').disabled = false;
  document.getElementById('clearMap').disabled = false;
  document.getElementById('claster').disabled = false;
}

function randomInteger(min, max)
{
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}