class Tyre {
  constructor(brand) {
    this.brand = brand;
  }
}

class Car {
  constructor(door, seat, tyre, year, warranty) {
    this.door = door;
    this.seat = seat;
    this.tyre = tyre;
    this.year = year;
    this.warranty = warranty;
    this.sn = Car.generateSerialNumber();
  }

  static generateSerialNumber() {
    const serialNumberLength = 10;
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let serialNumber = "";
    for (let i = 0; i < serialNumberLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      serialNumber += characters[randomIndex];
    }
    return serialNumber;
  }
}

// extend Car
class toyota extends Car {
  constructor(year) {
    super("5", "9", "dunlop", year);
    this.warranty = 7;
    this.variant = "toyota alphard";
  }
}

class kijang extends Car {
  constructor(year) {
    super("4", "7", "FDR", year);
    this.warranty = 3;
    this.variant = "kijang innova";
  }
}

class raize extends Car {
  constructor(year) {
    super("4", "5", "bridge Stone", year);
    this.warranty = 4;
    this.variant = "Raize GR Sport";
  }
}

class fortuner extends Car {
  constructor(year) {
    super("5", "7", "XtFDR", year);
    this.warranty = 9;
    this.variant = "fortuner";
  }
}
// --------------------------------------

class CarFactory {
  constructor() {
    this.cars = [];
  }

  static random() {
    return Math.floor(Math.random() * 9);
  }

  produce(year) {
    for (let i = 0; i < CarFactory.random(); i++) {
      this.cars.push(new toyota(year));
    }
    for (let i = 0; i < CarFactory.random(); i++) {
      this.cars.push(new kijang(year));
    }
    for (let i = 0; i < CarFactory.random(); i++) {
      this.cars.push(new raize(year));
    }
    for (let i = 0; i < CarFactory.random(); i++) {
      this.cars.push(new fortuner(year));
    }
  }

  guaranteeSimulation(tahun) {
    console.log("Hasil produksi:");
    this.cars.forEach((content, i) => {
      console.log(`
      no.${i + 1}
      varian    : ${content.variant}
      sn        : ${content.sn.toLowerCase()}
      door      : ${content.door}
      seat      : ${content.seat} seat
      tyre      : ${content.tyre}
      year      : ${content.year}
      warranty  : ${content.warranty}
        **Status warranty on ${tahun} this guarantee status ${
        tahun - content.year < content.warranty ? "active" : "expired"
      }
      `);
    });
  }
}

const asd = new CarFactory();
asd.produce(2020);
asd.guaranteeSimulation(2025);
