function FindMaxIndex(list)
{
    var maxI = -1
    var max = 0
    
    for(i = 0; i < list.length; i++)
    {
        if (list[i] > max)
        {
            max = list[i]
            maxI = i
        }
    }

    return maxI
}

function FindFirstRepeat(input)
{
    var memoryState = input.split(/\s+/g).map(Number)

    var knownStates = new Set()
    var cycles = 0

    while(true)
    {
        RunCycle(memoryState)

        cycles++

        if (knownStates.has(memoryState.join()))
        {
            break
        }        

        knownStates.add(memoryState.join())
    }

    return {Cycles: cycles, State: memoryState}
}

function FindNextRepeat(memoryState)
{
    var cycles = 0
    var target = memoryState.join()

    while(true)
    {
        RunCycle(memoryState)
        cycles++

        if (memoryState.join() == target)
        {
            break
        }
    }

    return cycles
}

function RunCycle(memoryState)
{
    var i = FindMaxIndex(memoryState)
    
    var val = memoryState[i]
    memoryState[i] = 0

    while (val != 0)
    {
        i++
        i = i % memoryState.length
        memoryState[i]++
        val--
    }
}

var testData = "0\t2\t7\t0"
var testFirstRun = FindFirstRepeat(testData)
console.log("Test case 1: " + (testFirstRun.Cycles == 5))
console.log("Test case 2: " + (FindNextRepeat(testFirstRun.State) == 4))

var problemInput = require('..\\common\\utils.js').GetInput(6)
var partOne = FindFirstRepeat(problemInput)
console.log("First repeat occurs after " + partOne.Cycles + " cycles.")
console.log("Same sequence occurs every " + FindNextRepeat(partOne.State) + " cycles.")

