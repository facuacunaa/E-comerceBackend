import fs from 'fs';

export class ShoppingCart {
    constructor(path) {
        this.productsInCart = [];
        this.path = path;
    }

    generateIdShop() {
        let id = 1;

        try {
           
            if (fs.existsSync(this.path)) {
                
                const data = fs.readFileSync(this.path, 'utf-8');
                const productsInCart = JSON.parse(data);

                
                if (productsInCart.length > 0) {
                    const lastCart = productsInCart[productsInCart.length - 1];
                    id = lastCart.idShop + 1;
                }
            }
        } catch (error) {
            console.log(`Error al generar el ID del carrito: ${error}`);
        }

        return id;
    }

    getAllProductsInCart() {
        
        let data = fs.readFileSync(this.path, 'utf-8');
        let productsInCart = JSON.parse(data);

        
        let allProducts = [];
        for (const cart of productsInCart) {
            const cartProducts = {
                idShop: cart.id,
                products: cart.products
            };
            allProducts.push(cartProducts);
        }

        return allProducts;
    }

    createCart() {
        try {
            const idShop = this.generateIdShop();
            const newCart = {
                idShop,
                products: []
            };

            let data;
            let productsInCart = [];

           
            if (fs.existsSync(this.path)) {
                
                data = fs.readFileSync(this.path, 'utf-8');
                productsInCart = JSON.parse(data);
            }

           
            const existingCart = productsInCart.find(cart => cart.idShop === idShop);

            if (existingCart) {
                console.log(`El carrito con ID ${idShop} ya existe.`);
                return;
            }

            
            productsInCart.push(newCart);

            
            data = JSON.stringify(productsInCart);

          
            fs.writeFileSync(this.path, data, 'utf-8');

            console.log(`Carrito con ID ${idShop} creado correctamente.`);
        } catch (error) {
            console.log(`Error al crear el carrito: ${error}`);
        }
    }

    addProductToCart(idShop, product) {
        try {
            let data;
            let productsInCart = [];

            
            if (fs.existsSync(this.path)) {
                
                data = fs.readFileSync(this.path, 'utf-8');
                productsInCart = JSON.parse(data);
            }

            
            const existingCartIndex = productsInCart.findIndex((cart) => cart.idShop === idShop);

            if (existingCartIndex !== -1) {
                const existingCart = productsInCart[existingCartIndex];
                const existingProduct = existingCart.products.find((p) => p.id === product.id);

                if (existingProduct) {
                   
                    console.log('El producto ya está en el carrito.');
                    return false; 
                } else {
                   
                    existingCart.products.push(product);
                }
            } else {
                
                console.log('Debe crear primero el carrito antes de agregar productos.');
                return false; 
            }

            
            data = JSON.stringify(productsInCart);

          
            fs.writeFileSync(this.path, data, 'utf-8');

            console.log('Producto agregado al carrito correctamente.');
            return true; 
        } catch (error) {
            console.log(`Error al agregar el producto al carrito: ${error}`);
            return false; 
        }
    }

    getProductsInCartById(cartId) {
      
        try {
           
            const data = fs.readFileSync(this.path, 'utf-8');
            const productsInCart = JSON.parse(data);
           

            
            const cart = productsInCart.find(cart => +cart.idShop == cartId);

            // Verificar si se encontró el carrito
            if (cart) {
                return cart.products;
            }

            return null;
        } catch (error) {
            console.log(`Error al obtener los productos del carrito: ${error}`);
            return null;
        }
    }

}