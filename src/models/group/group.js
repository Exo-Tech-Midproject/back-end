'use strict';

function handleGroupSchema(sequelize, DataTypes) {
    let group = sequelize.define('Group', {
    groupName:{
        type :DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    physicianUN:{
        type: DataTypes.STRING,
        allowNull: false
    },
    groupImage: {
        type: DataTypes.STRING
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    
    })
    return group;
}

module.exports = handleGroupSchema;