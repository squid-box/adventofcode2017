var problemInput = require('..\\common\\utils.js').getInput(5)

function FindStepsOutsideListPt1(input)
{
    var instructions = input.split(/\n+/).map(Number)

    var i = 0
    var steps = 0

    while(i < instructions.length)
    {
        var currentInstruction = instructions[i]
        instructions[i]++
        i += currentInstruction
        steps++
    }

    return steps
}

function FindStepsOutsideListPt2(input)
{
    var instructions = input.split(/\n+/).map(Number)

    var i = 0
    var steps = 0

    while(i < instructions.length)
    {
        var currentInstruction = instructions[i]
                
        if (currentInstruction >= 3)
        {
            instructions[i]--
        } 
        else
        {
            instructions[i]++
        }

        i += currentInstruction
        steps++
    }

    return steps
}

var testData = "0\n3\n0\n1\n-3"
console.log("Test 1: " + (FindStepsOutsideListPt1(testData) == 5))
console.log("Test 2: " + (FindStepsOutsideListPt2(testData) == 10))

console.log("Pt1: " + FindStepsOutsideListPt1(problemInput))
console.log("Pt2: " + FindStepsOutsideListPt2(problemInput))