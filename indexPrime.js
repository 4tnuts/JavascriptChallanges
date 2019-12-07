function primeChecker(n) {
     if (n < 2) {
         return false;
     } else if (n == 2) {
         return true
     } else {
         for (i = 2; i < n; i++) {
            console.log(`ini ${n}` + `ini ${i}`);
             if (n % i == 0) {
                return false;
             }
         }
         return true

     }
 }
 console.log(primeChecker(7));
// function indexPrime(param1){
//    var index = 0;
//    var n = 2;
//     while(index < param1){
//         if(primeChecker(n) === true){
//             index++;
//         }
//         n++
//     }
//     return n - 1;
// }
//  console.log(indexPrime(2));
 
//  function indexPrime(x) {
//      var mulai = 0;
//      var simpan = 0;
//      while (mulai !== x) {
//          if (primeChecker(simpan)) {
//              mulai++
//          }
//          simpan++
//      }

//      return simpan - 1
//  }

//  function indexPrime2(n){
//     var bilanganPrima = 0;
//      for(i = 0; i !== x ;i++){
//          if(n )
//      }
//  }



//  console.log(indexPrime(3));
