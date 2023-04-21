playMusic()

var table = document.getElementById("table");
var MapSizeSave = 0;
var startFlag = 0;
var finishFlag = 0;

generateMap();

function playMusic() {
  let music = document.createElement("audio");
  music.src = "../sound/vargan.mp3"
  music.autoplay = true;
}
function generateMap()
{
  startFlag = 0;
  finishFlag = 0;
  let MapSize = document.getElementById("size").value;
  MapSizeSave = MapSize;
  var NewTable = document.createElement("table");
  for (var indexRow = 0; indexRow < MapSize; indexRow++)
  {
    var Row = document.createElement("tr");
    for (var indexCell = 0; indexCell < MapSize; indexCell++)
    {
      var Cell = document.createElement("td");
      Cell.dataset.x = indexCell;
      Cell.dataset.y = indexRow;
      Cell.addEventListener("click", function ()
      {
        if((finishFlag == 1)&&(startFlag == 1))
        {
          if((!this.classList.contains("start"))&&(!this.classList.contains("finish")))
          {
            if(this.classList.contains("wall"))
            {
              this.classList.remove("wall");
            }
            else
            {
              if(this.classList.contains("road"))
              {
                this.classList.remove("road");
              }
              if(this.classList.contains("checkFirst"))
              {
                this.classList.remove("checkFirst");
              }
              if(this.classList.contains("checkSecond"))
              {
                this.classList.remove("checkSecond");
              }
              this.classList.add("wall");
            }
          }
        }

        if(startFlag == 1)
        {
          if(finishFlag == 0)
          {
            if(this.classList.contains("wall"))
            {
              this.classList.remove("wall");
            }
            if(this.classList.contains("road"))
            {
              this.classList.remove("road");
            }
            if(this.classList.contains("checkFirst"))
            {
              this.classList.remove("checkFirst");
            }
            if(this.classList.contains("checkSecond"))
            {
              this.classList.remove("checkSecond");
            }
            this.classList.add("finish");
            finishFlag = 1;
          }
          else
          {
            if(this.classList.contains("finish"))
            {
              this.classList.remove("finish");
              finishFlag = 0;
            }
          }
        }

        if(startFlag == 0)
        {
          if(this.classList.contains("wall"))
          {
            this.classList.remove("wall");
          }
          if(this.classList.contains("road"))
          {
            this.classList.remove("road");
          }
          if(this.classList.contains("checkFirst"))
          {
            this.classList.remove("checkFirst");
          }
          if(this.classList.contains("checkSecond"))
          {
            this.classList.remove("checkSecond");
          }
          if(this.classList.contains("finish"))
          {
            finishFlag = 0;
            this.classList.remove("finish");
          }
          this.classList.add("start");
          startFlag = 1;
        }
        else
        {
          if(this.classList.contains("start"))
          {
            this.classList.remove("start");
            startFlag = 0;
          }
        }

      });
      Row.appendChild(Cell);
    }
    NewTable.appendChild(Row);
  }
  table.parentNode.replaceChild(NewTable, table);
  table = NewTable;
}

function sleep()
{
  return new Promise(resolve => setTimeout(resolve,100 - document.getElementById("time").value));
}

