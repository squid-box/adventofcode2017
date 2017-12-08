function ParseInstructions(input)
{
    var lines = input.split(/\n+/)
    var instructions = []

    lines.forEach(line => 
    {
        tmp = line.split(' ')
        instr = 
        {
            TargetRegister: tmp[0].trim(),
            Operation: tmp[1].trim(),
            Value: Number(tmp[2].trim()),
            ConditionalRegister: tmp[4].trim(),
            ConditionalOperator: tmp[5].trim(),
            ConditionalValue: Number(tmp[6].trim())
        }

        instructions.push(instr)
    });

    return instructions
}

function ExecuteInstructions(instructions)
{
    var registers = {}
    var allTimeHigh = -Infinity

    instructions.forEach(instruction => 
    {
        // Initialize register if missing
        if (!(instruction.TargetRegister in registers))
        {
            registers[instruction.TargetRegister] = 0
        }

        if (!(instruction.ConditionalRegister in registers))
        {
            registers[instruction.ConditionalRegister] = 0
        }

        // Only perform instruction if conditional values are met.
        if (DetermineConditional(registers, instruction.ConditionalRegister, instruction.ConditionalOperator, instruction.ConditionalValue))
        {
            if (instruction.Operation == "inc")
            {
                registers[instruction.TargetRegister] += instruction.Value
            }
            else
            {
                registers[instruction.TargetRegister] -= instruction.Value
            }
        }

        if (registers[instruction.TargetRegister] > allTimeHigh)
        {
            allTimeHigh = registers[instruction.TargetRegister]
        }
    })

    return {Registers: registers, AllTimeHigh: allTimeHigh}
}

function DetermineConditional(Registers, Register, Operator, Value)
{
    switch(Operator)
    {
        case ">":
            return Registers[Register] > Value
        case "<":
            return Registers[Register] < Value
        case "==":
            return Registers[Register] == Value
        case "!=":
            return Registers[Register] != Value
        case ">=":
            return Registers[Register] >= Value
        case "<=":
            return Registers[Register] <= Value
        default:
            console.log("ERROR: Unknown operator: " + Operator)
    }
}

function FindMaxValueInRegisters(registers)
{
    var max = -Infinity

    for (var register in registers)
    {
        if (registers[register] > max)
        {
            max = registers[register]
        }
    }    

    return max
}

var testData = "b inc 5 if a > 1\na inc 1 if b < 5\nc dec -10 if a >= 1\nc inc -20 if c == 10"
var testInstructions = ParseInstructions(testData)
var testResults = ExecuteInstructions(testInstructions)
console.log("Test case 1: " + (FindMaxValueInRegisters(testResults) == 1))

var problemInput = require('..\\common\\utils.js').getInput(8)
var instructions = ParseInstructions(problemInput)
var results = ExecuteInstructions(instructions)
console.log("Maximum value in registers is: " + FindMaxValueInRegisters(results.Registers))
console.log("Maximum all-time value in registers was: " + results.AllTimeHigh)
