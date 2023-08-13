'use strict';

function handleRatingSchema(sequelize, DataTypes) {
    let rating = sequelize.define('rating', {
        rating: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        physician: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patient: {
            type: DataTypes.STRING,
            allowNull: false
        },
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false
        }

    })
    return rating;
}

module.exports = handleRatingSchema;