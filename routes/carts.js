const express = require("express");
const router = express.Router();
const cartsRepo = require("../repositories/carts");
const productsRepo = require("../repositories/products");

const cartShowTemplate = require("../views/carts/show");
//Recieve a post request to add an item to a cart
router.post("/cart/products", async (req, res) => {
  console.log(req.body.productId);

  let cart;

  if (!req.session.cartId) {
    cart = await cartsRepo.create({ items: [] });
    req.session.cartId = cart.id;
  } else {
    cart = await cartsRepo.getOne(req.session.cartId);
  }

  const existingItem = cart.items.find(
    (item) => item.id === req.body.productId
  );

  if (existingItem) {
    existingItem.quantity++;
  } else {
    cart.items.push({ id: req.body.productId, quantity: 1 });
  }

  await cartsRepo.update(cart.id, {
    items: cart.items,
  });
  res.redirect("/cart");
});
//Recieve a GET request to show all items in caretColor: //

router.get("/cart", async (req, res) => {
  if (!req.session.cartId) {
    res.redirect("/");
  }

  const cart = await cartsRepo.getOne(req.session.cartId);
  for (let item of cart.items) {
    const product = await productsRepo.getOne(item.id);

    item.product = product;
  }

  res.send(cartShowTemplate({ items: cart.items }));
});

router.post("/cart/products/delete", async (req, res) => {
  const { itemId } = req.body;
  const cart = await cartsRepo.getOne(req.session.cartId);

  const items = cart.items.filter((item) => item.id !== itemId);

  await cartsRepo.update(req.session.cartId, { items });

  res.redirect("/cart");
});

module.exports = router;
