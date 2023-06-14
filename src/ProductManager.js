import fs from "fs";
export default class ProductManager {
  constructor() {
    this.id = 0;
    this.path = "./products.json";
  }
  async addProduct(title, description, price) {
    if (!title || !description || !price) {
      return console.log(
        "Error"     );
    } else {
      const productsDocument = await fs.promises.readFile(this.path);
      const productsJSON = JSON.parse(productsDocument);
      if (productsJSON.products.find((product) => product.code === code)) {
        return console.log(
          "Error"
        );
      } else {
        this.id = productsJSON.products.length;
        const product = {
          title,
          description,
          price,
          id: this.id,
        };
        productsJSON.products.push(product);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log("El producto ingresado");
      }
    }
  }

  async getProducts() {
    const productsDocument = await fs.promises.readFile(this.path);
    const productsJSON = JSON.parse(productsDocument);
    return productsJSON;
  }

  async getProductById(id) {
    if (!id) console.log("Error");
    else {
      const productsDocument = await fs.promises.readFile(this.path);
      const productsJSON = JSON.parse(productsDocument);
      const productFind = productsJSON.products.find(
        (product) => product.id === id
      );
      if (productFind) {
        return productFind;
      } else {
        return {
          error: "not found",
        };
      }
    }
  }

  async updateProduct(id, object) {
    if (!id || !object) {
      return console.log(
        "Error"
      );
    } else {
      const productsDocument = await fs.promises.readFile(this.path);
      const productsJSON = JSON.parse(productsDocument);
      if (productsJSON.products.find((product) => product.id === id)) {
        let productIndex = productsJSON.products.findIndex(
          (product) => product.id === id
        );
        let productFilter = productsJSON.products.filter(
          (product) => product.id === id
        );
        productFilter = {...productFilter[0], ...object};
        productsJSON.products.splice(productIndex, 1, productFilter);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log("El producto insertado");
      } else {
        return console.log("Not found");
      }
    } }

  async deleteProduct(id) {
    if (id != undefined) {
      const productsDocument = await fs.promises.readFile(this.path);
      const productsJSON = JSON.parse(productsDocument);
      if (productsJSON.products.find((product) => product.id === id)) {
        const productIndex = productsJSON.products.findIndex(
          (product) => product.id === id
        );
        productsJSON.products.splice(productIndex, 1);
        productsJSON.products.forEach((product) => product.id--);
        await fs.promises.writeFile(this.path, JSON.stringify(productsJSON));
        console.log("Eliminado exitosamente");
      }
    } else {
      return console.log("Error");
    }
  }
  async createJSON() {
    await fs.promises.writeFile(this.path, JSON.stringify({products: []}));
  }
}