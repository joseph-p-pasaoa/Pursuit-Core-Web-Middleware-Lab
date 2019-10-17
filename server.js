// Joseph P. Pasaoa
// Middleware Lab
//

/* CUSTOM HELPERS */
const log = console.log;

/* MODULES INIT */
const express = require('express');
  const app = express();
  const port = 8110;
const cors = require('cors');
  app.use(cors());
const path = require('path');


/* SERVER INIT */
app.listen(port, () => {
    log(`JoeyServer is now the talkative fly on the localhost wall at port ${port}. Cogito ergo sum.`);
});
app.use("/", express.static(path.join(__dirname, "errors")));


