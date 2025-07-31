const dotenv = require('dotenv');
dotenv.config();

exports.productController = async (req, res) => {
    res.render('pages/products')
}

exports.getProductDetails = async (req, res) => {
    try {
        const productId = req?.params?.id;
        const response = await fetch(`${process.env.BASE_URL || 'http://localhost:8089'}/api/products/${productId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': req.headers.cookie || ''
            },
            // credentials: 'include'
        });
        const data = await response.json();
        if (data.success) {
            res.render('pages/product-detail.handlebars', {
                layout: 'main.handlebars',
                data: data
            });
        } else {
            res.redirect('/products');
        }
    } catch (err) {
        console.log(err);
        res.redirect('/products');
    }
}