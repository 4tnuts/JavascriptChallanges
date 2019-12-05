function sum(){
    var angka = Array.from(arguments);
    var hasil = 0;
    for(var i = 0; i < angka.length; i++){
        hasil+=angka[i];
    }
console.log(hasil);
}


sum(1,2,7);
sum(1,4);
sum(11);
sum(10,3,6,7,9);



