'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserGroup extends Model {}
  UserGroup.init(
    {
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
