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
        **```npm run start:dev ```**
        **```npm run start:prod```**
**4.** There are **E2E** tests covering the logic of the application (Jest + Supertest). 
        **```npm run test```**
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
    "id": "id(uuid format)",
    "name": "Yura",
    "age": 42,
    "hobbies": ["swimming", "programming"] 
}
 ```
____________________________
<ins> **PUT** </ins>

**Request:**
<ins> PUT/person/id(uuid format) </ins>
```  
JSON Body:
{
    "name": "Natali",
    "age": 32,
    "hobbies": ["swimming", "programming"] 
}
 ```

**Respons:**
Success Code "200 OK"
```  
Response Body:
{
    "id": "id(uuid format)",
    "name": "Natali",
    "age": 32,
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

