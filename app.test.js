const { expect } = require("@jest/globals");
const app = require("./app");
const request = require("supertest");

describe("Сценарий 1. (из задания)", () => {
  let id = "";
  let person = {
    name: "you",
    age: 20,
    hobbies: ["hobby1", "hobby2"],
  };
  let createPerson = {};

  test("1.1 GET-запросом получаем все объекты (ожидается пустой массив)", function (done) {
    request(app)
      .get("/person")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual([]);
      })
      .expect(200, done);
  });

  test("1.2 POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)", function (done) {
    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(person)
      .expect(201)
      .expect(function (res) {
        createPerson = JSON.parse(res.text);
        id = createPerson.id;
        expect(createPerson).toEqual({
          id: expect.any(String),
          ...person,
        });
      })
      .end(done);
  });

  test("1.3 GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)", function (done) {
    request(app)
      .get("/person/" + id)
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual(createPerson);
      })
      .expect(200, done);
  });

  test("1.4 PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)", function (done) {
    const personEdit = {
      name: "she",
      age: 40,
      hobbies: ["hobby3", "hobby4"],
    };

    request(app)
      .put("/person/" + id)
      .send(personEdit)
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual({
          id: expect.any(String),
          ...personEdit,
        });
      })
      .expect(200, done);
  });

  test("1.5 DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления - code 204)", async function () {
    request(app)
      .delete("/person/" + id)
      .expect(204)
      .end(function (err, res) {
        if (err) throw err;
        //else done();
      });
  });

  test("1.6 GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)", async function () {
    request(app)
      .get("/person/" + id)
      .expect(function (res) {
        expect(res.text).toEqual("ID does not exist, record not found");
      })
      .expect(404);
  });
});

describe("2 Сервер возвращает статус код 400 и соответствующее сообщение, если тело запроса не соответствует требованиям", () => {
  test("2.1 Поле 'name' должно быть типа string", function (done) {
    const badObject = {
      name: 123,
      age: 20,
      hobbies: ["hobby1", "hobby2"],
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual(
          "The name must be a string and must not be empty"
        );
      })
      .expect(400, done);
  });

  test("2.2 Поле 'age' должно быть типа number", function (done) {
    const badObject = {
      name: "you",
      age: "20",
      hobbies: ["hobby1", "hobby2"],
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual(
          "Age must be a number and cannot be less than zero"
        );
      })
      .expect(400, done);
  });

  test("2.3 Поле 'hobbies' должно быть массивом", function (done) {
    const badObject = {
      name: "you",
      age: 20,
      hobbies: "hobby1",
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual("Hobby should be an array of strings");
      })
      .expect(400, done);
  });

  test("2.4 Поле 'hobbies' должно быть массивом, содержащим только данные типа string", function (done) {
    const badObject = {
      name: "you",
      age: 20,
      hobbies: ["hobby1", "hobby2", 123],
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual("Hobby should be an array of strings");
      })
      .expect(400, done);
  });
});

describe("3 Сервер возвращает статус код 400 и соответствующее сообщение, если тело запроса не содержит обязательных полей", () => {
  test("3.1 Отсутствует поле 'name'", function (done) {
    const badObject = {
      age: 20,
      hobbies: ["hobby1", "hobby2"],
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual("'Person' does not contain 'name'field");
      })
      .expect(400, done);
  });

  test("3.2 Отсутствует поле 'age'", function (done) {
    const badObject = {
      name: "you",
      hobbies: ["hobby1", "hobby2"],
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual("'Person' does not contain 'age' field");
      })
      .expect(400, done);
  });

  test("3.3 Отсутствует поле 'hobbies'", function (done) {
    const badObject = {
      name: "you",
      age: 20,
    };

    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(badObject)
      .expect(function (res) {
        expect(res.text).toEqual("'Person' does not contain 'hobbies' field");
      })
      .expect(400, done);
  });
});

