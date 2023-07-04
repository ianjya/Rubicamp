class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static distance(p1, p2) {
    const a = p1.x - p2.x;
    const b = p1.y - p2.y;
    return Math.hypot(a, b);
  }
}

const titik1 = new Point(1, 1);
const titik2 = new Point(5, 4);

console.log("jarak antara titik:", Point.distance(titik1, titik2));

class Hewan {
  constructor(name) {
    this.name = name;
  }

  animalSound() {}

  sleep() {
    console.log(this.name + "Zzzz");
  }
}

class Cat extends Hewan {
  animalSound() {
    console.log("Cat says: 'Miaww'");
  }
}

const kucing = new Cat();
kucing.animalSound();

const asd = new Hewan("udin");
asd.sleep();
