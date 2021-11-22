const { v4: uuidv4 } = require("uuid");

module.exports = class Person {
  constructor(name, age, hobbies) {
    this.id = this.getId();
    this.name = name;
    this.age = age;
    this.hobbies = hobbies;
  }

  getId() {
    return uuidv4();
  }
};
