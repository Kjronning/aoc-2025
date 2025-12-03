import fs from 'fs';

const processStep = (step) => {
    const amount = step.slice(1);
    const direction = step.startsWith('R') ? 1 : -1;
    return direction * amount;
}

const partOneProcessor = (acc, step) => {
    const currentPosition = (acc + processStep(step))%100;
    if (currentPosition == 0) {
        timesAt0++;
    }
    return currentPosition;
};

const partTwoPropcessor = (acc, step) => {

    const amount = processStep(step);
    const restAmount = amount%100;
    const amountRotations = Math.floor(Math.abs(amount/100)); //full rotations on a single step

    const newPosition = acc + restAmount;
    const restNewPosition = newPosition%100;
    const newPositionRotations = Math.floor(Math.abs(newPosition/100)); //full rotation on the position + rest of step

    const signChanged = acc * restNewPosition < 0; // crossed 0 when changing "side"
    const rotations = amountRotations + newPositionRotations + (signChanged ? 1 : 0);
    
    console.log(`${acc < 0 ? '' : ' '}${acc} ${amount < 0 ? '-' : '+'} ${Math.abs(amount)} = new position: ${restNewPosition}, rotations: ${rotations}, times at 0: ${timesAt0}`)
    timesAt0 += rotations;
    if (newPosition == 0) {
            timesAt0++;
    }
    return restNewPosition;
}

let timesAt0 = 0;

const main = () => {
    const filename = process.argv[2];
    const data = fs.readFileSync(filename, { encoding: 'utf8', flag: 'r' });
    const steps = data.split('\n');
    const initialPosition = 50;
    const finalPosition = steps.reduce(partTwoPropcessor, initialPosition);
    console.log({timesAt0, finalPosition});
}


main();