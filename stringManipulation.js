function testRegex(kata){
    validasi = /\b[aiueoAIUEO]/
    if(validasi.test(kata[0]) == true ){
        console.log(kata);
    }else{
        console.log(kata.substring(1)+kata[0]+"nyo");
    }
}



testRegex("ayam");
testRegex('bebek');
