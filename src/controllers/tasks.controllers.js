const fs = require("fs").promises;
const { v4: uuidv4 } = require("uuid");
const renderTasks = async (req, res) => {
  try {
    const request = await fs.readFile(__dirname + "/module.json", "utf-8");
    const respons = await JSON.parse(request);
    console.dir(respons);
    res.send(respons);
  } catch (error) {
    console.log({ error });
    return res.render("error", { errorMessage: error.message });
  }
};

const createTask = async (req, res, next) => {
  const { title, description, price, options } = await req.body;

  try {
    const request = await fs.readFile(__dirname + "/module.json", "utf-8");
    const respons = await JSON.parse(request);

    respons.push({ id: uuidv4(), title, description, price, options });
    const total = [...respons];
    const fin = JSON.stringify(total);
    await fs.writeFile(__dirname + "/module.json", fin);
    console.dir(fin);
    res.status(201);
    res.send(fin);
  } catch (error) {
    return res.render("error", { errorMessage: error.message });
  }
};

const taskOne = async (req, res) => {
  const { id } = req.params;
  const request = await fs.readFile(__dirname + "/module.json", "utf-8");
  const respons = await JSON.parse(request);
  const task = respons.find((num) => num.id === id);
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
  const request = await fs.readFile(__dirname + "/module.json", "utf-8");
  const respons = await JSON.parse(request);
  const pop = respons.filter((num) => num.id !== id);
  const total = JSON.stringify(pop);
  await fs.writeFile(__dirname + "/module.json", total);
  console.dir(total);
  res.status(200);
  res.send(total);
};
module.exports = {
  renderTasks,
  createTask,
  taskOne,
  deleteTask,
};
