const getFirstValue = (bank) => {
    return getLargest(bank.slice(0, bank.length-1));
}

const getSecondValue = (bank, firstValueIndex) => {
    return getLargest(bank.slice(firstValueIndex+1));
}

const getJoltage = (bank) => {
    const [first, i1] = getFirstValue(bank);
    const [second, i2] = getSecondValue(bank, i1);
    console.log({first, second, i1, i2})
    return first * 10 + second;
};
