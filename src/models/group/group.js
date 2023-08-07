'use strict';

function handleGroupSchema(sequelize, DataTypes) {
    let group = sequelize.define('Group', {
    username:{
        type :DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    physicianId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
    // patientId:{
    //     type: DataTypes.INTEGER,
    //     allowNull: false
    // }
    })
    return group;
}

module.exports = handleGroupSchema;