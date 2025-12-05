import fs from 'fs';

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

const countAndRemoveRolls = (paperMatrix) => {
const rowCount = paperMatrix.length;
const columnCount = paperMatrix[0].length;
    for (let i = 0; i<rowCount; i++) {
        for (let j = 0; j<columnCount; j++) {
            const thisRow = paperMatrix[i];
            const nextRow = i < rowCount -1 ? paperMatrix[i + 1] : null;
            addNeighbours(thisRow, nextRow, j, columnCount);
        }
    }
    const removedRolls = paperMatrix.flatMap(a => a).filter(a => a > 0 && a < 5).length;
    const newMatrix = paperMatrix.map(row => row.map(a => a < 5 ? 0 : 1));
    return [newMatrix, removedRolls];
}

const solve = (data) => {
    const parsedData = parseData(data);
    let paperMatrix = parsedData;
    let totalRolls = 0;
    while(true) {
        const [newMatrix, removedRolls] = countAndRemoveRolls(paperMatrix);
        totalRolls += removedRolls;
        paperMatrix = newMatrix;
        if (removedRolls == 0) {
            break;
        }
    };
    return totalRolls;
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();