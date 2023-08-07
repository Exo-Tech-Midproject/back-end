// models/Appointment.js
'use strict';


function handleAppointmentSchema(sequelize, DataTypes) {
    const appointment = sequelize.define('appointment', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        patientUsername: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        physicianUsername: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    });

    return appointment;
}

module.exports = handleAppointmentSchema;
