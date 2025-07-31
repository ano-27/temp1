const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const InventoryItem = sequelize.define('InventoryItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    sold_at: {
      type: DataTypes.DATE
    },
    cost: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    },
    product_category: {
      type: DataTypes.STRING
    },
    product_name: {
      type: DataTypes.STRING
    },
    product_brand: {
      type: DataTypes.STRING
    },
    product_retail_price: {
      type: DataTypes.DECIMAL(10, 2)
    },
    product_department: {
      type: DataTypes.STRING
    },
    product_sku: {
      type: DataTypes.STRING
    },
    product_distribution_center_id: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'inventory_items',
    timestamps: false
  });

  return InventoryItem;
};