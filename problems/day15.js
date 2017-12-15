class Generator
{
    constructor(factor, initialValue, makesMultiplesOf)
    {
        this.Factor = factor
        this.PreviousValue = initialValue
        this.Multiples = makesMultiplesOf
    }

    nextValue()
    {
        var nextValue = (this.PreviousValue * this.Factor) % 2147483647
        this.PreviousValue = nextValue
        
        return nextValue
    }

    nextMultipleValue()
    {
        var nextValue = this.nextValue()

        while (nextValue % this.Multiples != 0)
        {
            nextValue = this.nextValue()
        }

        return nextValue
    }
}

function JudgePairs(initialValueA, initialValueB, multipleA, multipleB, iterations)
{
    var genA = new Generator(16807, initialValueA, multipleA)
    var genB = new Generator(48271, initialValueB, multipleB)

    var count = 0

    for (var i = 0; i < iterations; i++)
    {
        var a = genA.nextMultipleValue()
        var b = genB.nextMultipleValue()

        if ((a & 0xffff) == (b & 0xffff))
        {
            count++
        }
    }

    return count
}

console.log("Test case 1: " + (JudgePairs(65, 8921, 1, 1, 40000000) == 588))
console.log("Test case 2: " + (JudgePairs(65, 8921, 4, 8, 5000000) == 309))

console.log("Part 1: " + JudgePairs(722, 354, 1, 1, 40000000))
console.log("Part 2: " + JudgePairs(722, 354, 4, 8, 5000000))
