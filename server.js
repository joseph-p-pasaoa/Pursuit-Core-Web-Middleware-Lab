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
// app.use("/", express.static(path.join(__dirname, "errors")));


const zooRoster = {
  zebra: 12,
  lion: 4,
  panda: 1,
  elephant: 0,
  horse: 9,
  pig: 5,
  wolve: 6,
  penguin: 1873 
};
const isAnimal = (req, res, next) => {
  res.json({
    status: "success",
    message: !!zooRoster[req.params.query]
  });
};
app.get("/animal/:query", isAnimal);


app.use("*", (req, res) => {
    res.status(200).json({
        status: "failure"
    });
});