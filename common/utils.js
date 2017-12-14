exports.GetInput = function (day) 
{
    var input = require('fs').readFileSync(__dirname + "\\..\\input\\" + day + ".txt", 'utf8')
    
    return input.trim()
}

exports.CompareArrays = function (one, two)
{
    if (one.length != two.length)
    {
        return false
    }

    for(var i = 0; i < one.length; i++)
    {
        if (one[i] != two[i])
        {
            return false
        }
    }

    return true
}

exports.MakeIncrementalArray = function (length)
{
    var array = []

    for (var i = 0; i < length; i++)
    {
        array[i] = i
    }

    return array
}