describe("Сценарий 4. Генерация статус кодов и соответствующих сообщений при ошибках", () => {
  const uuid = "f007c5f7-ef3e-454d-83af-85b3e3f66b52";

  test("4.1 Запрос к несуществующей конечной точке", function (done) {
    const url = "/some-non/existing/resource";

    request(app)
      .get(url)
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(res.text).toEqual(`Resource ${url} does not exist`);
      })
      .expect(404, done);
  });

  test("4.2 GET Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid)", function (done) {
    request(app)
      .get("/person/12345")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(res.text).toEqual("ID is not UUID");
      })
      .expect(400, done);
  });

  test("4.3 GET Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена", function (done) {
    request(app)
      .get("/person/" + uuid)
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(res.text).toEqual("ID does not exist, record not found");
      })
      .expect(404, done);
  });

  test("4.5 PUT Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid)", function (done) {
    const personEdit = {
      name: "she",
      age: 40,
      hobbies: ["hobby3", "hobby4"],
    };

    request(app)
      .put("/person/12345")
      .set("Accept", "application/json")
      .send(personEdit)
      .expect(function (res) {
        expect(res.text).toEqual("ID is not UUID");
      })
      .expect(400, done);
  });

  test("4.6 PUT Сервер возвращает статус код 404 и соответствующее сообщение, если запись с id === personId не найдена", function (done) {
    const personEdit = {
      name: "she",
      age: 40,
      hobbies: ["hobby3", "hobby4"],
    };

    request(app)
      .put("/person/" + uuid)
      .set("Accept", "application/json")
      .send(personEdit)
      .expect(function (res) {
        expect(res.text).toEqual("ID does not exist, record not found");
      })
      .expect(404, done);
  });

  test("4.7 DELETE Сервер возвращает статус код 400 и соответствующее сообщение, если personId невалиден (не uuid)", function (done) {
    request(app)
      .delete("/person/12345")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(res.text).toEqual("ID is not UUID");
      })
      .expect(400, done);
  });
});

describe("Сценарий 5. Создание, просмотр, удаление. Проверка удаления.", () => {
  let id = "";
  let person = {
    name: "yura",
    age: 40,
    hobbies: ["hobby10", "hobby20"],
  };
  let createPerson = {};

  test("5.1 Создаем новый объект", function (done) {
    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(person)
      .expect(201)
      .expect(function (res) {
        createPerson = JSON.parse(res.text);
        id = createPerson.id;
        expect(createPerson).toEqual({
          id: expect.any(String),
          ...person,
        });
      })
      .end(done);
  });

  test("5.2 Проверяем создался ли объект", function (done) {
    request(app)
      .get("/person/" + id)
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual(createPerson);
      })
      .expect(200, done);
  });

  test("5.3 Удаляем объект", async function () {
    request(app)
      .delete("/person/" + id)
      .expect(204)
      .end(function (err, res) {
        if (err) throw err;
      });
  });

  test("5.4 Проверяем, удалился ли объект", async function () {
    request(app)
      .delete("/person/" + id)
      .expect(function (res) {
        expect(res.text).toEqual("ID does not exist, record not found");
      })
      .expect(404);
  });
});

describe("Сценарий 6. Создание двух объектов, редактирование одного из них, просмотр", () => {
  let id = "";
  let person = {
    name: "yura",
    age: 40,
    hobbies: ["hobby10", "hobby20"],
  };
  let createPerson = {};

  test("6.1 Проверяем, что БД пуста (пустой массив)", function (done) {
    request(app)
      .get("/person")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual([]);
      })
      .expect(200, done);
  });

  test("6.1 Создаем первый объект", function (done) {
    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(person)
      .expect(201)
      .expect(function (res) {
        createPerson = JSON.parse(res.text);
        id = createPerson.id;
        expect(createPerson).toEqual({
          id: expect.any(String),
          ...person,
        });
      })
      .end(done);
  });

  test("6.2 Создаем второй объект", function (done) {
    request(app)
      .post("/person")
      .set("Accept", "application/json")
      .send(person)
      .expect(201)
      .expect(function (res) {
        createPerson = JSON.parse(res.text);
        id = createPerson.id;
        expect(createPerson).toEqual({
          id: expect.any(String),
          ...person,
        });
      })
      .end(done);
  });

  test("6.3 Проверяем создались ли объекты (их количество равно 2)", function (done) {
    request(app)
      .get("/person")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text).length).toBe(2);
      })
      .expect(200, done);
  });

  test("6.4 PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)", function (done) {
    const personEdit = {
      name: "vasia",
      age: 30,
      hobbies: ["hobby5", "hobby6"],
    };

    request(app)
      .put("/person/" + id)
      .send(personEdit)
      .expect(function (res) {
        expect(JSON.parse(res.text)).toEqual({
          id: expect.any(String),
          ...personEdit,
        });
      })
      .expect(200, done);
  });

  test("6.5 Проверяем осталось ли количество объектов прежним (равно 2)", function (done) {
    request(app)
      .get("/person")
      .set("Accept", "application/json")
      .expect(function (res) {
        expect(JSON.parse(res.text).length).toBe(2);
      })
      .expect(200, done);
  });
});
