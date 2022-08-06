'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {}
  UserGroup.init(
    {
      id: DataTypes.UUID,
      userId: DataTypes.UUID,
      groupId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: 'UserGroup',
    },
  );
  return UserGroup;
};
