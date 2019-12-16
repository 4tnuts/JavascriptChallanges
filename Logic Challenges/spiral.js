const spiral = param1 => {
    let matrix = [];
    let result = [];
    let n = 0;
    let atas = 0;
    let kiri = 0;
    let kanan = param1 - 1;
    let bawah = param1 - 1;

    for (let i = 0; i < param1; i++) {
        matrix[i] = [];
        for (let j = 0; j < param1; j++) {
            matrix[i][j] = n;
            n++;
        }
    }

    while (atas <= bawah && kiri <= kanan) {
        for (let j = atas; j <= kanan ;j++) {
            result.push(matrix[atas][j])
        }
        atas++ 

        for (let k = atas; k <= bawah; k++) {
            result.push(matrix[k][kanan]);
        }
        kanan-- 

        for (let l = kanan; l >= kiri; l--) {
            result.push(matrix[bawah][l]);
        }
        bawah--
        
        for (let m = bawah; m >= atas; m--) {
            result.push(matrix[m][kiri]);
        }
        kiri++ 
    }
    
    return result;
}

console.log(spiral(5));
console.log(spiral(6));
console.log(spiral(7));