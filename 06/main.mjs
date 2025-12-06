import fs from 'fs';
import { reduceSum, reduceMult } from '../common/math.mjs';

const parseData = (data) => {
    const rows = data.split('\n');
    const findOperationRegex = /\*|\+/;
    const columns = [];
    let operations = rows[rows.length-1];
    let begin = operations.search(findOperationRegex);
    let end = 0;
    while(true) {
        const operation = operations.charAt(begin);
        operations = operations.replace(findOperationRegex, ' ');
        end = operations.search(findOperationRegex);
        const column = []
        if(end == -1) {
            for (let i=0; i < rows.length-1; i++) {
                const value = rows[i].slice(begin);
                column.push(value);
            }
            column.push(operation);
            columns.push(column);
            break;
        } 
        for (let i=0; i < rows.length-1; i++) {
            const value = rows[i].slice(begin, end-1);
            column.push(value);
        } 
        column.push(operation);
        columns.push(column);
        begin = end;
    }
    return columns;
};

const buildArr = (column) => {
    const size = column[0].length;
    const arr = [];
    for(let i=size-1;i>=0; i--) {
        let number = '';
        for(let j=0; j < column.length - 1; j++) {
            const value = column[j][i];
            number += value;
        }
        arr.push(parseInt(number.trim()));
    }
    arr.push(column[column.length-1])
    console.log({column, arr})
    return arr;
};

const solve = (data) => {
    const columns = parseData(data);
    let results = 0;
    for(let i=0; i < columns.length; i++) {
        const arr = buildArr(columns[i]);
        const operation = arr[arr.length-1];
        const subArr = arr.slice(0, -1);
        console.log({operation, subArr})
        if (operation == '+') {
            results += subArr.reduce(reduceSum);
        } else if (operation == '*') {
            results += subArr.reduce(reduceMult)
        } else {
            console.log(`operation ${operation} not registered`);
        }

    };
    //solve the puzzle here
    const solution = results;
    return solution
};

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const answer = solve(data);
    console.log({answer})
}

main();