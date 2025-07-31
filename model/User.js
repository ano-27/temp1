const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    age: {
      type: DataTypes.INTEGER
    },
    gender: {
      type: DataTypes.CHAR(1)
    },
    state: {
      type: DataTypes.STRING
    },
    street_address: {
      type: DataTypes.STRING
    },
    postal_code: {
      type: DataTypes.STRING
    },
    city: {
      type: DataTypes.STRING
    },
    country: {
      type: DataTypes.STRING
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7)
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7)
    },
    traffic_source: {
      type: DataTypes.STRING
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    tableName: 'users',
    timestamps: false
  });

  return User;
};