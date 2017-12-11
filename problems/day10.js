var utils = require('..\\common\\utils.js')

function ReverseSection(array, startIndex, length)
{
    if (length <= 1)
    {
        return array
    }

    var section = []
    var sectionIndex = 0

    for(var i = startIndex; i < startIndex+length; i++)
    {
        section[sectionIndex] = array[i%array.length]
        sectionIndex++
    }

    section.reverse()

    var reverseIndex = 0
    for(var i = startIndex; i < startIndex+length; i++)
    {
        array[i%array.length] = section[reverseIndex]
        reverseIndex++
    }

    return array
}

function MakeArray(length)
{
    var array = []

    for (var i = 0; i < length; i++)
    {
        array[i] = i
    }

    return array
}

function IterateOverList(steps, listSize)
{
    var skipSize = 0
    var currentPos = 0

    var list = MakeArray(listSize)

    steps.split(',').map(Number).forEach(n => 
    {
        list = ReverseSection(list, currentPos, n)
        
        currentPos = (currentPos + n + skipSize)%list.length
        skipSize++
    })

    return list
}

console.log("Test case 1: " + utils.compArray(ReverseSection([0,1,2,3,4], 0, 3), [2,1,0,3,4]))
console.log("Test case 2: " + utils.compArray(ReverseSection([2,1,0,3,4], 3, 4), [4,3,0,1,2]))
console.log("Test case 3: " + utils.compArray(ReverseSection([4,3,0,1,2], 1, 1), [4,3,0,1,2]))
console.log("Test case 4: " + utils.compArray(ReverseSection([4,3,0,1,2], 1, 5), [3,4,2,1,0]))
console.log("Test case 5: " + utils.compArray(IterateOverList("3,4,1,5", 5), [3,4,2,1,0]))

var problemInput = utils.getInput(10)
var resultingList = IterateOverList(problemInput, 256)
console.log("First two elements multiplied is: " + resultingList[0]*resultingList[1])
