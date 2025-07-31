const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    order_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'orders',
        key: 'order_id'
      }
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'products',
        key: 'id'
      }
    },
    inventory_item_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'inventory_items',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    shipped_at: {
      type: DataTypes.DATE
    },
    delivered_at: {
      type: DataTypes.DATE
    },
    returned_at: {
      type: DataTypes.DATE
    },
    sale_price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true
    }
  }, {
    tableName: 'order_items',
    timestamps: false
  });

  return OrderItem;
};