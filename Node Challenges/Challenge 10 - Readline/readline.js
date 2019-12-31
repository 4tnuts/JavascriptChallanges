const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Tulis kalimat mu disini >'
});

const sentenceManipulation = sentence => {
    let words = sentence.split(' ', sentence.length);
    let result = "";

    for (let i = 0, validasi = /\b[aiueo]/i; i < words.length; i++) {
        if (validasi.test(words[i][0]) == true){ 
            result += words[i] + " ";
        } else {
            result += words[i].concat(words[i][0], 'nyo ');
        }
    }
    console.log(result);
    rl.prompt();
}


rl.prompt();
rl.on('line', (line) => {
        sentenceManipulation(line);
    })
    .on('close', () => {
        console.log('\nKeluar');
        process.exit(0);
    })