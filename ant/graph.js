var Canvas = document.getElementById("Canvas");
var ctx = Canvas.getContext("2d");
ctx.fillStyle = "Green";
var circlesX = [];
var circlesY = [];
var pointFirst = [];
var pointSecond = [];
var radius = 10;

Canvas.addEventListener("click", function(event){
  var x = event.offsetX;
  var y = event.offsetY;
  let selected = document.querySelector('input[name="circles"]:checked').value;
  if(selected == 1)
  {
    circlesX.push(x);
    circlesY.push(y);
    drawCircle(x, y);
  }
  if(selected == 2)
  {
    for(var index = 0; index < circlesX.length; ++index)
    {
      if(dist(x, circlesX[index], y, circlesY[index]) <= radius)
      {
        circlesX.splice(index, 1);
        circlesY.splice(index, 1);
        ctx.clearRect(0, 0, Canvas.width, Canvas.height);
        drawAllPoints();
        break;
      }
    }
  }
});

function clearCanvas() 
{
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  circlesX = [];
  circlesY = [];
  pointFirst = [];
  pointSecond = [];
}

function drawCircle(x, y) 
{
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.fill();
}

function drawAllPoints() 
{
  for(let index = 0; index < circlesX.length; ++index)
  {
    drawCircle(circlesX[index], circlesY[index]);
  }
}

function drawLine(x1, y1, x2, y2, width) 
{
  ctx.lineWidth = width;
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}

async function drawAllLines(matrixOfWidth)
{
  eraseLines();
  for(let y = 0; y < circlesY.length; ++y)
  {
    for(let x = 0; x < circlesX.length; ++x)
    {
      if(matrixOfWidth[y][x] != 0)
      {
        drawLine(circlesX[y], circlesY[y], circlesX[x], circlesY[x], matrixOfWidth[y][x]);
      }
    }
  }
  drawAllPoints();
}

function eraseLines()
{
  ctx.clearRect(0, 0, Canvas.width, Canvas.height);
  for(let index = 0; index < circlesX.length; ++index)
  {
    drawCircle(circlesX[index], circlesY[index]);
  }
}

function sleep() 
{
  return new Promise(resolve => setTimeout(resolve, 1001 - document.getElementById("time").value));
}

function blockButton()
{
  document.getElementById("graf").disabled = true;
  document.getElementById("clearMap").disabled = true;
  document.getElementById("iter").disabled = true;
  document.getElementById("dist").disabled = true;
  document.getElementById("pher").disabled = true;
  document.getElementById("plus").disabled = true;
  document.getElementById("minus").disabled = true;
}

function unblockButton()
{
  document.getElementById("graf").disabled = false;
  document.getElementById("clearMap").disabled = false;
  document.getElementById("iter").disabled = false;
  document.getElementById("dist").disabled = false;
  document.getElementById("pher").disabled = false;
  document.getElementById("plus").disabled = false;
  document.getElementById("minus").disabled = false;
}

async function graf()
{
  muravyishki(document.getElementById("iter").value, document.getElementById("dist").value, document.getElementById("pher").value, document.getElementById("plus").value, document.getElementById("minus").value, circlesX, circlesY);
}
