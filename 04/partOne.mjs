
const parseData = (data) => {
    const pd = data.replaceAll('.', 0).replaceAll('@', 1).split('\n').map(a => a.split('').map(n => parseInt(n)));
    // parse the data here
    return pd;
};

const addNeighbours = (currentArray, nextArray, x, columnCount) => {
    if(currentArray[x] == 0) {
        return;
    }
    if (columnCount > x && currentArray[x + 1] > 0) {
        currentArray[x]++;
        currentArray[x + 1]++;
    }
    if(!nextArray) {
        return;
    }
    if(nextArray[x] > 0) {
        currentArray[x]++;
        nextArray[x]++;
    }
    if(columnCount > x && nextArray[x + 1] > 0) {
        currentArray[x]++;
        nextArray[x + 1]++;
    }
    if(x > 0 && nextArray[x - 1] > 0) {
        currentArray[x]++;
        nextArray[x - 1]++;
    }
    return;
}

const solve = (data) => {
    const parsedData = parseData(data);
    console.log(parsedData);
    const rowCount = parsedData.length;
    const columnCount = parsedData[0].length;
    for (let i = 0; i<rowCount; i++) {
        for (let j = 0; j<columnCount; j++) {
            const thisRow = parsedData[i];
            const nextRow = i < rowCount -1 ? parsedData[i + 1] : null;
            addNeighbours(thisRow, nextRow, j, columnCount);
        }
    }
    console.log(parsedData);
    const solution = parsedData.flatMap(a => a).filter(a => a > 0 && a < 5).length;
    return solution
};
