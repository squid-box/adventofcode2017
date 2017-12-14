function Solve(input, compareIndex)
{
    var array = input.split('')
    var sum = 0

    for (i = 0; i < array.length; i++)
    {
        var compareTo = array[(i+compareIndex) % array.length]

        if (array[i] == compareTo)
        {
            sum += Number(array[i])
        }
    }

    return sum
}

console.log("Test case 1.1: " + (Solve("1122", 1) == 3))
console.log("Test case 1.2: " + (Solve("1111", 1) == 4))
console.log("Test case 1.3: " + (Solve("1234", 1) == 0))
console.log("Test case 1.4: " + (Solve("91212129", 1) == 9))
console.log('\n')

console.log("Test case 2.1: " + (Solve("1212", 4/2) == 6))
console.log("Test case 2.2: " + (Solve("1221", 4/2) == 0))
console.log("Test case 2.3: " + (Solve("123425", 6/2) == 4))
console.log("Test case 2.4: " + (Solve("123123", 6/2) == 12))
console.log("Test case 2.5: " + (Solve("12131415", 8/2) == 4))
console.log('\n')

problemInput = require('..\\common\\utils.js').GetInput(1)

console.log("Part 1: " + (Solve(problemInput,1)))
console.log("Part 2: " + (Solve(problemInput,problemInput.length/2)))
