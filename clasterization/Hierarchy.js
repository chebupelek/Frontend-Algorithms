function Hierarchy() 
{
  let klnumber = document.getElementById("count").value;

  if(klnumber > circlesX.length)
  {
    alert("Добавьте точек или уменьшите количество кластеров");
    return;
  }

  let clustersNumber = [];
  let clustersX = [];
  let clustersY = [];

  for(var index = 0; index < circlesX.length; ++index)
  {
    clustersNumber[index] = index;
    clustersX[index] = circlesX[index];
    clustersY[index] = circlesY[index];
  }
  
  while(1)
  {
    let count = 0;
    for(var number = 0; number < clustersNumber.length; ++number)
    {
      let nmb = 0;
      for(var index = 0; index < clustersNumber.length; ++index)
      {
        if(clustersNumber[index] == number)
        {
          nmb = 1;
          break;
        }
      }
      count += nmb;
    }

    if(count == klnumber)
    {
      break;
    }

    let mindist = 999999;
    let indf = 0;
    let inds = 0;
    for(var indexfir = 0; indexfir < circlesX.length - 1; ++indexfir)
    {
      for(var indexsec = indexfir + 1; indexsec < circlesX.length; ++indexsec)
      {
        let distant = dist(clustersX[indexfir], clustersX[indexsec], clustersY[indexfir], clustersY[indexsec]);
        if((distant < mindist)&&(distant != 0))
        {
          mindist = distant;
          indf = indexfir;
          inds = indexsec;
        }
      }
    }

    let clustcenterx = (clustersX[indf] + clustersX[inds]) / 2;
    let clustcentery = (clustersY[indf] + clustersY[inds]) / 2;

    clusNum = clustersNumber[inds];
    clustersX[indf] = clustcenterx;
    clustersY[indf] = clustcentery;
    for(var index = 0; index < clustersNumber.length; ++index)
    {
      if(clustersNumber[index] == clusNum)
      {
        clustersNumber[index] = clustersNumber[indf];
        clustersX[index] = clustcenterx;
        clustersY[index] = clustcentery;
      }
    }
  }

  let numberType = [];
  for(var number = 0; number < clustersNumber.length; ++number)
  {
    let type = 0;
    for(var index = 0; index < clustersNumber.length; ++index)
    {
      if(clustersNumber[index] == number)
      {
        type = 1;
        break;
      }
    }
    if(type == 1)
    {
      numberType.push(number);
    }
  }

  for(let color = 0; color < numberType.length; ++color)
  {
    for(var number = 0; number < clustersNumber.length; ++number)
    {
      if(clustersNumber[number] == numberType[color])
      {
        circleHierarchy[number] = color;
      }
    }
  }

  changeColorHierarchy();
}