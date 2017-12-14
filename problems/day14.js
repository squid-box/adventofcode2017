var utils = require('..\\common\\utils.js')
var knothash = require('..\\common\\knothash.js')

function CountUsedSquares(input)
{
    var hashes = []
    
    for(var line = 0; line < 128; line++)
    {
        hashes[line] = ConvertLineToBits(knothash.GenerateKnotHash(input + '-' + line))
    }

    var usedSquares = 0
    hashes.forEach(hash => 
    {
        usedSquares += (hash.match(/1/g) || []).length;        
    })

    return usedSquares
}

function ConvertLineToBits(line)
{
    var result = ""

    line.split('').forEach(char => 
    {
        result += parseInt(char, 16).toString(2).slice(-4);
    })
    
    return result
}

console.log("Test case 1: " + (CountUsedSquares("flqrgnkx") == 8108))
console.log("Used squares: " + CountUsedSquares(utils.GetInput(10)))