async function findPath()
{
  let MapSize = MapSizeSave;

  document.getElementById("ButtonCreate").disabled = true;
  document.getElementById("ButtonPath").disabled = true;
  document.getElementById("ButtonCreateMaze").disabled = true;

  let startY = 0;
  let startX = -1;
  let finishY = 0;
  let finishX = -1;
  let MapArr = [];

  for (var indexRow = 0; indexRow < MapSize; indexRow++)
  {
    MapArr[indexRow] = [];
    for (var indexCell = 0; indexCell < MapSize; indexCell++)
    {
      let element = document.querySelector('table').rows[indexRow].cells[indexCell];
      MapArr[indexRow][indexCell] = {
        g: 9999999,
        h: 9999999,
        f: 9999999,
        px: null,
        py: null
      };
      if(element.classList.contains("start"))
      {
        startY = indexRow;
        startX = indexCell;
      }
      if(element.classList.contains("finish"))
      {
        finishY = indexRow;
        finishX = indexCell;
      }
      if(element.classList.contains("road"))
      {
        element.classList.remove("road");
      }
      if(element.classList.contains("checkSecond"))
      {
        element.classList.remove("checkSecond");
      }
      if(element.classList.contains("checkFirst"))
      {
        element.classList.remove("checkFirst");
      }
    }
  }

  if((startX == -1)||(finishX == -1))
  {
    alert("Обшибочка!");
    document.getElementById("ButtonCreate").disabled = false;
    document.getElementById("ButtonPath").disabled = false;
    document.getElementById("ButtonCreateMaze").disabled = false;
  }

  MapArr[startY][startX].g = 0;
  MapArr[startY][startX].h = Math.abs(startY - finishY) + Math.abs(startX - finishX);
  MapArr[startY][startX].f = MapArr[startY][startX].g + MapArr[startY][startX].h;

  let nextSize = 0;
  let nextElementsX = [];
  let nextElementsY = [];
  let offElementsX = [];
  let offElementsY = [];

  nextElementsX.push(startX);
  nextElementsY.push(startY);
  ++nextSize;

  let nextX;
  let nextY;
  let fmin = 9999999;
  let minIndex = 0;

  while(nextSize > 0)
  {
    fmin = 9999999;
    for(let index = 0; index < nextSize; ++index)
    {
      if(MapArr[nextElementsY[index]][nextElementsX[index]].f < fmin)
      {
        fmin = MapArr[nextElementsY[index]][nextElementsX[index]].f;
        nextX = nextElementsX[index];
        nextY = nextElementsY[index];
        minIndex = index;
      }
    }

    --nextSize;
    nextElementsX.splice(minIndex, 1);
    nextElementsY.splice(minIndex, 1);
    offElementsX.push(nextX);
    offElementsY.push(nextY);

    if((nextX == finishX)&&(nextY == finishY))
    {
      break;
    }

    if(nextX > 0)
    {
      if((MapArr[nextY][nextX].g + 1 < MapArr[nextY][nextX - 1].g)&&(!document.querySelector('table').rows[nextY].cells[nextX - 1].classList.contains("wall")))
      {
        MapArr[nextY][nextX - 1].g = MapArr[nextY][nextX].g + 1;
        MapArr[nextY][nextX - 1].h = Math.abs(nextY - finishY) + Math.abs((nextX - 1) - finishX);
        MapArr[nextY][nextX - 1].f = MapArr[nextY][nextX - 1].g + MapArr[nextY][nextX - 1].h;
        MapArr[nextY][nextX - 1].px = nextX;
        MapArr[nextY][nextX - 1].py = nextY;
        nextElementsX.push(nextX - 1);
        nextElementsY.push(nextY);
        ++nextSize;
        if(!document.querySelector('table').rows[nextY].cells[nextX - 1].classList.contains("finish"))
        {
          await sleep();
          document.querySelector('table').rows[nextY].cells[nextX - 1].classList.add("checkSecond");
        }
      }
    }
    if(nextX < MapSize - 1)
    {
      if((MapArr[nextY][nextX].g + 1 < MapArr[nextY][nextX + 1].g)&&(!document.querySelector('table').rows[nextY].cells[nextX + 1].classList.contains("wall")))
      {
        MapArr[nextY][nextX + 1].g = MapArr[nextY][nextX].g + 1;
        MapArr[nextY][nextX + 1].h = Math.abs(nextY - finishY) + Math.abs((nextX + 1) - finishX);
        MapArr[nextY][nextX + 1].f = MapArr[nextY][nextX + 1].g + MapArr[nextY][nextX + 1].h;
        MapArr[nextY][nextX + 1].px = nextX;
        MapArr[nextY][nextX + 1].py = nextY;
        nextElementsX.push(nextX + 1);
        nextElementsY.push(nextY);
        ++nextSize;
        if(!document.querySelector('table').rows[nextY].cells[nextX + 1].classList.contains("finish"))
        {
          await sleep();
          document.querySelector('table').rows[nextY].cells[nextX + 1].classList.add("checkSecond");
        }
      }
    }
    if(nextY > 0)
    {
      if((MapArr[nextY][nextX].g + 1 < MapArr[nextY - 1][nextX].g)&&(!document.querySelector('table').rows[nextY - 1].cells[nextX].classList.contains("wall")))
      {
        MapArr[nextY - 1][nextX].g = MapArr[nextY][nextX].g + 1;
        MapArr[nextY - 1][nextX].h = Math.abs((nextY - 1) - finishY) + Math.abs(nextX - finishX);
        MapArr[nextY - 1][nextX].f = MapArr[nextY - 1][nextX].g + MapArr[nextY - 1][nextX].h;
        MapArr[nextY - 1][nextX].px = nextX;
        MapArr[nextY - 1][nextX].py = nextY;
        nextElementsX.push(nextX);
        nextElementsY.push(nextY - 1);
        ++nextSize;
        if(!document.querySelector('table').rows[nextY - 1].cells[nextX].classList.contains("finish"))
        {
          await sleep();
          document.querySelector('table').rows[nextY - 1].cells[nextX].classList.add("checkSecond");
        }
      }
    }
    if(nextY < MapSize - 1)
    {
      if((MapArr[nextY][nextX].g + 1 < MapArr[nextY + 1][nextX].g)&&(!document.querySelector('table').rows[nextY + 1].cells[nextX].classList.contains("wall")))
      {
        MapArr[nextY + 1][nextX].g = MapArr[nextY][nextX].g + 1;
        MapArr[nextY + 1][nextX].h = Math.abs((nextY + 1) - finishY) + Math.abs(nextX - finishX);
        MapArr[nextY + 1][nextX].f = MapArr[nextY + 1][nextX].g + MapArr[nextY + 1][nextX].h;
        MapArr[nextY + 1][nextX].px = nextX;
        MapArr[nextY + 1][nextX].py = nextY;
        nextElementsX.push(nextX);
        nextElementsY.push(nextY + 1);
        ++nextSize;
        if(!document.querySelector('table').rows[nextY + 1].cells[nextX].classList.contains("finish"))
        {
          await sleep();
          document.querySelector('table').rows[nextY + 1].cells[nextX].classList.add("checkSecond");
        }
      }
    }
    await sleep();
    document.querySelector('table').rows[nextY].cells[nextX].classList.remove("checkSecond");
    if(!document.querySelector('table').rows[nextY].cells[nextX].classList.contains("start"))
    {
      document.querySelector('table').rows[nextY].cells[nextX].classList.add("checkFirst");
    }
  }

  if(MapArr[finishY][finishX].g == 9999999)
  {
    alert("Путь невозможно построить");
  }
  else
  {
    while((nextX != startX)||(nextY != startY))
    {
      let nx  = MapArr[nextY][nextX].px;
      let ny  = MapArr[nextY][nextX].py;
      await sleep();
      if(document.querySelector('table').rows[ny].cells[nx].classList.contains("checkSecond"))
      {
        document.querySelector('table').rows[ny].cells[nx].classList.remove("checkSecond");
      }
      if(document.querySelector('table').rows[ny].cells[nx].classList.contains("checkFirst"))
      {
        document.querySelector('table').rows[ny].cells[nx].classList.remove("checkFirst");
      }
      if(!document.querySelector('table').rows[ny].cells[nx].classList.contains("start"))
      {
        document.querySelector('table').rows[ny].cells[nx].classList.add("road");
      }
      nextX = nx;
      nextY = ny;
    }
  }

  document.getElementById("ButtonCreate").disabled = false;
  document.getElementById("ButtonPath").disabled = false;
  document.getElementById("ButtonCreateMaze").disabled = false;
}

