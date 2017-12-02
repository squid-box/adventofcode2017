function calculateFirstChecksum(spreadsheet)
{
    var sum = 0

    spreadsheet.split('\n').forEach(line => 
    {
        if (line == "")
        {
            return    
        }

        var lineNumbers = line.split(/\s+/g).map(Number)

        var max = Math.max.apply(Math,lineNumbers)
        var min = Math.min.apply(Math,lineNumbers)

        sum += Math.abs(max-min)
    });

    return sum
}

function calculateSecondChecksum(spreadsheet)
{
    var sum = 0
    
        spreadsheet.split('\n').forEach(line => 
        {
            if (line == "")
            {
                return    
            }
    
            var lineNumbers = line.split(/\s+/g).map(Number)

            var foundNumbers = false
    
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
                        numbers = [lineNumbers[i], lineNumbers[x]]
                        
                        sum += Math.max.apply(Math,numbers) / Math.min.apply(Math,numbers)
                        foundNumbers = true
                    }

                    if (foundNumbers)
                    {
                        break
                    }
                }
                if (foundNumbers)
                {
                    break
                }
            }
        });
    
        return sum
}

var testData1 = "5 1 9 5" + '\n' + "7 5 3" + '\n' + "2 4 6 8"
console.log("Test case 1: " + (calculateFirstChecksum(testData1) == 18))

var testData2 = "5 9 2 8" + '\n' + "9 4 7 3" + '\n' + "3 8 6 5"
console.log("Test case 2: " + (calculateSecondChecksum(testData2) == 9))

problemInput = require('..\\common\\utils.js').getInput(2)
console.log("Checksum pt1: " + calculateFirstChecksum(problemInput))
console.log("Checksum pt2: " + calculateSecondChecksum(problemInput))
