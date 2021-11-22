const Person = require("./person");

class RepositoryPersons {
  constructor() {
    this.arrayPerson = [];
  }
  //get
  findById(id) {
    const person = this.arrayPerson.find((pers) => pers.id === id); //undefined если id  нет, иначе запись - обработать ошибку при не верном id
    if (!person) throw new Error();
    return person;
  }

  findAll() {
    return this.arrayPerson;
  }
  //post
  createPerson(pers) {
    const person = new Person(pers); //обработать ошибку при не верных параметрах
    this.arrayPerson.push(person);
    return person;
  }
  //put
  editPerson(id, obj) {
    const person = this.findById(id);
    if (person === undefined) throw new Error(); //сделать ошибку о не верном id
  }
  //delete
  deletePerson(id) {}
}
