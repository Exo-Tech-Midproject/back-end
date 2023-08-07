'use strict'

function diseaseControl(sequelize, DataTypes) {
    let diseases = sequelize.define('Disease', {
        historyPI: {
            type: DataTypes.TEXT,
            defaultValue: 'History Medically Free'
        },
        presentILL: {
            type: DataTypes.TEXT,
            defaultValue: 'Medically Free'
        },
        allergies: {
            type: DataTypes.TEXT,
            defaultValue: 'No Allergies'
        },
        familyHistory: {
            type: DataTypes.TEXT,
            defaultValue: 'No Family History'
        },
        socialHistory: {
            type: DataTypes.TEXT,
            defaultValue: 'No Social History'
        },
        patientUN:{
            type:DataTypes.STRING(24),
            allowNull:false,
            unique:true
        },
        physicianUN:{
            type:DataTypes.STRING(24),
            allowNull:false,
        }
        
    })
    

    
    return diseases
}
module.exports = diseaseControl;