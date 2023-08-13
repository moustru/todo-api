const express = require("express");
const router = express.Router();
const app = express();
const cors = require("cors");
const DB = require("./db");
const bodyParser = require("body-parser");

const host = "127.0.0.1";
const port = 8000;

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/api", cors(), router);

router.get("/", (req, res) => {
  return res.send("Hello!");
});

router
  .route("/todos")
  .get((_, res) => {
    return res.send(DB.TODOS);
  })
  .post((req, res) => {
    if (!req.body) return res.status(400).send("Ничего не отправлено");

    try {
      DB.TODOS.push(req.body);
      return res.status(200).send("Запись успешно добавлена");
    } catch {
      return res.status(400).send("Ошибка записи");
    }
  });

router.route("/todos/:todoId").delete((req, res) => {
  if (!req.params.todoId)
    return res.status(400).send("Не выбрана запись для удаления");

  const relatedTodo = DB.TODOS.find((todo) => todo.id === req.params.todoId);

  if (!relatedTodo)
    return res.status(400).send("По запрашиваемому ID запись не найдена");

  DB.TODOS = DB.TODOS.filter((todo) => todo.id !== req.params.todoId);
  res.status(200).send("Запись успешно удалена");

  res.end();
});

app.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
