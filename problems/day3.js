function PosToString(x, y)
{
    return x + "," + y;
}

function FindDistanceTo(targetSquare)
{
    var currentX = 0
    var currentY = 0

    var lastMove = "down"
    var memoryGrid = []

    memoryGrid[PosToString(0,0)] = 1

    // Let's generate the spiral until we find the memory position.
    for (currentSquare = 2; currentSquare <= targetSquare; currentSquare++)
    {
        if (lastMove == "down")
        {
            // Check right side
            if (memoryGrid[PosToString(currentX+1,currentY)] == undefined)
            {
                // No memory set on the right side, means we move to the right.
                currentX += 1
                lastMove = "right"
            }
            else
            {
                // Memory exists on the right side, we keep moving down.
                currentY += 1
            }
        }
        else if (lastMove == "right")
        {
            // Check above
            if (memoryGrid[PosToString(currentX,currentY-1)] == undefined)
            {
                // No memory set above, means we move up.
                currentY -= 1
                lastMove = "up"
            }
            else
            {
                // Memory set above, we keep moving right.
                currentX += 1
            }
        }
        else if (lastMove == "up")
        {
            // Check left
            if (memoryGrid[PosToString(currentX-1,currentY)] == undefined)
            {
                // No memory set to the left, means we move left.
                currentX -= 1
                lastMove = "left"
            }
            else
            {
                // Memory set to the left, we keep moving up.
                currentY -= 1
            }
        }
        else if (lastMove == "left")
        {
            // Check below
            if (memoryGrid[PosToString(currentX,currentY+1)] == undefined)
            {
                // No memory set below, means we move down.
                currentY += 1
                lastMove = "down"
            }
            else
            {
                // Memory set below, we keep moving left.
                currentX -= 1
            }
        }

        memoryGrid[PosToString(currentX,currentY)] = currentSquare
    }

    return Math.abs(currentX) + Math.abs(currentY)
}

function NeighbourSum(grid, x, y)
{
    sum = 0

    for (var dX = -1; dX < 2; dX++)
    {
        for(var dY = -1; dY < 2; dY++)
        {
            if (dY == 0 && dX == 0)
            {
                continue
            }

            if (grid[PosToString(x + dX, y + dY)] != undefined)
            {
                sum += grid[PosToString(x + dX, y + dY)]
            }
        }
    }

    return sum
}

function FindValueLargerThan(value)
{
    var currentX = 0
    var currentY = 0

    var lastMove = "down"
    var memoryGrid = []

    memoryGrid[PosToString(0,0)] = 1

    // Let's generate the spiral until we find out memory position.
    while(true)
    {
        if (lastMove == "down")
        {
            // Check right side
            if (memoryGrid[PosToString(currentX+1,currentY)] == undefined)
            {
                // No memory set on the right side, means we move to the right.
                currentX += 1
                lastMove = "right"
            }
            else
            {
                // Memory exists on the right side, we keep moving down.
                currentY += 1
            }
        }
        else if (lastMove == "right")
        {
            // Check above
            if (memoryGrid[PosToString(currentX,currentY-1)] == undefined)
            {
                // No memory set above, means we move up.
                currentY -= 1
                lastMove = "up"
            }
            else
            {
                // Memory set above, we keep moving right.
                currentX += 1
            }
        }
        else if (lastMove == "up")
        {
            // Check left
            if (memoryGrid[PosToString(currentX-1,currentY)] == undefined)
            {
                // No memory set to the left, means we move left.
                currentX -= 1
                lastMove = "left"
            }
            else
            {
                // Memory set to the left, we keep moving up.
                currentY -= 1
            }
        }
        else if (lastMove == "left")
        {
            // Check below
            if (memoryGrid[PosToString(currentX,currentY+1)] == undefined)
            {
                // No memory set below, means we move down.
                currentY += 1
                lastMove = "down"
            }
            else
            {
                // Memory set below, we keep moving left.
                currentX -= 1
            }
        }

        memoryGrid[PosToString(currentX,currentY)] = NeighbourSum(memoryGrid, currentX, currentY)

        if (memoryGrid[PosToString(currentX,currentY)] > value)
        {
            return memoryGrid[PosToString(currentX,currentY)]
        }
    }
}

console.log("Test case 1: " + (FindDistanceTo(1) == 0))
console.log("Test case 2: " + (FindDistanceTo(12) == 3))
console.log("Test case 3: " + (FindDistanceTo(23) == 2))
console.log("Test case 4: " + (FindDistanceTo(1024) == 31))

problemInput = 347991
console.log("Answer pt1: " + FindDistanceTo(problemInput))
console.log("Answer pt2: " + FindValueLargerThan(problemInput))
