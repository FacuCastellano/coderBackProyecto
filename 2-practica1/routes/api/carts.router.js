const { Router, request } = require("express");

//const myProducts = new ProductManager("products.json");
const cartManager = require("../../dao/cart.manager");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/carts"

//ruta 1, crea un carrito nuevo (pero tengo que asociarlo a un userId)
router.post("/", async (req = request, res) => {
  try {
    const { userId } = req.query;
    //aca podria ver si ese usuario ya tiene un carrito, y si lo tiene no lo creo y traigo el ya creado.

    if (!userId) {
      throw new Error("userId must be a query param");
    }

    await cartManager.createCart({userId});
    res.send({ status: "Success, a new was created" });
  } catch (e) {
    console.log(e);
    res.status(500).send({ status: "Error, the cart was not created" });
  }
});

//ruta 2, devuelvo los productos de un carrito en especifico.
router.get("/:cid", async (req, res) => {
  try {
    const cartId = req.params.cid; 
    const cart = await cartManager.getById(cartId);
    if(!cart){
      throw new Error("cart not found")
    }
    res.send({ status: "success", payload: cart.products });
  } catch (e) {
    console.log(e)
    res.send({ status: "cart not found", payload: null });
  }
});

// router.post("/:cid/product/:pid", async (req, res) => {
//   try {
//     const cartId = +req.params.cid;
//     const productId = +req.params.pid;
//     myCarts.checkCartExistence(cartId); //si el cartId es invalido salta aca
//     myProducts.checkProductExistence(productId); //si el productId es invalido salta aca
//     const wasProductAdded = myCarts.addProductToCart(cartId, productId);
//     if (wasProductAdded) {
//       res.send({
//         status: `Success the product (id=${productId}), was added to the cart (id=${cartId})`,
//       });
//     }
//   } catch (e) {
//     res.send({ status: `Error`, Error: e.message });
//   }
// });

module.exports = router;