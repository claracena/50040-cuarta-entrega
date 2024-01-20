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
