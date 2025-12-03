import fs from 'fs';

const parseData = (data) => {
    // parse the data here
    return data.split(',');
};

const expandRanges = (range) => {
    const [begin, end] = range;
    const a = parseInt(begin);
    const b = parseInt(end);
    return [...Array(b - a + 1).keys()].map(i => i + a + '');
};
const isInvalid = (id) => {
    const buildRegex = (size) => {
        const dots = '.'.repeat(size)
        const regex = `^(${dots})\\1*`;
        return new RegExp(regex);
    }; 
    for(let i=1; i<=id.length/2; i++) {
        const regex = buildRegex(i);
        const match = regex.exec(id)[0];
        if (match.length == id.length) {
            console.log({id, match})
            return true;
        }
    }
    return false;
};

const solve = (data) => {
    const parsedData = parseData(data);
    //solve the puzzle here
    const ranges = parsedData.map((idRange) => {
        return idRange.split('-')
    });
    const ids = ranges.flatMap(expandRanges);
    const solution = ids.filter(isInvalid).reduce((acc, next) => acc + parseInt(next), 0);
    return solution
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();
