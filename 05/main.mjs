import fs from 'fs';
import { reduceSum } from '../common/math.mjs';

const parseData = (data) => {
    const [a, _] = data.split('\n\n');
    const ranges = a.split('\n').map(n => n.split('-').map(n => parseInt(n)));
    // parse the data here
    return [ranges];
};

const solve = (data) => {
    const [ranges] = parseData(data);
    //solve the puzzle here
    const sortedRanges = ranges.sort((a,b) => a[0] - b[0]);
    console.log(sortedRanges);
    const mergedRanges = [];
    for(let i=0; i<sortedRanges.length-1; i++) {
        let current = sortedRanges[i];
        while(true) {
            if(i == sortedRanges.length-1) {
                break;
            }
            let next = sortedRanges[i+1];
            if(current[1] >= next[0]) {
                current[1] = Math.max(current[1], next[1]);
                i++
            } else {
                break;
            }
        }
        mergedRanges.push(current);
    }
    console.log(mergedRanges);
    const solution = mergedRanges.map(a => a[1]-a[0]+1).reduce(reduceSum);
    return solution
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();