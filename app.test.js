const _request = require("supertest");
const { expect } = require("@jest/globals");
const server = require("./app").server;

const request = _request(server);
// it("aaaaaa1", function (done) {
//   request(server).get("/person").expect([]).end(done);
// });

describe("E2E tests", () => {
  test("1. GET-запросом получаем все объекты (ожидается пустой массив)", async (done) => {
    const response = await request.get("/person");

    expect(response.status).toBe(200);
    expect(response.body.message).toBe([]);
    done();
  });
  test("2. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)", async () => {
    const response = await request.post("/person").send({
      name: "you",
      age: 20,
      hobbies: ["aa", "ss"],
    });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe([]);
    done();
  });
  test("3. GET-запросом пытаемся получить созданный объект по его id (ожидается созданный объект)", () => {});
  test("4. PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же id)", () => {});
  test("5. DELETE-запросом удаляем созданный объект по id (ожидается подтверждение успешного удаления)", () => {});
  test("6. GET-запросом пытаемся получить удаленный объект по id (ожидается ответ, что такого объекта нет)", () => {});
});
