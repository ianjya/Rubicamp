class Tyre {
  constructor(brand, size) {
    this.brand = brand;
    this.size = size;
  }
}

class Car {
  constructor(variant, sn, door, seat, tyres, year, warranty) {
    this.variant = variant;
    this.sn = sn;
    this.door = door;
    this.seat = seat;
    this.tyres = tyres;
    this.year = year;
    this.warranty = warranty;
  }

  remainingGuarantee(simulationYear) {
    const remainingYears = simulationYear - this.year;
    return remainingYears > 0 ? remainingYears : 0;
  }
}

class CarFactory {
  constructor() {
    this.cars = [];
  }

  produce(variant, sn, door, seat, tyres, year, warranty) {
    const car = new Car(variant, sn, door, seat, tyres, year, warranty);
    this.cars.push(car);
  }

  //
  static generateSerialNumber(length) {
    let result = "";
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-----1234567890-----1234567890";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }
  //

  result() {
    this.cars.forEach((car, index) => {
      console.log(`Car ${index + 1}:`);
      console.log(`Variant: ${car.variant}`);
      console.log(`Serial Number: ${car.sn}`);
      console.log(`Door: ${car.door}`);
      console.log(`Seat: ${car.seat}`);
      console.log(`Seat: ${car.tyres}`);

      console.log(`Year: ${car.year}`);
      console.log(`Warranty: ${car.warranty}`);
      console.log("-----------------------");
    });
  }

  guaranteeSimulation(simulationYear) {
    console.log(`Guarantee Simulation for Year ${simulationYear}:`);
    this.cars.forEach((car, index) => {
      const remainingYears = car.remainingGuarantee(simulationYear);
      console.log(
        `Car ${index + 1}: ${remainingYears} years remaining for guarantee`
      );
    });
  }
}

const toyota = new CarFactory();
toyota.produce(
  "Sedan",
  CarFactory.generateSerialNumber(15).toLocaleLowerCase(),
  4,
  5,
  "dunlop 15 inch",
  2020,
  "2 years"
);
toyota.produce(
  "SUV",
  CarFactory.generateSerialNumber(15).toLocaleLowerCase(),
  5,
  7,
  "dunlop 15 inch",
  2022,
  "3 years"
);
toyota.produce(
  "Agya",
  CarFactory.generateSerialNumber(15).toLocaleLowerCase(),
  4,
  5,
  "dunlop 15 inch",
  2020,
  "2 years"
);

toyota.result();
toyota.guaranteeSimulation(2025);
