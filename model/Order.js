const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gender: {
      type: DataTypes.CHAR(1)
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    returned_at: {
      type: DataTypes.DATE
    },
    shipped_at: {
      type: DataTypes.DATE
    },
    delivered_at: {
      type: DataTypes.DATE
    },
    num_of_item: {
      type: DataTypes.INTEGER
    }
  }, {
    tableName: 'orders',
    timestamps: false
  });

  return Order;
};