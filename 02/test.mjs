const expandRangesTest = () => {
    const containsArray = (arr1, arr2) => {
        return !arr1.find(id => !arr2.includes(id));
    }
    const actual = expandRanges(['11', '15'])
    const expected = ['11', '12', '13', '14', '15'];
    if (containsArray(actual, expected) && containsArray(expected, actual)) {
        console.log('PASS');
    } else {
        console.log('FAIL');
        console.log({actual, expected})
    }
}

const runTests = () => {
    console.log('expandRangesTest');
    expandRangesTest();
}

runTests();