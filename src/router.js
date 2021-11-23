const fs = require("fs");
const RepositoryPersons = require("./RepositoryPersons");
const { NotFoundRecordError } = require("./error/errors");

async function get(url, response) {
  try {
    let responseValue = "";
    if (url === "/person") {
      responseValue = await RepositoryPersons.findAll();
    } else if (url.indexOf("/person/") === 0) {
      const id = url.replace("/person/", "");

      responseValue = await RepositoryPersons.findById(id);
    } else {
      throw new NotFoundRecordError(`Resource ${url} does not exist`);
    }

    response.statusCode = 200;
    response.end(JSON.stringify(responseValue));
  } catch (error) {
    switch (error.name) {
      case "BadRequestError":
        response.statusCode = 400;
        break;

      case "CreatePersonError":
        response.statusCode = 400;
        break;

      case "NotFoundRecordError":
        response.statusCode = 404;
        break;

      default:
        response.statusCode = 500;
        break;
    }

    response.end(JSON.stringify(error.message));
  }
}

async function post(request, response) {
  try {
    //строка должна быть /person
    let person = {};
    const chunks = [];
    await request.on("data", (chunk) => chunks.push(chunk));
    request.on("end", () => {
      person = RepositoryPersons.createPerson(JSON.parse(chunks));

      response.statusCode = 201;
      response.end(JSON.stringify(person));
    });
  } catch (e) {
    res.statusCode = 500;
    res.end(JSON.stringify(e));
    return e;
  }
}

async function put(request, response) {}

async function remove(url, response) {
  if (url.indexOf("/person/") === 0) {
    const id = url.replace("/person/", "");

    await RepositoryPersons.remove(id);

    response.statusCode = 204;
    response.end();
  } else {
    throw new NotFoundRecordError(`Resource ${url} does not exist`);
  }
}

function parseURL(url) {
  if (url === "/person") {

    return false;
  } else if (url.indexOf("/person/") === 0) {
    const id = url.replace("/person/", "");

    return id;
  } else {

    throw new NotFoundRecordError(`Resource ${url} does not exist`);
}

module.exports = {
  get,
  post,
  put,
  remove,
};
