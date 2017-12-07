function ParseInput(input)
{
    var lines = input.split(/\n+/)

    var nodes = {}

    lines.forEach(line => 
    {
        var tmp = line.split(' ')
        var node = {Name: tmp[0], Weight: Number(tmp[1].slice(1, -1))}

        if (tmp[2] != undefined)
        {
            node.Children = []

            for (var i = 3; i < tmp.length; i++)
            {
                node.Children.push(tmp[i].replace(',', ''))
            }
        }

        nodes[node.Name] = node
    })

    for (var key in nodes)
    {
        var node = nodes[key]
        if (node.Children != undefined)
        {
            node.Children.forEach(child => 
            {
                nodes[child].Parent = node
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

var testData = "pbga (66)\nxhth (57)\nebii (61)\nhavc (66)\nktlj (57)\nfwft (72) -> ktlj, cntj, xhth\nqoyq (66)\npadx (45) -> pbga, havc, qoyq\ntknk (41) -> ugml, padx, fwft\njptl (61)\nugml (68) -> gyxo, ebii, jptl\ngyxo (61)\ncntj (57)"
var testTree = ParseInput(testData)
console.log("Test case 1: " + (FindRoot(testTree) == "tknk"))

var problemInput = require('..\\common\\utils.js').getInput(7)
var actualTree = ParseInput(problemInput)
console.log("Root of the tree: " + FindRoot(actualTree))
