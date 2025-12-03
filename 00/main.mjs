import fs from 'fs';

const parseData = (data) => {
    // parse the data here
    return data;
};

const solve = (data) => {
    const parsedData = parseData(data);
    //solve the puzzle here
    const solution = '';
    return solution
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();