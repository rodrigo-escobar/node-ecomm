const productsRouter = require("./products");
const cartsRouter = require("./carts");
const authRouter = require("./admin/auth");
const adminProductsRouter = require("./admin/products");

module.exports = {
  productsRouter,
  authRouter,
  adminProductsRouter,
  cartsRouter,
};
