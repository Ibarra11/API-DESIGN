import { Router } from "express";
import { body, oneOf } from "express-validator";
import { handleInputHandlers } from "./middleware/handleInputErrors";
import {
  getProducts,
  deleteProduct,
  getOneProduct,
  updateProduct,
  createProduct,
} from "./handlers/product";
import {
  getUpdates,
  getOneUpdate,
  createUpdate,
  updateAnUpdate,
  deleteUpdate,
} from "./handlers/update";
const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getOneProduct);

router.post("/product", createProduct);
router.put(
  "/product/:id",
  body("name").isString(),
  handleInputHandlers,
  updateProduct
);
router.delete("/product/:id", deleteProduct);

router.get("/update", getUpdates);
router.get("/update/:id", getOneUpdate);

router.post(
  "/update",

  body(["body", "title", "productId"]).isString(),
  handleInputHandlers,
  createUpdate
);
router.put(
  "/update/:id",
  body(["title", "body"]).optional().isString(),
  body("productId").isString(),
  oneOf([
    body("status").matches("IN_PROGRESS"),
    body("status").matches("SHIPPED"),
    body("status").matches("DEPRECIATED"),
    body("status").matches("ARCHIVED"),
  ]),
  updateAnUpdate
);
router.delete("/update/:id", deleteUpdate);

router.get("/updatepoint", (req, res) => {});
router.get("/updatepoint/:id", (req, res) => {});
router.post(
  "/updatepoint",
  body(["name", "description"]).optional().isString(),
  handleInputHandlers,
  (req, res) => {}
);
router.put(
  "/updatepoint/:id",
  body(["name", "description", "updateId"]).optional().isString(),
  handleInputHandlers,
  (req, res) => {}
);
router.delete("/updatepoint/:id", (req, res) => {});

export default router;
