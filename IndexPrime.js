function indexPrime(param1) {
    var index = 0;
    var calonPrima = 2;
    while (index < param1) {
        let isPrime = true
        for (var i = 2; i < calonPrima; i++) {
            if (calonPrima % i === 0) {
                isPrime = false;
            }
        }
        if (isPrime) {
            index++
        }
        calonPrima++
    }
    return calonPrima - 1
}

console.log(indexPrime(9));