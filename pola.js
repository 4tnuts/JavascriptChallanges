function pola(str) {
    let hasil = str.split(' ');
    let angkaAsli = [];
    let kemungkinan = [];
    let kemungkinan2 = [];
    for (let i = 0; i <= 9; i++) {
        kemungkinan.push(hasil[0].replace('#', i) * hasil[2]);
        for (let j = 0; j <= 9; j++) {
            kemungkinan2.push(hasil[4].replace('#', j));
            if (kemungkinan[i] === parseInt(kemungkinan21[j])) {
                angkaAsli.push(i);
                angkaAsli.push(j);
            }
        }
    }
    return angkaAsli
}


console.log(pola("42#3 * 188 = 80#204"));
console.log(pola("8#61 * 895 = 78410#5"));
