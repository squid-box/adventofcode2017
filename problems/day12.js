function FindNumberOfProgramsConnectedTo(targetProgram, adjacencyList)
{
    var countedNodes = new Set()
    var currentNode = targetProgram

    var nodesToSearch = adjacencyList[currentNode]

    while(nodesToSearch.length != 0)
    {
        var nextNode = nodesToSearch[0]
        nodesToSearch.splice(0,1)
        countedNodes.add(nextNode)
        
        adjacencyList[nextNode].forEach(node => 
        {
            if (!countedNodes.has(node))
            {
                nodesToSearch.push(node)
            }
        })
    }
    
    return countedNodes.size
}

function CreateAdjacencyList(input)
{
    var adjacencyList = {}

    input.split(/\n+/).forEach(line => 
    {
        if (line == "")
        {
            return
        }

        var parts = line.trim().split(" <-> ")
        var currentNode = Number(parts[0])

        if (!(currentNode in adjacencyList))
        {
            adjacencyList[currentNode] = []
        }
        
        if (parts[1].indexOf(',') == -1)
        {
            adjacencyList[currentNode].push(Number(parts[1].trim()))
        }
        else
        {
            parts[1].split(',').forEach(neighbour => 
            {
                adjacencyList[currentNode].push(Number(neighbour.trim()))
            })
        }        
    })

    return adjacencyList
}

var testInput = "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5\n"
var testAdjacencyList = CreateAdjacencyList(testInput)

console.log("Test case 1: " + (FindNumberOfProgramsConnectedTo(0, testAdjacencyList) == 6))

var adjacencyList = CreateAdjacencyList(require('..\\common\\utils.js').getInput(12))
console.log(FindNumberOfProgramsConnectedTo(0, adjacencyList) + " programs connected to 0.")
