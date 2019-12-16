const fs = require('fs');
const readline = require('readline');
let inputArguments = process.argv.slice(1);
let number = 0;
let salah = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
});

if (inputArguments[1] === undefined && inputArguments !== 'data.json') {
    console.log(`Toloong sertakan nama file yang akan digunakan sebagai soal.`);
    console.log(`Misal 'node solution.js data.json'`);
    rl.close();
}else{

fs.readFile(inputArguments[1], (err, data) => {
    if (err) throw err;
    const jsonData = JSON.parse(data);
    console.log(`Selamat datang di permainan tebak - tebakan. kamu akan di berikan file ${inputArguments[1]}.\n
untuk bermain , jawablah dengan jawaban yang sesuai.\nGunakanlah 'skip' untuk menangguhkan pertanyaannya, dan di
akhir pertanyaan akan di tanyakan lagi`);
    console.log(`Pertanyaan : ${jsonData[number].definition}`);
    rl.prompt();
    rl.on('line', line => {
        if (line === 'skip') {
            number++;
            console.log(`Pertanyaan : ${jsonData[number].definition}`)
        }else if(line === jsonData[number].term){
            console.log("selamat anda benar");
            number++;
            console.log(`Pertanyaan : ${jsonData[number].definition}`);
        }else{
            salah++;
            console.log(`Anda salah ke ${salah} kalinya`)
        }
        rl.prompt()
    }).on('close', () => {
        process.exit(0);
    });
});
}