const fs = require('fs');
const readline = require('readline');
let inputArguments = process.argv.slice(1);
let number = 0;
let salah = 0;
let skipped = 0;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Jawaban: '
});

if (inputArguments[1] === undefined && inputArguments !== 'data.json') {
    console.log(`Toloong sertakan nama file yang akan digunakan sebagai soal.`);
    console.log(`Misal 'node solution.js data.json'`);
    rl.close();
} else {

    fs.readFile(inputArguments[1], (err, data) => {
        if (err) return console.error(err);
        const jsonData = JSON.parse(data);
        console.log(`Selamat datang di permaijsonDatanan tebak - tebakan. kamu akan di berikan file ${inputArguments[1]}.\n
untuk bermain , jawablah dengan jawaban yang sesuai.\nGunakanlah 'skip' untuk menangguhkan pertanyaannya, dan di
akhir pertanyaan akan di tanyakan lagi`);

        console.log(`Pertanyaan : ${jsonData[0].definition}`);
        rl.prompt();

        rl.on('line', line => {
            if (line === 'skip') {
                jsonData.push(jsonData[skipped]);
                jsonData.splice(skipped, 1);
                salah = 0;
                if (skipped == jsonData.length) {
                    skipped = 0;
                }
                console.log(`Pertanyaan : ${jsonData[skipped].definition}`);
            } else {
                console.log(skipped);
                if (line === jsonData[skipped].term) {
                    console.log('Benar');
                    number++;
                    jsonData.splice(skipped, 1);
                    skipped = 0;
                    if (number !== 3) {
                        console.log(`Pertanyaan : ${jsonData[skipped].definition}`);
                    } else {
                        console.log('Selamat anda menang');
                        rl.close();
                    }
                } else {
                    salah++;
                    console.log(`salah ke ${salah}`);
                    console.log('Pertanyaan :' + jsonData[skipped].definition);
                }
            }

            rl.prompt()
        }).on('close', () => {
            process.exit(0);
        }).on('SIGINT', () => {
            rl.question('Are you sure you want to exit: ', (answer) => {
              if (answer.match(/^y(es)?$/i)){
                rl.close();
              } else{
                rl.resume(); 
              }
            });
          });
    });
}