const sentenceManipulation = sentence => {
    let splittedSentence = sentence.split(' ', sentence.length);
    let result = "";

    for (let i = 0, validasi = /\b[aiueo]/i; i < splittedSentence.length; i++) {
        if (validasi.test(splittedSentence[i][0]) == true){ 
            result += splittedSentence[i] + " ";
        } else {
            result += splittedSentence[i].substring(1) + splittedSentence[i][0] + "nyo ";
        }
    }

    console.log(result);
}

sentenceManipulation("ibu pergi ke pasar bersama aku");
