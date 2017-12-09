problemInput = require('..\\common\\utils.js').getInput(9)

function CountPoints(input)
{
    var points = 0
    var array = input.split('')

    var currentlyGarbage = false
    var groupception = 0
    var garbageChars = 0

    for(var i = 0; i < array.length; i++)
    {        
        switch(array[i])
        {
            case '!':
                i++
                break
            case '>':
                currentlyGarbage = false                
                break
            case '<':
                if (currentlyGarbage)
                {
                    garbageChars++
                }
                currentlyGarbage = true
                break
            case '{':
                if (!currentlyGarbage)
                {
                    groupception++
                }
                else
                {
                    garbageChars++
                }
                break
            case '}':
                if (!currentlyGarbage)
                {
                    points += groupception
                    groupception--
                }
                else
                {
                    garbageChars++
                }
                break
            default:
                if (currentlyGarbage)
                {
                    garbageChars++
                }
                break
        }
    }

    return {Score: points, RemovedGarbage: garbageChars}
}

console.log("Test case 1.1: " + (CountPoints("{}").Score == 1))
console.log("Test case 1.2: " + (CountPoints("{{{}}}").Score == 6))
console.log("Test case 1.3: " + (CountPoints("{{},{}}").Score == 5))
console.log("Test case 1.4: " + (CountPoints("{{{},{},{{}}}}").Score == 16))
console.log("Test case 1.5: " + (CountPoints("{<a>,<a>,<a>,<a>}").Score == 1))
console.log("Test case 1.6: " + (CountPoints("{{<ab>},{<ab>},{<ab>},{<ab>}}").Score == 9))
console.log("Test case 1.7: " + (CountPoints("{{<!!>},{<!!>},{<!!>},{<!!>}}").Score == 9))
console.log("Test case 1.8: " + (CountPoints("{{<a!>},{<a!>},{<a!>},{<ab>}}").Score == 3))

console.log("Test case 2.1: " + (CountPoints("<>").RemovedGarbage == 0))
console.log("Test case 2.2: " + (CountPoints("<random characters>").RemovedGarbage == 17))
console.log("Test case 2.3: " + (CountPoints("<<<<>").RemovedGarbage == 3))
console.log("Test case 2.4: " + (CountPoints("<{!>}>").RemovedGarbage == 2))
console.log("Test case 2.5: " + (CountPoints("<!!>").RemovedGarbage == 0))
console.log("Test case 2.6: " + (CountPoints("<!!!>>").RemovedGarbage == 0))
console.log("Test case 2.7: " + (CountPoints("<{o\"i!a,<{i<a>").RemovedGarbage == 10))

var results = CountPoints(problemInput)

console.log("Score: " + results.Score)
console.log("Removed " + results.RemovedGarbage + " characters.")
