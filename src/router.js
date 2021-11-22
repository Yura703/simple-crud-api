module.exports = {
  get: async (url, response) => {
    try {
      const positions = await getAllPositions();
      response.setHeader("Location", "/positions/");
      response.statusCode = 200;
      response.end(positions);

      //return positions;
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify(e));
      return e;
    }
  },

  post: async (newPosition, res) => {
    // Note: newPosition JSON example:
    /*
              {
                  "company": "Rakuten",
                  "level": "junior",
                  "description": "This position is for young and talented developers",
                  "category": "nodejs"
              }
             */
    try {
      const id = await addNewPosition(newPosition);
      res.setHeader("Location", "/positions/" + id);
      res.statusCode = 201;
      res.end(`New position with id='${id}' created`);

      return `New position with id='${id}' created`;
    } catch (e) {
      res.statusCode = 500;
      res.end(JSON.stringify(e));
      return e;
    }
  },

  put: async (newPosition, res) => {},

  delete: async (newPosition, res) => {},
};
