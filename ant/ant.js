playMusic()
function playMusic() {
    let music = document.createElement("audio");
    music.src = "../sound/vargan.mp3"
    music.autoplay = true;
}

function dist(x1, x2, y1, y2)
{
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function random(min, max)
{
  let rand = min + Math.random() * (max - min);
  return rand;
}

function percent(max, val)
{
  return Math.floor( ( val / max * 100 ) / 10 ) + 1;
}

function makeMatrixDist(circlesX, circlesY)
{
    let matrix = [];
    for(let y = 0; y < circlesY.length; ++y)
    {
        matrix[y] = [];
        for(let x = 0; x < circlesX.length; ++x)
        {
            matrix[y][x] = dist(circlesX[y], circlesX[x], circlesY[y], circlesY[x]);
        }
    }
    return matrix;
}

function makeMatrixDistAnti(distPower, matrixDist, circlesX, circlesY)
{
    let matrix = [];
    for(let y = 0; y < circlesY.length; ++y)
    {
        matrix[y] = [];
        for(let x = 0; x < circlesX.length; ++x)
        {
            if(matrixDist[y][x] != 0)
            {
                matrix[y][x] = Math.pow((200 / matrixDist[y][x]), distPower);
            }
            else
            {
                matrix[y][x] = 0;
            }
        }
    }
    return matrix;
}

function makeMatrixPher(circlesX, circlesY)
{
    let matrix = [];
    for(let y = 0; y < circlesY.length; ++y)
    {
        matrix[y] = [];
        for(let x = 0; x < circlesX.length; ++x)
        {
            if(x == y)
            {
                matrix[y][x] = 0;
            }
            else
            {
                matrix[y][x] = 0.5;
            }
        }
    }
    return matrix;
}

function makeEmptyMatrix(circlesX, circlesY)
{
    let matrix = [];
    for(let y = 0; y < circlesY.length; ++y)
    {
        matrix[y] = [];
        for(let x = 0; x < circlesX.length; ++x)
        {
            matrix[y][x] = 0;
        }
    }
    return matrix;
}

function makeChanceSum(currentPoint, nextPossible, matrixPher, pherPow, matrixDistAnti)
{
    let sum = 0;
    for(let index = 0; index < nextPossible.length; ++index)
    {
        sum += Math.pow(matrixPher[currentPoint][nextPossible[index]], pherPow) * matrixDistAnti[currentPoint][nextPossible[index]];
    }
    return sum;
}

function makeChance(currentPoint, nextPossible, matrixPher, pherPow, matrixDistAnti, chanceSum)
{
    let arr = [];
    for(let index = 0; index < nextPossible.length; ++index)
    {
        if(index == 0)
        {
            arr.push(100 * (Math.pow(matrixPher[currentPoint][nextPossible[index]], pherPow) * matrixDistAnti[currentPoint][nextPossible[index]]) / chanceSum);
        }
        else
        {
            arr.push((100 * (Math.pow(matrixPher[currentPoint][nextPossible[index]], pherPow) * matrixDistAnti[currentPoint][nextPossible[index]]) / chanceSum) + arr[index - 1]);
        }
    }
    return arr;
}

function choseNewtPoint(chanceArr)
{
    let nextInd = 0;
    let chance = random(0, 100);
    for(let index = 0; index < chanceArr.length; ++index)
    {
        if(chance >= chanceArr[index])
        {
            nextInd = index;
        }
        else
        {
            nextInd = index;
            break;
        }
    }
    return nextInd;
}

function summDeltaAndAnt(matrixDelta, matrixAnt, distSum, Q, circlesX, circlesY)
{
    for(let y = 0; y < circlesY.length; ++y)
    {
        for(let x = 0; x < circlesX.length; ++x)
        {
            if(matrixAnt[y][x] == 1)
            {
                matrixDelta[y][x] += Q / distSum;
            }
        }
    }
    return matrixDelta;
}

function matrixSum(matrixPher, matrixDelta, pherMinus, circlesX, circlesY)
{
    for(let y = 0; y < circlesY.length; ++y)
    {
        for(let x = 0; x < circlesX.length; ++x)
        {
            matrixPher[y][x] *= (pherMinus / 100);
            matrixPher[y][x] += matrixDelta[y][x];
        }
    }
    return matrixPher;
}

function grafOutput(matrixPher, circlesX, circlesY)
{
    let maxPher = 0;
    for(let y = 0; y < circlesY.length; ++y)
    {
        for(let x = 0; x < circlesX.length; ++x)
        {
            if(maxPher < matrixPher[y][x])
            {
                maxPher = matrixPher[y][x];
            }
        }
    }
    
    let matrix = [];
    for(let y = 0; y < circlesY.length; ++y)
    {
        matrix[y] = [];
        for(let x = 0; x < circlesX.length; ++x)
        {
            matrix[y][x] = percent(maxPher, matrixPher[y][x]);
        }
    }

    drawAllLines(matrix);
}

function outputFinal(matrixPher, circlesX, circlesY)
{
    let current = 0;
    let possibleMoves = [];
    for(let index = 1; index < circlesX.length; ++index)
    {
        possibleMoves.push(index);
    }

    let matrix = makeEmptyMatrix(circlesX, circlesY);
    while(possibleMoves.length > 0)
    {
        let maxPher = 0;
        let inds = 0;
        for(let index = 0; index < possibleMoves.legth; ++index)
        {
            if(matrixPher[current][possibleMoves[index]] > maxPher)
            {
                maxPher = matrixPher[current][possibleMoves[index]];
                inds = index;
            }
        }
        matrix[current][possibleMoves[inds]] = 5;
        current = possibleMoves[inds];
        possibleMoves.splice(inds, 1);
    }
    matrix[current][0] = 5;
    drawAllLines(matrix);
}

async function muravyishki(iterationsNumber, distPower, pherPower, Q, pherMinus, circlesX, circlesY)
{
    blockButton();

    let antsNumber = circlesX.length;
    let matrixDist = makeMatrixDist(circlesX, circlesY);
    let matrixDistAnti = makeMatrixDistAnti(distPower, matrixDist, circlesX, circlesY);
    let matrixPher = makeMatrixPher(circlesX, circlesY);

    while(iterationsNumber-- > 0)
    {
        let matrixDeltaPher = makeEmptyMatrix(circlesX, circlesY);

        for(let count = 0; count < antsNumber; ++count)
        {
            let matrixDelta = makeEmptyMatrix(circlesX, circlesY);

            let currentPoint = count;

            let possibleMoves = [];
            for(let index = 0; index < circlesX.length; ++index)
            {
                if(index != currentPoint)
                {
                    possibleMoves.push(index);
                }
            }

            let distSum = 0;
            while(possibleMoves.length > 0)
            {
                let chanceSum = makeChanceSum(currentPoint, possibleMoves, matrixPher, pherPower, matrixDistAnti);
                let chanceArr = makeChance(currentPoint, possibleMoves, matrixPher, pherPower, matrixDistAnti, chanceSum);
                let nextIndex = choseNewtPoint(chanceArr);

                matrixDelta[currentPoint][possibleMoves[nextIndex]] = 1;
                distSum +=  matrixDist[currentPoint][possibleMoves[nextIndex]];
                currentPoint = possibleMoves[nextIndex];
                possibleMoves.splice(nextIndex, 1);
            }

            matrixDelta[currentPoint][count] = 1;
            distSum +=  matrixDist[currentPoint][count];

            matrixDeltaPher = summDeltaAndAnt(matrixDeltaPher, matrixDelta, distSum, Q, circlesX, circlesY);
        }

        matrixPher = matrixSum(matrixPher, matrixDeltaPher, pherMinus, circlesX, circlesY);

        grafOutput(matrixPher, circlesX, circlesY);
        await sleep();
    }

    outputFinal(matrixPher, circlesX, circlesY);
    console.log(matrixPher);

    unblockButton();
}