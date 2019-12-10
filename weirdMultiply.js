function weirdMultiply(sentence) {

    let hasil = "" + sentence;
    let result = hasil.match(/.{1}/g);
    let banget = 1;
    let i = 0;
    
    while (i < result.length) {
        banget *= parseInt(result[i]);
        i++;
    }

    if (banget <= 9) {
        return banget;
    } else {
         while (banget > 9) {
            return weirdMultiply(banget);
        }
    }

}

console.log(weirdMultiply(39));
console.log(weirdMultiply(999));
console.log(weirdMultiply(3));