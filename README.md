# Basic-nodejs-course
# Simple CRUD API
### [Yuri Lapitski](lyurik@tut.by)
___________________________
## Details:
__________________________
**1. Persons** are stored as `objects` that have following properties:
    * `id` — unique identifier (`string`, `uuid`) generated on server side
    * `name` — person's name (`string`, **required**)
    * `age` — person's age (`number`, **required**)
    * `hobbies` — person's hobbies (`array` of `strings` or empty `array`, **required**)

```  
for example:
{
    "id": "dbcbce75-3794-460b-8ac0-2839a6a771fe",
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```

**2. Value of port** on which the application runs is stored in the file `.env`.
**3.** The application has 2 modes of running application: **development** and **production**
**4.** There are **E2E** tests covering the logic of the application.
___________________________
**5. API path:**
___________________________
<ins> **GET** </ins>

**Request:**
<ins> GET/person </ins>

**Respons:**
Success Code "200 OK"
Response Body = [{ person }...{ person }] or []

**Request:**
<ins> GET/person/Id </ins>

**Respons:**
Success Code "200 OK"
Response Body = { person }
___________________________

<ins> **POST** </ins>

**Request:**
<ins> POST/person </ins>

```  
JSON DATA:
{
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```

**Respons:**
Success Code "201"

```  
Response Body:
{
    "id": "dbcbce75-3794-460b-8ac0-2839a6a771fe",
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```
____________________________
<ins> **PUT** </ins>

**Request:**
<ins> PUT/person/id </ins>
```  
JSON Body:
{
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```

**Respons:**
Success Code "200 OK"
```  
Response Body:
{
    "id": "dbcbce75-3794-460b-8ac0-2839a6a771fe",
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```
____________________________
<ins> **DELETE** </ins>

**Request:**
<ins> DELETE/person/id </ins>

**Respons:**
Success Code "204"
______________________________

## <ins> Помощь в Cross-check</ins>
________________________________
## Базовая реализация

1. В репозитории с приложением имеется файл `Readme.md`, содержащий подробные инструкции по установке, запуску и использованию приложения **плюс 10 баллов**
2. Сервер возвращает соответствующие ответы на запросы:
* **GET** `/person`:
    * Сервер возвращает статус код 200 и все записи **плюс 6 баллов**
* **GET** `/person/{personId}`:
    * Сервер возвращает статус код 200 и запись с `id === personId`, если такая запись есть **плюс 10 баллов**
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`) **плюс 6 баллов**
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена **плюс 6 баллов**
* **POST** `/person`
    * Сервер возвращает статус код 201 и свежесозданную запись **плюс 10 баллов**
    * Сервер возвращает статус код 400 и соответствующее сообщение, если тело запроса не содержит обязательных полей **плюс 6 баллов**
* **PUT** `/person/{personId}`
    * Сервер возвращает статус код 200 и обновленную запись **плюс 10 баллов**
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`) **плюс 6 баллов**
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена **плюс 6 баллов**
* **DELETE** `/person/{personId}`
    * Сервер возвращает статус код 204 если запись найдена и удалена **плюс 10 баллов**
    * Сервер возвращает статус код 400 и соответствующее сообщение, если `personId` невалиден (не `uuid`) **плюс 6 баллов**
    * Сервер возвращает статус код 404 и соответствующее сообщение, если запись с `id === personId` не найдена **плюс 6 баллов**

## Продвинутая реализация:
*  Ошибки, возникающие при обработке запроса на `/person` корректно обрабатываются и в случае их возникновения API возвращает статус код 500 с соответствующим сообщением **плюс 10 баллов**
*  Запросы на несуществующие ресурсы (например, `/some/non/existing/resource`) корректно обрабатываются (возвращается human friendly сообщение и 404 статус код) **плюс 6 баллов**
*  Приложение запускается в development-режиме при помощи `nodemon` (имеется `npm` скрипт `start:dev`) **плюс 6 баллов**
*  Приложение запускается в production-режиме при помощи `webpack` (имеется `npm` скрипт `start:prod`, который запускает процесс сборки webpack и после этого запускает файл с билдом) **плюс 6 баллов**
*  Значение `PORT` хранится в `.env` файле **плюс 6 баллов**

## Hacker scope
* Имеются E2E тесты, покрывающие логику приложения (не меньше 3 различных сценариев) **плюс 30 баллов**
Пример сценария:
1. GET-запросом получаем все объекты (ожидается пустой массив)
2. POST-запросом создается новый объект (ожидается ответ, содержащий свежесозданный объект)
3. GET-запросом пытаемся получить созданный объект по его `id` (ожидается созданный объект)
4. PUT-запросом пытаемся обновить созданный объект (ожидается ответ, содержащий обновленный объект с тем же `id`)
5. DELETE-запросом удаляем созданный объект по `id` (ожидается подтверждение успешного удаления)
6. GET-запросом пытаемся получить удаленный объект по `id` (ожидается ответ, что такого объекта нет)
