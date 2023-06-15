import { calculator, PI } from "./17.js";

const qwe = new calculator();
qwe.add(10).subtract(5).result();
qwe.add(3).multiply(4).divide(6).result();

qwe.x = 7;
qwe.multiply(2).multiply(PI).result();

qwe.x = 7;
qwe.square().multiply(PI).result();

qwe.x = 4;
qwe.exponent(3).result();
qwe.squareroot().result();
