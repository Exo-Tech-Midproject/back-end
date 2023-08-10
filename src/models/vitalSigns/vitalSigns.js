'use strict'

function vitalSigns(sequelize, DataTypes) {
    let vitals = sequelize.define('Vitals', {
        patientUN: {
            type: DataTypes.STRING,
            allowNull: false
        },
        heartRate: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 350
              }
        },
        oxygenSat: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 100
              }

        },
        bloodGlucose: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 1000
              }

        },
        temperature: {
            type: DataTypes.FLOAT(2,1),
            validate: {
                min: 0,
                max: 45
              }

        },
        systolicBP: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 400
              }

        },
        diastolicBP: {
            type: DataTypes.INTEGER,
            validate: {
                min: 0,
                max: 400
              }

        },
        isHigh: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }

    })
    

    
    return vitals
}
module.exports = vitalSigns;