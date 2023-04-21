async function Kmeans()
{
  let klcount = document.getElementById("count").value;

  if(klcount > circlesX.length)
  {
    alert("Добавьте точек или уменьшите количество кластеров");
    return;
  }

  let klasterX = [];
  let klasterY = [];
  let distance = [];
  let distanceS = [];

  for(var index = 0; index < klcount; ++index)
  {
    klasterX.push(randomInteger(0, CanvasKmeans.width));
    klasterY.push(randomInteger(0, CanvasKmeans.height));
  }

  for(var index = 0; index < circlesX.length; ++index)
  {
    let indSave = 0;
    let minDist = 999999;

    for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
    {
      if(minDist > dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]))
      {
        minDist = dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]);
        indSave = klasterNumber;
      }
    }

    distanceS[index] = minDist;
    circleKmeans[index] = indSave;
  }

  for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
  {
    let distY = 0;
    let distX = 0;
    let count = 0;

    for(var index = 0; index < circlesX.length; ++index)
    {
      if(circleKmeans[index] == klasterNumber)
      {
        distY += circlesY[index];
        distX += circlesX[index];
        ++count;
      }
    }

    klasterY[klasterNumber] = distY / count;
    klasterX[klasterNumber] = distX / count;
  }

  for(var index = 0; index < circlesX.length; ++index)
  {
    let indSave = 0;
    let minDist = 999999;

    for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
    {
      if(minDist > dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]))
      {
        minDist = dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]);
        indSave = klasterNumber;
      }
    }

    distance[index] = minDist;
    circleKmeans[index] = indSave;
  }

  while(radius)
  {
    let stopper = 0;
    let contin = 0;

    for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
    {
      let dist = 0;
      let distS = 0;
      for(var index = 0; index < circlesX.length; ++index)
      {
        if(circleKmeans[index] == klasterNumber)
        {
          dist += Math.pow(distance[index], 2);
          distS += Math.pow(distanceS[index], 2);
        }
      }
      if(dist != distS)
      {
        stopper = 1;
        break;
      }
    }

    for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
    {
      let distY = 0;
      let distX = 0;
      let count = 0;

      for(var index = 0; index < circlesX.length; ++index)
      {
        if(circleKmeans[index] == klasterNumber)
        {
          distY += circlesY[index];
          distX += circlesX[index];
          ++count;
        }
      }

      klasterY[klasterNumber] = distY / count;
      klasterX[klasterNumber] = distX / count;
    }

    if(stopper == 0)
    {
      for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
      {
        let count = 0;
        for(var index = 0; index < circlesX.length; ++index)
        {
          if(circleKmeans[index] == klasterNumber)
          {
            ++count;
          }
        }
        if(count == 0)
        {
          for(var index = 0; index < klcount; ++index)
          {
            klasterX[index] = randomInteger(0, CanvasKmeans.width);
            klasterY[index] = randomInteger(0, CanvasKmeans.height);
          }
          contin = 1;
        }
      }
    }

    if((contin == 0)&&(stopper == 0))
    {
      break;
    }

    for(var index = 0; index < circlesX.length; ++index)
    {
      let indSave = 0;
      let minDist = 999999;

      for(var klasterNumber = 0; klasterNumber < klcount; ++klasterNumber)
      {
        if(minDist > dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]))
        {
          minDist = dist(klasterX[klasterNumber], circlesX[index], klasterY[klasterNumber], circlesY[index]);
          indSave = klasterNumber;
        }
      }

      distanceS[index] = distance[index];
      distance[index] = minDist;
      circleKmeans[index] = indSave;
    }
  }
  changeColorKmeans();
}