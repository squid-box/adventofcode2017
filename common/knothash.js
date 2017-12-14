var utils = require('..\\common\\utils.js')

exports.SparseToDenseHash = function (sparseHash)
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

exports.DenseHashToString = function (denseHash)
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

exports.ConvertInputToAscii = function (input)
{
    var result = []

    input.split('').forEach(char => 
    {
        result.push(char.charCodeAt())
    })

    return result.concat([17, 31, 73, 47, 23])
}

exports.GenerateKnotHash = function (input)
{
    var ascii = this.ConvertInputToAscii(input)
    var list = utils.MakeIncrementalArray(256)

    var currentPos = 0
    var skipSize = 0

    for (var n = 0; n < 64; n++)
    {
        var res = this.IterateOverList(ascii, list, skipSize, currentPos)
        list = res.List
        currentPos = res.Position
        skipSize = res.SkipSize
    }

    var denseHash = this.SparseToDenseHash(list)

    return this.DenseHashToString(denseHash)
}

exports.IterateOverList = function (steps, list, skipSize, currentPos)
{
    steps.forEach(n => 
    {
        list = this.ReverseSection(list, currentPos, n)
        
        currentPos = (currentPos + n + skipSize)%list.length
        skipSize++
    })

    return {List: list, SkipSize: skipSize, Position: currentPos}
}

exports.ReverseSection = function (array, startIndex, length)
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
