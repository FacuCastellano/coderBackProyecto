const { Router } = require("express");
const router = Router(); //este objeto contendra todas las rutas de esta seccion, es lo que al final exporto.
const productManager = require("../../dao/product.manager");

// TODOAS LAS RUTAS QUE SIGUEN tienen por defecto el prefijo "/api/products"

//ruta 1, acepta un query parm "limit", que limita la cantidad de productos, si no esta este limite, se traen todos los productos.
router.get("/", async (req, res) => {
  const { limit, page } = req.query;
 
  // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
  if (isNaN(limit) && limit !== undefined) {
    res.send({
      status: "Error",
      Error: "the (limit) value is wrong",
    });
    return;
  }
  res
    .status(200)
    .send({ status: "success", payload: await productManager.getAll({limit,page}) });
  return;
  // if (!limit) {
  //   res.send({ status: "success", payload: await productManager.getAll()});
  //   return; //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
  // }
  // // const productsToshow =await productManager.getAll().slice(0, limit);
  // // res.send({ status: "success", payload: productsToshow });
});

// //ruta 2, trae le producto cuyo id se le pase como Url Param.
// router.get("/:pid", (req, res) => {
//   const id = req.params.pid;
//   // isNaN(Valor), devuelve true si Valor no es parseable a tipo Number
//   if (isNaN(id)) {
//     res.send({
//       status: "Bad Requests, (id)  must be a integer number",
//       payload: null,
//     });
//     return; //este return vacio es para cortar la funcion, sino tira como un "error" segun la correccion de mayra, si yo lo saco no veo ese error
//   }
//   let product;
//   try {
//     product = myProducts.getProductById(+id);
//     res.send({ status: "success", payload: product });
//   } catch {
//     res.send({ status: "Product Not Found", payload: null });
//   }
// });

//ruta 3, ruta post para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const product = req.body;
    const info = await productManager.addProduct(product);
    res.send({ status: "success", productId: info._id });
  } catch (e) {
    res.status(500).send({ status: "Error, the product was not created" });
  }
});

//ruta 4 ruta put modificar ciertas propiedades de un producto
router.put("/:pid", async (req, res) => {
  try {
    const productId = +req.params.pid;
    const newPropiertiesValues = req.body;
    await myProducts.updateProductById(productId, newPropiertiesValues);
    res.send({ status: `Success, the product id:${productId} was updated` });
  } catch (e) {
    res.status(500).send({ status: "Error", "Error type": e.message });
  }
});

//ruta 5, ruta post para eliminar producto
router.delete("/:pid", async (req, res) => {
  try {
    const pid = +req.params.pid;
    myProducts.deleteProductById(pid);
    res.send({ status: `Success, the product id:${pid} was deleted` });
    return;
  } catch (err) {
    res.send({ status: "Error", "Error type": err.message });
  }
});

module.exports = router;
