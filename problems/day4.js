var problemInput = require('..\\common\\utils.js').GetInput(4)

function CountValidPhrases(input)
{
    var noDupes = 0
    var noAnagrams = 0

    input.split('\n').forEach(line => 
    {
        if (PassphraseHasNoDupes(line))
        {
            noDupes++
        }
        if (PassphraseHasNoAnagrams(line))
        {
            noAnagrams++
        }
    });

    console.log("Pt1: Input contains " + noDupes + " valid passphrases.")
    console.log("Pt2: Input contains " + noAnagrams + " valid passphrases.")
}

function PassphraseHasNoDupes(phrase)
{
    var words = phrase.split(/\s+/g)

    return (new Set(words)).size === words.length;
}

function PassphraseHasNoAnagrams(phrase)
{
    var words = phrase.split(/\s+/g)

    var sortedWords = []
    words.forEach(word => 
    {
        sortedWords.push(word.split("").sort().join(""))
    });

    return (new Set(sortedWords)).size === sortedWords.length;
}

var testData1 = "aa bb cc dd ee"
var testData2 = "aa bb cc dd aa"
var testData3 = "aa bb cc dd aaa"

console.log("Test 1.1: " + (PassphraseHasNoDupes(testData1) == true))
console.log("Test 1.2: " + (PassphraseHasNoDupes(testData2) == false))
console.log("Test 1.3: " + (PassphraseHasNoDupes(testData3) == true))

var testData4 = "abcde fghij"
var testData5 = "abcde xyz ecdab"
var testData6 = "a ab abc abd abf abj"
var testData7 = "iiii oiii ooii oooi oooo"
var testData8 = "oiii ioii iioi iiio"

console.log("Test 2.1: " + (PassphraseHasNoAnagrams(testData4) == true))
console.log("Test 2.2: " + (PassphraseHasNoAnagrams(testData5) == false))
console.log("Test 2.3: " + (PassphraseHasNoAnagrams(testData6) == true))
console.log("Test 2.4: " + (PassphraseHasNoAnagrams(testData7) == true))
console.log("Test 2.5: " + (PassphraseHasNoAnagrams(testData8) == false))

CountValidPhrases(problemInput)
