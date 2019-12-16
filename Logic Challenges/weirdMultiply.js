const weirdMultiply = sentence => {

    let string = "" + sentence;
    let number = string.match(/.{1}/g);
    let result = 1;
    let i = 0;
    
    while (i < number.length) {
        result *= parseInt(number[i]);
        i++;
    }

    if (result <= 9) {
        return result;
    } else {
         while (result > 9) {
            return weirdMultiply(result);
        }
    }

}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));