const { Sequelize } = require('sequelize');
const { DataTypes } = require('sequelize');
const DistributionCenter = require('./DistributionCenter.js');
const User = require('./User.js');
const Product = require('./Product.js');
const InventoryItem = require('./InventoryItem.js');
const Order = require('./Order.js');
const OrderItem = require('./OrderItem.js');
const dotenv = require('dotenv');
dotenv.config();

let sequelize = null;
let models = {};

const dbConnection = async (database, username, password) => {
    sequelize = new Sequelize(database, username, password, {
        host: process.env.PG_HOST || 'localhost',
        dialect: 'postgres'
    });

    try {
        await sequelize.authenticate();
        console.log('\nConnection with database successful >>>\n');

        // Initialize all models
        models.DistributionCenter = DistributionCenter(sequelize, DataTypes);
        models.User = User(sequelize, DataTypes);
        models.Product = Product(sequelize, DataTypes);
        models.InventoryItem = InventoryItem(sequelize, DataTypes);
        models.Order = Order(sequelize, DataTypes);
        models.OrderItem = OrderItem(sequelize, DataTypes);

        // Define associations
        models.Product.belongsTo(models.DistributionCenter, {
            foreignKey: 'distribution_center_id'
        });
        models.DistributionCenter.hasMany(models.Product, {
            foreignKey: 'distribution_center_id'
        });

        models.InventoryItem.belongsTo(models.Product, {
            foreignKey: 'product_id'
        });
        models.Product.hasMany(models.InventoryItem, {
            foreignKey: 'product_id'
        });

        models.Order.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        models.User.hasMany(models.Order, {
            foreignKey: 'user_id'
        });

        models.OrderItem.belongsTo(models.Order, {
            foreignKey: 'order_id',
            targetKey: 'order_id'
        });
        models.Order.hasMany(models.OrderItem, {
            foreignKey: 'order_id',
            sourceKey: 'order_id'
        });

        models.OrderItem.belongsTo(models.User, {
            foreignKey: 'user_id'
        });
        models.User.hasMany(models.OrderItem, {
            foreignKey: 'user_id'
        });

        models.OrderItem.belongsTo(models.Product, {
            foreignKey: 'product_id'
        });
        models.Product.hasMany(models.OrderItem, {
            foreignKey: 'product_id'
        });

        models.OrderItem.belongsTo(models.InventoryItem, {
            foreignKey: 'inventory_item_id'
        });
        models.InventoryItem.hasOne(models.OrderItem, {
            foreignKey: 'inventory_item_id'
        });

        // Handle associations if models have associate methods
        Object.values(models).forEach(model => {
            if (typeof model.associate === 'function') {
                model.associate(models);
            }
        });

        // Sync tables
        await sequelize.sync({ alter: false });
        console.log('\nDatabases synced successfully >>>\n');
        return models;
    } catch (err) {
        console.log('Unable to connect to database:', err);
        throw err;
    }
};

module.exports = {
    dbConnection,
    models,
    sequelize,
    getSequelize: () => sequelize
};