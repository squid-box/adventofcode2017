// Utilities that can be used for most problems

exports.getInput = function (day) 
{
    var input = require('fs').readFileSync(__dirname + "\\..\\input\\" + day + ".txt", 'utf8')
    
    return input.trim()
}

exports.compArray = function (one, two)
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
