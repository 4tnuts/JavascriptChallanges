// const indexPrime = param1 => {
//     let index = 0;
//     let prime = 2;
//     while (index < param1) {
//         let isPrime = true
//         for (let i = 2; i < prime; i++) {
//             if (prime % i === 0) {
//                 isPrime = false;
//             }
//         }
//         if (isPrime) {
//             index++
//         }
//         prime++
//     }
//     return prime - 1
// }
// console.log(indexPrime(4));
// console.log(indexPrime(500));
// console.log(indexPrime(37786));
function primeChecker(number){
    let number = 0;
      if(number < 2){
        return false;
      }else{
      for(let i = 2 ; i <= number ; i++)
        if(number % i === 0){
          number+=1
          if(number > 2){
            return false;
          }else{
            return true
          }
        }
      }
    }
    console.log(primeChecker(4));