const { v4: uuidv4 } = require("uuid");
const { CreatePersonError } = require("./error/errors");

module.exports = class Person {
  constructor(person) {
    this.id = uuidv4();
    this.name = this.#checkName(person.name);
    this.age = this.#checkAge(person.age);
    this.hobbies = this.#checkHobbies(person.hobbies);
  }

  #checkAge(age) {
    if (typeof age !== "number" || age < 0) {
      throw new CreatePersonError(
        "Age must be a number and cannot be less than zero"
      );
    }

    return age;
  }

  #checkName(name) {
    if (typeof name !== "string" || name.trim().length === 0) {
      throw new CreatePersonError(
        "The name must be a string and must not be empty"
      );
    }

    return name;
  }

  #checkHobbies(hobbies) {
    if (
      !Array.isArray(hobbies) ||
      hobbies.some((element) => typeof element !== "string")
    ) {
      throw new CreatePersonError("Hobby should be an array of strings");
    }

    return hobbies;
  }
};
