const modul = require("./module.json");
const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const renderTasks = async (req, res) => {
  try {
    res.send(modul);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

const createTask = async (req, res, next) => {
  const { title, description, price, options } = await req.body;

  try {
    modul.push({ id: uuidv4(), title, description, price, options });
    const total = [...modul];
    const fin = JSON.stringify(total);
    await fs.writeFile(__dirname + "/module.json", fin);
    res.status(201);
    res.send(modul);
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

const taskOne = async (req, res) => {
  const { id } = req.params;
  const task = modul.find((num) => num.id === id);
  if (task === undefined) {
    res.status(404);
    res.send("Not Found");
    return;
  }

  res.status(200);
  res.send(task);
};

const deleteTask = async (req, res, next) => {
  const { id } = req.params;
  const task = modul.filter((num) => id !== num.id);
  console.log(task);
  const fin = JSON.stringify(task);
  await fs.writeFile(__dirname + "/module.json", fin);
  res.status(200);
  res.send(task);
};
module.exports = {
  renderTasks,
  createTask,
  taskOne,
  deleteTask,
};
