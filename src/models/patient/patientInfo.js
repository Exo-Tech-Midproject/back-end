'use strict'

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || '123';

function handlePatientSchema(sequelize, DataTypes) {
    let patient = sequelize.define('Patient', {
        username: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true
        },
        token: {
            type: DataTypes.VIRTUAL,
            get() {
                return jwt.sign({ username: this.username }, SECRET);
            },
            set(tokenObj) {
                let token = jwt.sign(tokenObj, SECRET);
                return token;
            }
        },
        fullName: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        password: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        insurance: {
            type: DataTypes.STRING,
            allowNULL: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        birthdate: {
            type: DataTypes.DATEONLY,
            allowNULL: false
        },
        race: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        maritalStatus: {
            type: DataTypes.STRING,
            allowNULL: false
        },
        mobileNumber: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true
        },
        accountType: {
            type: DataTypes.STRING,
            defaultValue: "patient"
        },
        emailAddress: {
            type: DataTypes.STRING,
            allowNULL: false,
            unique: true
        },
    })
    patient.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
    });
    patient.authenticateBasic = async function (username, password) {
        const user = await this.findOne({ where: { username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');
    };
    patient.authenticateToken = async function (token) {
        console.log('user')
        try {
            const parsedToken = jwt.verify(token, SECRET);
            console.log(parsedToken)
            const user = await this.findOne({ where: { username: parsedToken.username } });
            if (user) { return user; }
            throw new Error("User Not Found");
        } catch (e) {
            throw new Error(e.message)
        }
    };
    return patient
}
module.exports = handlePatientSchema;