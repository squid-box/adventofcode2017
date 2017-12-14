function ParseInput(input)
{
    var lines = input.split(/\n+/g)
    var nodes = {}

    lines.forEach(line => 
    {
        var tmp = line.split(' ')
        var node = {Name: tmp[0], Weight: Number(tmp[1].trim().slice(1, -1))}
        
        if (tmp[2] != undefined)
        {
            node.Children = []

            for (var i = 3; i < tmp.length; i++)
            {
                // Clean up the children
                node.Children.push(tmp[i].replace(',', '').trim())
            }
        }

        nodes[node.Name] = node
    })

    for (var key in nodes)
    {
        var node = nodes[key]
        if (node.Children != undefined)
        {            
            // Set parent for each child.
            node.Children.forEach(child => 
            {   
                nodes[child].Parent = node.Name
            })
        }
    }

    return nodes
}

function FindRoot(tree)
{
    for (var key in tree)
    {
        node = tree[key]
        
        if (node.Parent == undefined)
        {
            return node.Name
        }
    }
}

function CalculateWeight(tree, node)
{
    var weight = 0
    var currentNode = tree[node]

    if (currentNode.Children != undefined)
    {
        currentNode.Children.forEach(child => 
        {
            weight += CalculateWeight(tree, child)
        })        
    }

    return weight + currentNode.Weight
}

var testData = "pbga (66)\nxhth (57)\nebii (61)\nhavc (66)\nktlj (57)\nfwft (72) -> ktlj, cntj, xhth\nqoyq (66)\npadx (45) -> pbga, havc, qoyq\ntknk (41) -> ugml, padx, fwft\njptl (61)\nugml (68) -> gyxo, ebii, jptl\ngyxo (61)\ncntj (57)"
var testTree = ParseInput(testData)
var testTreeRoot = FindRoot(testTree)
console.log("Test case 1: " + (testTreeRoot == "tknk"))
console.log("Test case 2.1: " + (CalculateWeight(testTree, testTreeRoot) == 778))
console.log("Test case 2.2: " + (CalculateWeight(testTree, "fwft") == 243))

var problemInput = require('..\\common\\utils.js').GetInput(7)
var actualTree = ParseInput(problemInput)
var actualTreeRoot = FindRoot(actualTree)
console.log("Root of the tree: " + actualTreeRoot)

// Manual (bruteforce) solution to part 2, egbzge has balanced children, 
// but needs to lose 7 to balance the rest of the tree.

root = "egbzge"
console.log(root + " weighs: " + actualTree[root].Weight)
actualTree[root].Children.forEach(child =>
{    
    console.log(child + " weighs: " + (CalculateWeight(actualTree, child)))
})
