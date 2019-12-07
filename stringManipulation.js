function stringManipulation(word){
    validasi = /\b[aiueoAIUEO]/
    if(validasi.test(word[0]) == true ){
        console.log(word);
    }else{
        console.log(word.substring(1)+word[0]+"nyo");
    }
}

stringManipulation('ayam');
stringManipulation('bebek');


