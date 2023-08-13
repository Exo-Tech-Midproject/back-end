'use strict'

function messagesHandler(sequelize, DataTypes) {
    let messages = sequelize.define('Messages', {
        message: {
            type: DataTypes.STRING,
            required: true
        },
        sender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        reciever: {
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    

    
    return messages
}
module.exports = messagesHandler;