const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: "Jawaban anda : ",
});


let dataTebakanMentah = fs.readFileSync('data.json');
let dataTebakan = JSON.parse(dataTebakanMentah);
let i = 0;

console.log("Selamat datang di permainan Tebak Kata, silahkan isi data dengan jawaban yang benar ya!\n");
console.log(dataTebakan[i].definition);
rl.prompt();
const checkerJawaban = (jawaban) => {
  if (jawaban.toLowerCase() === dataTebakan[i].term) {
    if (i === 2) {
      console.log("Selamat anda menang\n")
      rl.close();
    }
    console.log('Selamat anda benar\n')
    i++;
    console.log(dataTebakan[i].definition);
  } else {
    console.log("Wkwkwkw, anda kurang beruntung\n");
  }
  rl.prompt();
}
rl.on('line', (line) => {
  checkerJawaban(line);

}).on('close', () => {
  console.log("Hore anda menang");
  process.exit(0);
}).on('SIGINT', () => {
  rl.question('Are you sure you want to exit: ', (answer) => {
    if (answer.match(/^y(es)?$/i)) rl.pause();
  });
});