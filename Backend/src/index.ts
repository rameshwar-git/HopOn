import express = require("express");

  const app = express();
  const port = process.env.PORT || 3000;

  app.get('/', (req: express.Request, res: express.Response) => {
    res.send('Hello from TypeScript Express!');
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });