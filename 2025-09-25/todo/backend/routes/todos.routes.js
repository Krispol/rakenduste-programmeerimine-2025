const express = require("express");
const { body } = require("express-validator");
const router = express.Router();

router.use((_req, _res, next) => {
  console.log("[/todos]", new Date().toISOString());
  next();
});

const todosController = require("../controllers/todos.controller");

router.get("/", todosController.read);

router.post(
  "/",
  body("title").trim().notEmpty().withMessage("title is required").isLength({ max: 100 }),
  todosController.create
);

router.put(
  "/:id",
  body("title").optional().isString().isLength({ min: 1, max: 100 }),
  body("completed").optional().isBoolean(),
  todosController.update
);

router.delete("/:id", todosController.delete);

router.put("/:id/restore", todosController.restore);

module.exports = router;
