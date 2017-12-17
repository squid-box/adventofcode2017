function FillBuffer(stepSize, target)
{
    var buffer = [0]
    var currentPosition = 0

    for(var i = 1; i <= target; i++)
    {
        currentPosition = (currentPosition + stepSize + 1) % buffer.length
        buffer.splice(currentPosition+1, 0, i)
    }

    return buffer[currentPosition+2]
}

console.log("Test case 1: " + (FillBuffer(3, 2017) == 638))

console.log("Value after '2017': " + FillBuffer(371, 2017))
