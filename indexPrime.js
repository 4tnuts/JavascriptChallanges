 function primeChecker(n) {
     for (var x = 2; x < n; x++) {
         if (n === 0 || n === 1) {
             return false
         }
         if (n % x == 0) {
             return false;
         }
     }
     return true
 }


 function indexPrime(x) {

     var hasil = [];
     for (var j = 0; j < x; j++) {
         console.log("ini x " + x);
         console.log("ini j " + j);

         for (var i = 2; i > j; i++) {
             console.log("ini i " + i)
             console.log("ini j " + j)
           
             if (primeChecker(i)) {
                 hasil.push(i);
             
                 console.log("yang di push " + i);
             
                 break;
             } else {
                 console.log('sesuatu')
             }
         }
     }

     return hasil;

 }
 console.log(indexPrime(2));
 //  function index(param1){
 //      hasil = [];
 //     var start = 2;
 //      while(start < param1){
 //         if(primeChecker(start) == true){
 //             hasil.push(start)
 //             start++
 //         }else{

 //         }
 //      }
 //      return hasil
 // }
 // console.log(index(5));