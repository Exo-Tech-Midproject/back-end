'use strict'

function notifications(sequelize, DataTypes) {
    let notifications = sequelize.define('Notifications', {
        patientUN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        event: {
            type: DataTypes.STRING,
            allowNull:false    
        }

    })
    

    
    return notifications
}
module.exports = notifications;