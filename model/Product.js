const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    brand: {
      type: DataTypes.STRING
    },
    retail_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    department: {
      type: DataTypes.STRING
    },
    sku: {
      type: DataTypes.STRING,
    },
    distribution_center_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'distribution_centers',
        key: 'id'
      }
    }
  }, {
    tableName: 'products',
    timestamps: false
  });

  return Product;
};