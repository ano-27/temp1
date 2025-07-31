const { models, getSequelize } = require ('../model/index.js');  // Will be used to get the current value of sequelize, not the cached null reference

exports.getAllProducts = async (req, res) => {
    const sequelize = getSequelize();   
    try {
        let pagination = {};
        pagination.page = req?.query?.page || 1
        pagination.limit = req?.query?.limit || 10
        const { Product } = models;
        const result = await Product.findAll({
            limit: pagination.limit,
            offset: (pagination.page - 1) * pagination.limit
        });
        return res.status(200).json({
            success: true,
            message: result
        });
    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

exports.getProductDetails = async (req, res) => {
    try {
        const { Product } = models;
        if (!req?.params?.id) {
        return res.status(500).json({
            success: false,
            message: 'Please enter product Id'
        });
        }
        const productDetails = await Product.findOne({
            where: {
                id: req?.params?.id
            }
        });
        if (!productDetails) {
            return res.status(500).json({
                success: false,
                message: 'Failed to fetch details'
            });  
        }
        return res.status(200).json({
            success: true,
            message: 'Details fetched successfully',
            product: productDetails
        }); 
    } catch (e) {
        console.log('getProductDetails API error: ', err);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}