const fs = require('fs');
const path = require('path');
const productosFile = './productos.json';
const carritoFile = './carrito.json';

const finished = (error) => {
    if (error) {
        console.error(error);
        return;
    }
};

/**
 * Codes:
 * 9001: Quantity not real
 * 9002: Product code repeated
 * 9003: Product added
 *
 * 9099: Type mismatch
 */
class ProductsManager {
    constructor(file_path = process.cwd(), file = productosFile) {
        this.file_path = file_path;
        this.file = file;
        this.original_products = {};
        this.current_id = 0;

        if (!fs.existsSync(path.join(this.file_path, this.file))) {
            try {
                fs.writeFileSync(path.join(this.file_path, this.file), JSON.stringify(this.original_products, null, 2));
            } catch (e) {
                console.log(`Error: ${e}`);
            }
        }

        const read_products = fs.readFileSync(path.join(this.file_path, this.file), 'utf-8');
        this.products = JSON.parse(read_products);
        this.current_id = Object.keys(this.products)[Object.keys(this.products).length - 1];
    }

    getProducts() {
        if (this.current_id >= 1) {
            return this.products;
        } else {
            return undefined;
        }
    }

    addProduct(title, description, code, price, stat = true, stock, category, thumbnail = []) {
        if (stock <= 0 || typeof stock !== 'number') {
            return '9001';
        }

        let ids = [];
        let codes = [];
        Object.entries(this.products).forEach((producto) => {
            ids.push(producto[0]);
            codes.push(producto[1]['code']);
        });

        let max = Math.max(...ids);

        if (max == '-Infinity') {
            max = 0;
        }

        if (codes.includes(code)) {
            return '9002';
        }

        let this_item = {};

        this_item.id = max + 1;
        this_item.title = title;
        this_item.description = description;
        this_item.code = code;
        this_item.price = price;
        this_item.stat = stat;
        this_item.stock = stock;
        this_item.category = category;
        this_item.thumbnail = thumbnail;

        this.products[this_item.id] = this_item;

        fs.writeFileSync(path.join(this.file_path, this.file), JSON.stringify(this.products, null, 2), 'utf-8', finished);
        return '9003';
    }
}

exports.getProducts = (req, res) => {
    const all_products = new ProductsManager();
    const prod_list = all_products.getProducts();
    const max_products = Object.keys(all_products).length - 1;
    const new_limit = req.query.limit;

    if (prod_list === undefined) {
        res.status(404).json({
            success: true,
            message: `There are no products`,
            data: {},
        });
    }
    if (new_limit !== undefined) {
        if (new_limit > max_products || new_limit <= 0 || isNaN(new_limit)) {
            res.status(200).json({
                success: true,
                message: 'The limit must be greater than zero and equal or less to the total amount of products.',
                data: {},
            });
        } else {
            const sliced = Object.entries(prod_list).slice(0, new_limit);
            const plural = new_limit > 1 ? `fisrt ${new_limit} products` : `fisrt product`;
            res.status(200).json({
                success: true,
                message: `Here are the ${plural}`,
                data: sliced,
            });
        }
    } else {
        res.status(200).json({
            success: true,
            message: `Here are all the products`,
            data: prod_list,
        });
    }
};

exports.getProduct = (req, res) => {
    const all_products = new ProductsManager();
    const new_pid = req.params.pid;
    const selected_product = all_products['products'][new_pid];

    if (new_pid !== undefined && selected_product !== undefined) {
        if (new_pid <= 0 || isNaN(new_pid)) {
            res.status(404).json({
                success: true,
                message: `The ID must be greater than zero and has to exist in the products list.`,
                data: {},
            });
        } else {
            res.status(200).json({
                success: true,
                message: `Here is the product with the id ${new_pid}`,
                data: selected_product,
            });
        }
    } else {
        res.status(404).json({
            success: true,
            message: `The ID must be greater than zero and has to exist in the products list.`,
            data: {},
        });
    }
};

exports.postProduct = (req, res) => {
    const data = req.body;

    // if (!data.title || typeof data.title !== 'string' || !(data.title instanceof String)) {
    //     return '9099';
    // }

    // if (!data.description || typeof data.description !== 'string' || !(data.description instanceof String)) {
    //     return '9099';
    // }

    // if (!data.code || typeof data.code !== 'string' || !(data.code instanceof String)) {
    //     return '9099';
    // }

    // if (!data.price || typeof data.price !== 'number' || !(data.price instanceof Number)) {
    //     return '9099';
    // }

    // if (!data.stat || typeof data.stat !== 'boolean' || !(data.stat instanceof Boolean)) {
    //     return '9099';
    // }

    // if (!data.stock || typeof data.stock !== 'number' || !(data.stock instanceof Number)) {
    //     return '9099';
    // }

    // if (!data.category || typeof data.category !== 'string' || !(data.category instanceof String)) {
    //     return '9099';
    // }

    // if (!data.thumbnail || typeof data.thumbnail !== 'array' || !(data.thumbnail instanceof Array)) {
    //     return '9099';
    // }

    const all_products = new ProductsManager();
    const prod_list = all_products.addProduct(
        data.title,
        data.description,
        data.code,
        data.price,
        data.stat,
        data.stock,
        data.category,
        data.thumbnail
    );

    if (prod_list == 9003) {
        res.status(200).json({
            success: true,
            message: `The product was added to the list.`,
            data: {},
        });
    } else {
        res.status(200).json({
            success: true,
            message: `no no no no.`,
            data: {},
        });
    }
};
