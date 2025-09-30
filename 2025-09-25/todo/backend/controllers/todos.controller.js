const crypto = require("node:crypto");
const { validationResult } = require("express-validator");

const todos = [
  {
    id: crypto.randomUUID(),
    title: "Buy milk",
    completed: false,
    createdAt: Date.now(),
    updatedAt: null,
    deleted: false,
  },
];

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { title } = req.body;
  const now = Date.now();
  const todo = {
    id: crypto.randomUUID(),
    title,
    completed: false,
    createdAt: now,
    updatedAt: null,
    deleted: false,
  };
  todos.push(todo);
  res.status(201).json(todo);
};

exports.read = (_req, res) => {
  res.json(todos.filter((t) => !t.deleted));
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { id } = req.params;
  const { title, completed } = req.body;

  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) return res.status(404).json({ error: "todo not found" });

  if (typeof title === "string") todo.title = title;
  if (typeof completed === "boolean") todo.completed = completed;

  todo.updatedAt = Date.now();
  res.json(todo);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const todo = todos.find((t) => t.id === id && !t.deleted);
  if (!todo) return res.status(404).json({ error: "todo not found" });

  todo.deleted = true;
  todo.updatedAt = Date.now();
  res.sendStatus(204);
};
