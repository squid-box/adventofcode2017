// Utilities that can be used for most problems

exports.getInput = function (day) 
{
    var input = require('fs').readFileSync(__dirname + "\\..\\input\\" + day + ".txt", 'utf8')
    
    return input.trim()
}
