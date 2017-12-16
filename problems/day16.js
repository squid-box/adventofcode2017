var utils = require('..\\common\\utils.js')

function ExecuteOperations(line, operations)
{
    operations.split(',').forEach(operation => 
    {
        switch(operation[0])
        {
            case 's':
                var x = Number(operation.substring(1))
                line = Spin(x, line)
                break
            case 'x':
                var tmp = operation.substring(1).split('/')
                line = Exchange(Number(tmp[0]), Number(tmp[1]), line)
                break
            case 'p':
                var tmp = operation.substring(1).split('/')
                line = Partner(tmp[0], tmp[1], line)
                break
        }
    })

    return line
}

function CreateList(size)
{
    var result = [size]

    for(var i = 0; i < size; i++)
    {
        result[i] = String.fromCharCode(97 + i)
    }

    return result
}

function Spin(x, array)
{
    var lastElements = array.slice(array.length - x)
    return lastElements.concat(array.slice(0,array.length - x))
}

function Exchange(a, b, array)
{
    var tmp = array[a]
    array[a] = array[b]
    array[b] = tmp

    return array
}

function Partner(a, b, array)
{
    var aIndex = array.indexOf(a)
    var bIndex = array.indexOf(b)

    return Exchange(aIndex, bIndex, array)
}

console.log("Test case 1: " + (utils.CompareArrays(ExecuteOperations(CreateList(5), "s1,x3/4,pe/b"), ['b','a','e','d','c'])))

var part1 = ExecuteOperations(CreateList(16), utils.GetInput(16))
console.log("Resulting order: " + part1.join(""))
