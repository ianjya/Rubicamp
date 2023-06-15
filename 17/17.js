export class calculator {
  constructor() {
    this.value = 1;
  }

  set x(number) {
    this.value = number;
    console.log(number);
  }

  squareroot() {
    this.value = Math.sqrt(this.value);
    return this;
  }

  exponent(number) {
    this.value = this.value ** number;
    return this;
  }

  square() {
    this.value = this.value ** 2;
    return this;
  }

  add(number) {
    this.value += number;
    return this;
  }

  subtract(number) {
    this.value -= number;
    return this;
  }

  divide(number) {
    this.value /= number;
    return this;
  }

  multiply(number) {
    this.value *= number;
    return this;
  }

  result() {
    console.log(this.value);
    return this;
  }
}

export const PI = 22 / 7;
