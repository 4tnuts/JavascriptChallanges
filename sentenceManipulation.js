function sentenceManipulation(sentence) {
    
    let kataTerpisah = sentence.split(' ', sentence.length);
    
    let hasil = "";
    
    for (let i = 0, validasi = /\b[aiueo]/i; i < kataTerpisah.length; i++) {
        
        if (validasi.test(kataTerpisah[i][0]) == true) {
        
            hasil += kataTerpisah[i] + " ";
        
        } else {
        
            hasil += kataTerpisah[i].substring(1) + kataTerpisah[i][0] + "nyo ";
        
        }
    
    }
    
    console.log(hasil);
}

sentenceManipulation("ibu pergi ke pasar bersama aku");