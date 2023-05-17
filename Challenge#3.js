function romawi(number) {
    const angkaRomawi = [
      { value: 1000, symbol: "M" },
      { value: 900, symbol: "CM" },
      { value: 500, symbol: "D" },
      { value: 400, symbol: "CD" },
      { value: 100, symbol: "C" },
      { value: 90, symbol: "XC" },
      { value: 50, symbol: "L" },
      { value: 40, symbol: "XL" },
      { value: 20, symbol: "XX"},
      { value: 10, symbol: "X" },
      { value: 9, symbol: "IX" },
      { value: 5, symbol: "V" },
      { value: 4, symbol: "IV" },
      { value: 1, symbol: "I" }
    ];
  
    let result = "";
  
    for (let i = 0; i < angkaRomawi.length; i++) {
      while (number >= angkaRomawi[i].value) {
        result += angkaRomawi[i].symbol;
        number -= angkaRomawi[i].value;
      }
    }
  
    return result;
  }
  
  console.log("Script Testing untuk Konversi Romawi \n");
  console.log("input  |  expected  | result");
  console.log("-------|------------|-------");
  console.log("4      | IV         | ", romawi(4));
  console.log("9      | IX         | ", romawi(9));
  console.log("13     | XIII       | ", romawi(13));
  console.log("1453   | MCDLIII    | ", romawi(1453));
  console.log("1646   | MDCXLVI    | ", romawi(1646));