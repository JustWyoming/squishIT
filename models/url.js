"use strict";

module.exports = function(sequelize, DataTypes) {
  var URL = sequelize.define("URL", {
    full_url: DataTypes.STRING,
    squish_code: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return URL;
};
