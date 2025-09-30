const express = require("express");
const { body } = require("express-validator"); 
const router = express.Router();
const catsController = require("../controllers/cats.controller");
const {
  catsRouteMiddleware,
  catsGetRouteMiddleware,
} = require("../middlewares/cats.middlewares");

router.use(catsRouteMiddleware);

router.get("/", catsGetRouteMiddleware, catsController.read);

router.post(
  "/",
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name must be 20 chars or fewer"),
  catsController.create
);

//router.put("/:id", catsController.update);
router.put(
  "/:id",
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ max: 20 })
    .withMessage("Name must be 20 chars or fewer"),
  catsController.update
);

router.delete("/:id", catsController.delete);

module.exports = router;