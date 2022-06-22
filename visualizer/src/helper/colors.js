const colors = [
    "#E74C3C",
    "#95A5A6",
    "#FAD7A0",
    "#8E44AD",
    "#ff0000",
    "#00ff00",
    "#0000ff",
    "#ffff00",
    "#ff00ff",
    "#00ffff",
]

const dimensions = []

function eqSet(as, bs) {
    if (as.size !== bs.size) return false;
    for (var a of as) if (!bs.has(a)) return false;
    return true;
}

function indexOfDim(dim) {
    let pos = -1;
    for (let index in dimensions) {
        if (eqSet(dim, dimensions[index])) pos = index;
    }
    return pos;

}

export function getColor(dim) {
    dim = new Set([dim.x, dim.y, dim.z]);
    let pos = indexOfDim(dim);
    if (pos === -1) {
        dimensions.push(dim);
        pos = dimensions.length - 1; // new dim is last
    } 
    return colors[pos];
}