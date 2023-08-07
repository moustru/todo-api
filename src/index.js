const express = require("express");
const router = express.Router();
const app = express();

const host = "127.0.0.1";
const port = 8000;

router.get("/", (req, res) => {
  res.send("Hello!");
});

app.use("/api", router);

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
