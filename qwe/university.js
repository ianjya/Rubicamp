class University {
  constructor(name, address) {
    this.name = name;
    this.address = address;
  }

  displayInfo() {
    console.log(`============================================
Welcome to ${this.name}`);
    console.log(`Alamat: ${this.address}
============================================`);
  }
}

module.exports = University;
