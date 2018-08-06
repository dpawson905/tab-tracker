const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const debug = require("debug")("server:backend");

const app = express();
app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

app.post("/register", (req, res) => {
  res.send({
    message: "Your user was registered"
  });
});

const port = process.env.PORT || 8081;
app.listen(port, () => {
  debug(`App has started on port ${port}`);
});
