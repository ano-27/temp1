const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const DistributionCenter = sequelize.define('DistributionCenter', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true
    },
    latitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    },
    longitude: {
      type: DataTypes.DECIMAL(10, 7),
      allowNull: true
    }
  }, {
    tableName: 'distribution_centers',
    timestamps: false
  });

  return DistributionCenter;
};