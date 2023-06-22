import { Router } from 'express'
import { ProductManager } from '../src/ProductManager.js'

const router = Router();

const manager = new ProductManager('./products.json');



router.get('/', async (req, res) => {
    try {
        const products = await manager.getProducts();
        res.json(products);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});



router.post('/', async (req, res) => {

    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    } = req.body;

 
    const newProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    };

    try {
        await manager.addProduct(newProduct);
        res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});



router.get('/:id', async (req, res) => {
    const productId = req.params.id;
    try {
        const product = await manager.getProductById(+productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});


router.put('/:id', (req, res) => {
    const productId = req.params.id;
    const {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    } = req.body;

    
    if (!title || !description || !price || !thumbnail || !code || !stock) {
        return res
            .status(400)
            .json({ error: 'Debes proporcionar todos los valores obligatorios' });
    }

    
    const updatedProduct = {
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnail,
    };

    try {
        manager.updateProduct(+productId, updatedProduct);
        res.json({ message: 'Producto actualizado exitosamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});




router.delete('/:id', async (req, res) => {
    const productId = parseInt(req.params.id);

    try {
        const product = await manager.getProductById(productId);

        if (!product) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        manager.deleteProduct(productId);

        res.json({ message: 'Producto eliminado exitosamente' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


export default router;