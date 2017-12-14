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

function FindProgramsConnectedTo(targetProgram, adjacencyList)
{
    var visitedNodes = new Set()
    var currentNode = targetProgram

    var nodesToVisit = adjacencyList[currentNode].splice(0)
    visitedNodes.add(currentNode)

    while(nodesToVisit.length != 0)
    {
        var nextNode = nodesToVisit[0]
        nodesToVisit.splice(0,1)
        visitedNodes.add(nextNode)
        
        adjacencyList[nextNode].forEach(node => 
        {
            if (!visitedNodes.has(node))
            {
                nodesToVisit.push(node)
            }
        })
    }
    
    return visitedNodes
}

function CountGroups(adjacencyList)
{
    var visitedNodes = new Set() 
    var groups = 0

    for(var i = 0; i < Object.keys(adjacencyList).length; i++)
    {
        if (visitedNodes.has[i])
        {
            continue
        }

        var connectedNodes = FindProgramsConnectedTo(i, adjacencyList)

        var diff = new Set()
        for(var x of connectedNodes) 
        {
            if(!visitedNodes.has(x)) diff.add(x);
        }

        if (diff.size != 0)
        {
            groups++
        }

        connectedNodes.forEach(node =>
        {
            visitedNodes.add(node)
        })
    }

    return groups
}

var testInput = "0 <-> 2\n1 <-> 1\n2 <-> 0, 3, 4\n3 <-> 2, 4\n4 <-> 2, 3, 6\n5 <-> 6\n6 <-> 4, 5\n"
console.log("Test case 1: " + (FindProgramsConnectedTo(0, CreateAdjacencyList(testInput)).size == 6))
console.log("Test case 2: " + (CountGroups(CreateAdjacencyList(testInput)) == 2))

console.log(FindProgramsConnectedTo(0, CreateAdjacencyList(require('..\\common\\utils.js').GetInput(12))).size + " programs connected to 0.")
console.log("List contains " + CountGroups(CreateAdjacencyList(require('..\\common\\utils.js').GetInput(12))) + " groups.")
