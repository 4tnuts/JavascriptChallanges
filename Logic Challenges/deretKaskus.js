console.time('Test Speed Deret Kaskus Challenge');
const  deretKaskus = (n) => {   
let number = 0;
let result = [];
    for (let i = 0; i < n; i++) {
        number += 3;
        if (number % 6 === 0 && number % 5 === 0) {
            result.push("KASKUS");
        } else if (number % 6 === 0){
            result.push("KUS");
        } else if (number % 5 === 0){
            result.push("KAS");
        } else {
            result.push(number);
        }
    }
    return result;
}
console.log(deretKaskus(10));
console.timeEnd('Test Speed Deret Kaskus Challenge');
