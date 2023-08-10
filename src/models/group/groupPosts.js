'use strict';

function handleGroupPosts(sequelize, DataTypes) {
    let groupPosts = sequelize.define('GroupPosts', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        groupId:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        textContent: {
            type: DataTypes.TEXT,
            allowNull: false,
        }
    })
    return groupPosts;
}

module.exports = handleGroupPosts;