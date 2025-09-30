const cats = [
  {
    id: "7d613b93-fa3e-4ef3-a9d2-e09e5ca6e4e6",
    name: "Meow",
    createdAt: 1727098800585,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-4c6b66fb0836",
    name: "Kitty",
    createdAt: 1727098952739,
    updatedAt: null,
    deleted: false,
  },
  {
    id: "2dc9ce08-d345-4fed-8560-e09e5ca6e4e6",
    name: "Miisu",
    createdAt: 1727098952731,
    updatedAt: null,
    deleted: false,
  },
];

//crypto.randomUUID()
const crypto = require("node:crypto");
const { validationResult } = require("express-validator");

exports.create = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name } = req.body;
  const now = Date.now();
  const newCat = {
    id: crypto.randomUUID(),
    name,
    createdAt: now,
    updatedAt: null,
    deleted: false,
  };

  console.log(name);
  cats.push(newCat);
  return res.sendStatus(201).json(newCat);
};

exports.read = (req, res) => {
  res.json(cats.filter((c) => !c.deleted));
};

exports.update = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  
  const { id } = req.params;
  const { name } = req.body;

  if (!name || typeof name !== "string") {
    return res.status(400).json({ error: "name is required" });
  }

  const cat = cats.find((c) => c.id === id && !c.deleted);
  if (!cat) {
    return res.status(404).json({ error: "cat not found" });
  }

  cat.name = name;
  cat.updatedAt = Date.now();
  return res.json(cat);
};

exports.delete = (req, res) => {
  const { id } = req.params;
  const cat = cats.find((c) => c.id === id && !c.deleted);
  if (!cat) {
    return res.status(404).json({ error: "cat not found" });
  }

  cat.deleted = true;
  cat.updatedAt = Date.now();
  return res.sendStatus(200);
};
