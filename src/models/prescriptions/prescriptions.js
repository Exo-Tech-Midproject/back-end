'use strict'

function handlePrescriptions(sequelize, DataTypes) {
    let prescriptions = sequelize.define('Prescription', {
        dateOfIssue: {
            type: DataTypes.DATEONLY,
            allowNull:false
        },
        patientName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        diagnosis: {
            type: DataTypes.STRING,
            allowNull:false
        },
        medicines: {
            type: DataTypes.JSON,
            defaultValue: '[]', 
            get() {
              const stringifiedArray = this.getDataValue('medicines');
              return JSON.parse(stringifiedArray);
            },
            set(array) {
              this.setDataValue('medicines', JSON.stringify(array));
            }},
        physicianName: {
            type: DataTypes.STRING,
            allowNull:false
        },
        signature :{
            type:DataTypes.STRING(24),
        },
        username:{
            type:DataTypes.STRING(24),
            allowNull:false,
        }
        
    })
    

    
    return prescriptions
}
module.exports = handlePrescriptions;