function randomInteger(min, max)
{
  let rand = min + Math.random() * (max - min);
  return Math.floor(rand);
}

async function generateMaze()
{
  document.getElementById("ButtonCreate").disabled = true;
  document.getElementById("ButtonPath").disabled = true;
  document.getElementById("ButtonCreateMaze").disabled = true;

  let MapSize = MapSizeSave;

  for (var indexRow = 0; indexRow < MapSize; indexRow++)
  {
    for (var indexCell = 0; indexCell < MapSize; indexCell++)
    {
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("checkSecond"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("checkSecond");
      }
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("checkFirst"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("checkFirst");
      }
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("road"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("road");
      }
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("wall"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("wall");
      }
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("start"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("start");
        startFlag = 0;
      }
      if(document.querySelector('table').rows[indexRow].cells[indexCell].classList.contains("finish"))
      {
        document.querySelector('table').rows[indexRow].cells[indexCell].classList.remove("finish");
        finishFlag = 0;
      }
      document.querySelector('table').rows[indexRow].cells[indexCell].classList.add("wall");
    }
  }

  let MapArr = [];
  for(var indexRow = 0; indexRow < MapSize; indexRow++)
  {
    MapArr[indexRow] = [];
    for(var indexCell = 0; indexCell < MapSize; indexCell++)
    {
      MapArr[indexRow][indexCell] = 1
    }
  }

  let x = randomInteger(0, MapSize / 2) * 2 + 1;
  let y = randomInteger(0, MapSize / 2) * 2 + 1;
  console.log(x);
  console.log(y);
  await sleep();
  document.querySelector('table').rows[y].cells[x].classList.remove("wall");
  MapArr[x][y] = 0;

  let PointCheckX = [];
  let PointCheckY = [];
  if(y - 2 >= 0)
  {
    PointCheckX.push(x);
    PointCheckY.push(y - 2);
  }
  if(y + 2 < MapSize)
  {
    PointCheckX.push(x);
    PointCheckY.push(y + 2);
  }
  if(x - 2 >= 0)
  {
    PointCheckX.push(x - 2);
    PointCheckY.push(y);
  }
  if(x + 2 < MapSize)
  {
    PointCheckX.push(x + 2);
    PointCheckY.push(y);
  }

  while(PointCheckX.length > 0)
  {
    index = randomInteger(0, PointCheckX.length);
    x = PointCheckX[index];
    y = PointCheckY[index];
    PointCheckX.splice(index, 1);
    PointCheckY.splice(index, 1);
    if(MapArr[x][y] != 0)
    {
      await sleep();
      document.querySelector('table').rows[y].cells[x].classList.remove("wall");
      MapArr[x][y] = 0;

      let direction = [];
      direction[0] = 0;
      direction[1] = 1;
      direction[2] = 2;
      direction[3] = 3;
      while(direction.length > 0)
      {
        let dir_index = randomInteger(0, direction.length);
        if(direction[dir_index] == 0)
        {
          if((y - 2 >= 0) && (MapArr[x][y - 2] == 0))
          {
            await sleep();
            document.querySelector('table').rows[y - 1].cells[x].classList.remove("wall");
            MapArr[x][y - 1] = 0;
            direction = [];
          }
        }
        if(direction[dir_index] == 1)
        {
          if((y + 2 < MapSize) && (MapArr[x][y + 2] == 0))
          {
            await sleep();
            document.querySelector('table').rows[y + 1].cells[x].classList.remove("wall");
            MapArr[x][y + 1] = 0;
            direction = [];
          }
        }
        if(direction[dir_index] == 2)
        {
          if((x - 2 >= 0) && (MapArr[x - 2][y] == 0))
          {
            await sleep();
            document.querySelector('table').rows[y].cells[x - 1].classList.remove("wall");
            MapArr[x - 1][y] = 0;
            direction = [];
          }
        }
        if(direction[dir_index] == 3)
        {
          if((x + 2 < MapSize) && (MapArr[x + 2][y] == 0))
          {
            await sleep();
            document.querySelector('table').rows[y].cells[x + 1].classList.remove("wall");
            MapArr[x + 1][y] = 0;
            direction = [];
          }
        }
        direction.splice(dir_index, 1);
      }

      if((y - 2 >= 0)&&(MapArr[x][y - 2] == 1))
      {
        PointCheckX.push(x);
        PointCheckY.push(y - 2);
      }
      if((y + 2 < MapSize)&&(MapArr[x][y + 2] == 1))
      {
        PointCheckX.push(x);
        PointCheckY.push(y + 2);
      }
      if((x - 2 >= 0)&&(MapArr[x - 2][y] == 1))
      {
        PointCheckX.push(x - 2);
        PointCheckY.push(y);
      }
      if((x + 2 < MapSize)&&(MapArr[x + 2][y] == 1))
      {
        PointCheckX.push(x + 2);
        PointCheckY.push(y);
      }
    }
  }

  document.getElementById("ButtonCreate").disabled = false;
  document.getElementById("ButtonPath").disabled = false;
  document.getElementById("ButtonCreateMaze").disabled = false;
}