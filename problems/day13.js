class Scanner
{
    constructor(layerDepth)
    {
        this.LayerDepth = layerDepth
        this.Position = 0
        this.GoingDown = true
    }

    move()
    {
        if (this.GoingDown)
        {
            this.Position++

            if (this.Position == this.LayerDepth-1)
            {
                this.GoingDown = false
            }
        }
        else
        {
            this.Position--
            
            if (this.Position == 0)
            {
                this.GoingDown = true
            }
        }
    }
}

class Firewall
{
    constructor(input)
    {
        this.createFirewall(input)
        this.Severity = 0
        this.MyPosition = 0
        this.PicoSecond = 0
    }

    createFirewall(input)
    {
        this.Layers = []
        this.Scanners = []
        
        var lines = input.trim().split(/\n+/)
        var currentLine = 0
        var currentLayer = 0
    
        var finalLayer = Number(lines[lines.length-1].split(": ")[0])
    
        for(var i = 0; i <= finalLayer; i++)
        {
            var line = lines[currentLine].split(": ")
    
            if (Number(line[0]) == i)
            {
                this.Layers[i] = Number(line[1])
                this.Scanners[i] = new Scanner(this.Layers[i])
                currentLine++
            }        
            else
            {
                this.Layers[i] = 0
            }
        }
    }

    updateFirewall()
    {
        if (this.PicoSecond != 0)
        {
            this.MyPosition++
        }        

        if (this.Scanners[this.MyPosition] != undefined)
        {
            if (this.Scanners[this.MyPosition].Position == 0)
            {
                // We've been detected!
                this.Severity += this.MyPosition * this.Layers[this.MyPosition]
            }
        }

        // Move scanners
        this.Scanners.forEach(scanner => 
        {
            if (scanner != undefined)
            {
                scanner.move()
            }
        })
        
        this.PicoSecond++
    }
}

function CalculateSeverity(input)
{
    var firewall = new Firewall(input)

    for (var i = 0; i < firewall.Layers.length; i++)
    {
        firewall.updateFirewall()
    }

    return firewall.Severity
}

var testData = "0: 3\n1: 2\n4: 4\n6: 4\n"
console.log("Test case 1: " + (CalculateSeverity(testData) == 24))

var problemInput = require('..\\common\\utils.js').GetInput(13)
console.log("Severity is: " + CalculateSeverity(problemInput))
