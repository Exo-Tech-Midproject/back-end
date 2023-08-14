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
    Rating.getAverageRating = async function () {
        const result = await this.aggregate('rating', 'AVG', { plain: false });
        return result[0].avg;
      };

    return Rating;
}

module.exports = handleRatingSchema;
