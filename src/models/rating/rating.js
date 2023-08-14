'use strict';

function handleRatingSchema(sequelize, DataTypes) {
    let Rating = sequelize.define('rating', {
        rating: {
            type: DataTypes.FLOAT,  // Change data type to INTEGER for rating
            allowNull: false,
            validate: {
                min: 1,
                max: 5
            }
        },
        physician: {
            type: DataTypes.STRING,
            allowNull: false
        },
        patient: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
    Rating.calculateAverageRating = async function (physicianId) {
        const result = await Rating.findOne({
            attributes: [[sequelize.fn('avg', sequelize.col('rating')), 'averageRating']],
            where: {
                physician: physicianId
            }
        });

        return result.dataValues.averageRating;
    };


    return Rating;
}

module.exports = handleRatingSchema;
