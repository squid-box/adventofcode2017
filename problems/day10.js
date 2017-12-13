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

function IterateOverList(steps, list, skipSize, currentPos)
{
    steps.forEach(n => 
    {
        list = ReverseSection(list, currentPos, n)
        
        currentPos = (currentPos + n + skipSize)%list.length
        skipSize++
    })

    return {List: list, SkipSize: skipSize, Position: currentPos}
}

function OnePass(listSize, steps)
{
    var list = MakeArray(listSize)
    var skipSize = 0
    var currentPos = 0

    steps = steps.split(',').map(Number)

    return IterateOverList(steps, list, skipSize, currentPos).List
}

function GenerateKnotHash(input)
{
    var ascii = ConvertInputToAscii(input)
    var list = MakeArray(256)

    var currentPos = 0
    var skipSize = 0

    for (var n = 0; n < 64; n++)
    {
        var res = IterateOverList(ascii, list, skipSize, currentPos)
        list = res.List
        currentPos = res.Position
        skipSize = res.SkipSize
    }

    var denseHash = SparseToDenseHash(list)

    return DenseHashToString(denseHash)
}

function SparseToDenseHash(sparseHash)
{
    var denseHash = [16]

    for (var i = 0; i < 16; i++)
    {
        denseHash[i] = 0

        for(var j = 0; j < 16; j++)
        {
            denseHash[i] = denseHash[i] ^ sparseHash[(i*16)+j]
        }
    }

    return denseHash
}

function DenseHashToString(denseHash)
{
    var result = ""

    for(var i = 0; i < 16; i++)
    {
        var tmp = denseHash[i].toString(16)
        if (tmp.length < 2)
        {
            result += "0"
        }
        result += tmp
    }

    return result
}

function ConvertInputToAscii(input)
{
    var result = []

    input.split('').forEach(char => 
    {
        result.push(char.charCodeAt())
    })

    return result.concat([17, 31, 73, 47, 23])
}

console.log("Test case 1.1: " + utils.compArray(ReverseSection([0,1,2,3,4], 0, 3), [2,1,0,3,4]))
console.log("Test case 1.2: " + utils.compArray(ReverseSection([2,1,0,3,4], 3, 4), [4,3,0,1,2]))
console.log("Test case 1.3: " + utils.compArray(ReverseSection([4,3,0,1,2], 1, 1), [4,3,0,1,2]))
console.log("Test case 1.4: " + utils.compArray(ReverseSection([4,3,0,1,2], 1, 5), [3,4,2,1,0]))
console.log("Test case 1.5: " + utils.compArray(OnePass(5, "3,4,1,5"), [3,4,2,1,0]))

console.log("ASCII conversion: " + (utils.compArray(ConvertInputToAscii("1,2,3"),[49, 44, 50, 44, 51, 17, 31, 73, 47, 23])))

console.log("Test case 2.1: " + (GenerateKnotHash("") == "a2582a3a0e66e6e86e3812dcb672a272"))
console.log("Test case 2.1: " + (GenerateKnotHash("AoC 2017") == "33efeb34ea91902bb2f59c9920caa6cd"))
console.log("Test case 2.1: " + (GenerateKnotHash("1,2,3") == "3efbe78a8d82f29979031a4aa0b16a9d"))
console.log("Test case 2.1: " + (GenerateKnotHash("1,2,4") == "63960835bcdc130f0b66d7ff4f6a5a8e"))

var problemInput = utils.getInput(10)
var resultingList = OnePass(256, problemInput)
console.log("First two elements multiplied is: " + resultingList[0]*resultingList[1])
console.log("Knot hash for test input is: " + GenerateKnotHash(problemInput))
