const solve = (data) => {
    const [ranges, values] = parseData(data);
    //solve the puzzle here
    const solution = values.filter(value => ranges.find(range => 
        range[0] <= value && value <= range[1])).length;
    return solution
};
