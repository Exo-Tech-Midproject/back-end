'use strict';

function handleGroupSchema(sequelize, DataTypes) {
    let group = sequelize.define('Group', {
    username:{
        type :DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    physicianUN:{
        type: DataTypes.STRING,
        allowNull: false
    },
    patientUN:{
        type: DataTypes.INTEGER,
    }
    })
    return group;
}

module.exports = handleGroupSchema;