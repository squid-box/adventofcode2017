var utils = require('..\\common\\utils.js')
var knothash = require('..\\common\\knothash.js')

function OnePass(listSize, steps)
{
    var list = utils.MakeZeroArray(listSize)
    var skipSize = 0
    var currentPos = 0

    steps = steps.split(',').map(Number)

    return knothash.IterateOverList(steps, list, skipSize, currentPos).List
}

console.log("Test case 1.1: " + utils.CompareArrays(knothash.ReverseSection([0,1,2,3,4], 0, 3), [2,1,0,3,4]))
console.log("Test case 1.2: " + utils.CompareArrays(knothash.ReverseSection([2,1,0,3,4], 3, 4), [4,3,0,1,2]))
console.log("Test case 1.3: " + utils.CompareArrays(knothash.ReverseSection([4,3,0,1,2], 1, 1), [4,3,0,1,2]))
console.log("Test case 1.4: " + utils.CompareArrays(knothash.ReverseSection([4,3,0,1,2], 1, 5), [3,4,2,1,0]))
console.log("Test case 1.5: " + utils.CompareArrays(OnePass(5, "3,4,1,5"), [3,4,2,1,0]))

console.log("ASCII conversion: " + (utils.CompareArrays(knothash.ConvertInputToAscii("1,2,3"),[49, 44, 50, 44, 51, 17, 31, 73, 47, 23])))

console.log("Test case 2.1: " + (knothash.GenerateKnotHash("") == "a2582a3a0e66e6e86e3812dcb672a272"))
console.log("Test case 2.1: " + (knothash.GenerateKnotHash("AoC 2017") == "33efeb34ea91902bb2f59c9920caa6cd"))
console.log("Test case 2.1: " + (knothash.GenerateKnotHash("1,2,3") == "3efbe78a8d82f29979031a4aa0b16a9d"))
console.log("Test case 2.1: " + (knothash.GenerateKnotHash("1,2,4") == "63960835bcdc130f0b66d7ff4f6a5a8e"))

var problemInput = utils.GetInput(10)
var resultingList = OnePass(256, problemInput)
console.log("First two elements multiplied is: " + resultingList[0]*resultingList[1])
console.log("Knot hash for test input is: " + knothash.GenerateKnotHash(problemInput))
