// models/Appointment.js
'use strict';


function handleAppointmentSchema(sequelize, DataTypes) {
    const appointment = sequelize.define('appointment', {
        date: {
            type: DataTypes.DATE,
            allowNull: false,
            validate: {
                isNotInPast(value) {
                    if (value < new Date()) {
                        throw new Error('Appointment date cannot be in the past');
                    }
                }
            }
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
