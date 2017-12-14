exports.Union = function (one, two)
{
    return new Set([...one, ...two])
}

exports.Intersection = function (one, two)
{
    return new Set([...one].filter(x => two.has(x)));
}

exports.Difference = function (one, two)
{
    return new Set([...one].filter(x => !two.has(x)));
}
