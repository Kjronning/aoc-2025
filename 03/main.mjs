import fs from 'fs';
import { reduceSum } from '../common/math.mjs';


const getLargest = (arr) => {
    let index = 0;
    const largest = arr.reduce((acc, next, i) => {
        if(next > acc) {
            index = i;
            return next;
        }
        return acc;
    })
    return [largest, index];
};

const getNthValue = (bank, i, n) => {
    const subBank = bank.slice(i, bank.length-n+1)
    console.log({subBank, i, n})
    return getLargest(subBank);
}

const getJoltage = (bank) => {
    let total = '';
    let index = 0;
    for(let i=12; i>0; i--) {
        const [val, n] = getNthValue(bank, index, i);
        console.log({val, n})
        total += val;
        index = index + n + 1;
    }
    console.log({total});
    return parseInt(total);
}

const parseData = (data) => {
    return data.split('\n').map(bank => bank.split('').map(n => parseInt(n)));
};

const solve = (data) => {
    const banks = parseData(data);
    const solution = banks.map(getJoltage).reduce(reduceSum);
    return solution
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();