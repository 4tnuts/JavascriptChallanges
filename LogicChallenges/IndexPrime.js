const indexPrime = param1 => {
    let index = 0;
    let prime = 2;
    while (index < param1) {
        let isPrime = true
        for (let i = 2; i < prime; i++) {
            if (prime % i === 0) {
                isPrime = false;
            }
        }
        if (isPrime) {
            index++
        }
        prime++
    }
    return prime - 1
}

console.log(indexPrime(4));
console.log(indexPrime(500));
console.log(indexPrime(37786));