const pola = str => {
    let splittedString = str.split(' ');
    let result = [];
    for (let i = 0; i <= 9; i++) {
        for (let j = 0; j <= 9; j++) {
            if (splittedString[0].replace('#', i) * splittedString[2] === parseInt(splittedString[4].replace('#', j))) {
                result.push(i);
                result.push(j);
            }
        }
    }
    return result;
}


console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));