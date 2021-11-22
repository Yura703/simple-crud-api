const http = require("http");
const fs = require('fs');
require("dotenv").config();
const router = require('./src/router');

const server = http.createServer(function (request, response) {
    const {method, url} = request;
    
    switch (method) {
        case 'GET':
            router.get(url, response);
            
            break;

        case 'POST':
          let data = "";
          const post_req = request(post_options, function(res) {
            res.setEncoding('utf8');
            res.on('data', function (chunk) {
              data += chunk;
                console.log(data);
            });
        });

        router.post(data, response);
                  
        break;

        case 'PUT':
          router.put(url, response);
            
        break;

        case 'DELETE':
          router.delete(url, response);
            
        break;

    
        default:
            break;
    }
    if (method == 'GET') {
        
    } else if (method == 'POST') {  

        
    }   

    }
}




  res.writeHead(200, { "Content-Type": "test/thml" });
  res.write("Hello");
  res.end();
});

const port = process.env.PORT || 4000;

server.listen(port, function (error) {
  if (error) {
    console.log("Error server:" + error);
  } else {
    console.log("Server is listening on port" + port);
  }
});

// const Person = require("./src/person");

// const p = new Person("Yura", 42, ["aaa", "bbb"]);
// console.log(p);
