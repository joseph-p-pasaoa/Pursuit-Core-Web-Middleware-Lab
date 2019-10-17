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


/* SERVER MAIN */
// Animal Route //
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


// Random Route //
const generateSpread = (req, res, next) => {
  res.locals.output = {
    status: "success",
    range: [parseInt(req.query.floor), parseInt(req.query.ceil)],
  }
  if (res.locals.output.range[0] >= res.locals.output.range[1]) {
    res.status(400).json({
      status: "failure",
      message: "error: your must be at least 2 larger than your floor. please check your inputs and try again"
    })
  } else {
    res.locals.array = [];
    for (let i = res.locals.output.range[0] + 1; i < res.locals.output.range[1]; i ++) {
      res.locals.array.push(i);
    }
    next();
  }
};
const selectNum = (req, res, next) => {
  res.locals.output['randPick'] = res.locals.array[Math.floor(Math.random() * res.locals.array.length)];
  res.json(res.locals.output);
};
app.get("/random", generateSpread, selectNum);


// Queue Route //
let volunteers = ['alice', 'tracy', 'xavier', 'dustin', 'michelle', 'corey', 'reed'];
const handleQueue = (req, res, next) => {
  switch (req.params.op) {
    case 'enqueue':
      volunteers.unshift(req.query.name);
      res.json({
          status: "success",
          enqueued: req.query.name
      });
      break;
    case 'dequeue':
      const dequeued = volunteers[volunteers.length - 1];
      volunteers.pop();
      res.json({
          status: "success",
          dequeued: dequeued
      });
      break;
    case 'peek':
      res.json({
          status: "success",
          data: volunteers[volunteers.length - 1]
      });
      break;
    default:
      res.status(404).json({
          status: "failure",
          message: "error: path not found"
      });
  }
}
app.get("/queue/:op", handleQueue);


/* NO ROUTE CATCH */
app.use("*", (req, res) => {
    res.status(404).json({
        status: "failure",
        message: "error: path not found"
    });
});
