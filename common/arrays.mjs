export const expandRanges = (range) => {
    console.log({range})
    const [begin, end] = range;
    const a = parseInt(begin);
    const b = parseInt(end);
    const rangeLength = b - a + 1;
    console.log({a, b, rangeLength})
    return [...Array(rangeLength).keys()].map(i => i + a + '');
};