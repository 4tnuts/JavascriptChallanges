function deretKaskus(n){
    var angkaAwal= 0;
    var hasil=[];
    for(i=0; i < n;i++){
        angkaAwal+=3;
        if(angkaAwal % 6 === 0 && angkaAwal % 5 === 0 ){
            hasil.push("KASKUS");
        }else if(angkaAwal % 6 === 0){
            hasil.push("KUS");
        }else if(angkaAwal % 5 === 0){
            hasil.push("KAS");
        }else{
            hasil.push(angkaAwal);
        }
    }
    return hasil;
}

console.log(deretKaskus(10));