var direction = 
{
    north: {X: 0, Y: -1},
    south: {X: 0, Y: 1},
    northwest: {X: -1, Y: -0.5},
    southwest: {X: -1, Y: 0.5},
    northeast: {X: 1, Y: -0.5},
    southeast: {X: 1, Y: 0.5}
}

function FindFinalPosition(path)
{
    pos = {X: 0, Y:0}

    path.split(',').forEach(step => 
    {
        pos = MovePos(pos, step)
    })

    return pos
}

function MovePos(pos, step)
{
    switch(step)
    {
        case "n":
            pos = Move(pos, direction.north)
            break
        case "s":
            pos = Move(pos, direction.south)
            break
        case "nw":
            pos = Move(pos, direction.northwest)
            break
        case "sw":
            pos = Move(pos, direction.southwest)
            break
        case "ne":
            pos = Move(pos, direction.northeast)
            break
        case "se":
            pos = Move(pos, direction.southeast)
            break
    }

    return pos
}

function Move(pos, direction)
{    
    return {X: (pos.X + direction.X), Y: (pos.Y + direction.Y)}
}

function CoordinatesAreEqual(one, two)
{
    return (one.X == two.Y) && (one.Y == two.Y)
}

function FindStepsToOrigin(pos)
{
    var steps = 0
    
    while (!CoordinatesAreEqual(pos, {X: 0, Y: 0}))
    {
        if (pos.X == 0)
        {
            if (pos.Y > 0)
            {
                pos = Move(pos, direction.north)
            }
            else
            {
                pos = Move(pos, direction.south)
            }            
        }
        else if (pos.X > 0)
        {
            if (pos.Y > 0)
            {
                pos = Move(pos, direction.northwest)
            }
            else
            {
                pos = Move(pos, direction.southwest)
            }
        }
        else
        {
            if (pos.Y > 0)
            {
                pos = Move(pos, direction.northeast)
            }
            else
            {
                pos = Move(pos, direction.southeast)
            }
        }

        steps++
    }
    
    return steps
}

function FindFurthestPoint(path)
{
    var maxDistance = -Infinity
    pos = {X: 0, Y:0}
    
    path.split(',').forEach(step => 
    {
        pos = MovePos(pos, step)
        distance = FindStepsToOrigin(pos)

        if (distance > maxDistance)
        {
            maxDistance = distance
        }
    })

    return maxDistance
}

console.log("Test case 1: " + (FindStepsToOrigin(FindFinalPosition("ne,ne,ne")) == 3))
console.log("Test case 2: " + (FindStepsToOrigin(FindFinalPosition("ne,ne,sw,sw")) == 0))
console.log("Test case 3: " + (FindStepsToOrigin(FindFinalPosition("ne,ne,s,s")) == 2))
console.log("Test case 4: " + (FindStepsToOrigin(FindFinalPosition("se,sw,se,sw,sw")) == 3))

problemInput = require('..\\common\\utils.js').GetInput(11)
console.log("Child is " + FindStepsToOrigin(FindFinalPosition(problemInput)) + " steps away.")
console.log("Child was at most " + FindFurthestPoint(problemInput) + " steps away.")
