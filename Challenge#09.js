function spiral(param1) {
  const matrix = [];
  let count = 0;

  for (let i = 0; i < param1; i++) {
    matrix[i] = [];
    for (let j = 0; j < param1; j++) {
      matrix[i][j] = count;
      count++;
    }
  }

  return extractSpiral(matrix, param1);
}

function extractSpiral(matrix, n) {
  const final = [];
  let awal = 0;
  let akhir = n - 1;
  let kolomAwal = 0;
  let kolomAkhir = n - 1;

  while (awal <= akhir && kolomAwal <= kolomAkhir) {
    //
    for (let i = kolomAwal; i <= kolomAkhir; i++) {
      final.push(matrix[awal][i]);
    }
    awal++;

    //
    for (let i = awal; i <= akhir; i++) {
      final.push(matrix[i][kolomAkhir]);
    }
    kolomAkhir--;

    //
    if (awal <= akhir) {
      for (let i = kolomAkhir; i >= kolomAwal; i--) {
        final.push(matrix[akhir][i]);
      }
      akhir--;
    }

    //
    if (kolomAwal <= kolomAkhir) {
      for (let i = akhir; i >= awal; i--) {
        final.push(matrix[i][kolomAwal]);
      }
      kolomAwal++;
    }
  }

  return final;
}
console.log(spiral(5));
console.log(spiral(7));
console.log(spiral(6));
