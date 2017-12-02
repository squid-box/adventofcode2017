function calculateChecksum(spreadsheet, part1)
{
    var sum = 0

    spreadsheet.split('\n').forEach(line => 
    {
        var lineNumbers = line.split(/\s+/g).map(Number)

        if (part1)
        {
            sum += MinMaxChecksum(lineNumbers)
        }
        else
        {
            sum += DivisorChecksum(lineNumbers)
        }
    })

    return sum
}

function MinMaxChecksum(lineNumbers)
{
    var max = Math.max.apply(Math,lineNumbers)
    var min = Math.min.apply(Math,lineNumbers)

    return Math.abs(max-min)
}

function DivisorChecksum(lineNumbers)
{
    for (i = 0; i < lineNumbers.length; i++)
    {
        for (x = 0; x < lineNumbers.length; x++)
        {
            if(x == i)
            {
                continue
            }

            if (lineNumbers[i] % lineNumbers[x] == 0)
            {
                var numbers = [lineNumbers[i], lineNumbers[x]]
                return Math.max.apply(Math,numbers) / Math.min.apply(Math,numbers)
            }
        }
    }
}

var testData1 = "5 1 9 5" + '\n' + "7 5 3" + '\n' + "2 4 6 8"
console.log("Test case 1: " + (calculateChecksum(testData1, true) == 18))

var testData2 = "5 9 2 8" + '\n' + "9 4 7 3" + '\n' + "3 8 6 5"
console.log("Test case 2: " + (calculateChecksum(testData2, false) == 9))

problemInput = require('..\\common\\utils.js').getInput(2)
console.log("Checksum pt1: " + calculateChecksum(problemInput, true))
console.log("Checksum pt2: " + calculateChecksum(problemInput, false))
