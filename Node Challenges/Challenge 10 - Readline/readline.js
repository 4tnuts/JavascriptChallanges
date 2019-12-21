const readline = require('readline');
const rl = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : 'Tulis kalimat mu disini >'
});

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

rl.prompt();
rl.on('line', (line) =>{
    sentenceManipulation(line);
})
.on('close', ()=>{
    console.log('\nKeluar');
    process.exit(0);
})