'use strict';

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const SECRET = process.env.SECRET || '123';
const models = require('../../models')

function handlePatientSchema(sequelize, DataTypes) {

  let patient = sequelize.define('Patient', {
    username: {
      type: DataTypes.STRING(24),
      allowNull: false,
      unique: true,
      primaryKey: true
    },
    token: {
      type: DataTypes.VIRTUAL,
      get() {
        return jwt.sign({ username: this.username, accountType: this.accountType }, SECRET);
      },
      set(tokenObj) {
        let token = jwt.sign(tokenObj, SECRET);
        return token;
      }
    },
    fullName: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    insurance: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: 'No Insurance'
    },
    gender: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['male', 'female']]
      }
    },
    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    race: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['hispanic', 'non-hispanic', 'asian', 'african-american', 'american-indian', 'white', 'native-hawaiian']]
      }
    },
    maritalStatus: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isIn: [['single', 'married']]
      }
    },
    mobileNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    accountType: {
      type: DataTypes.STRING,
      defaultValue: 'patient'
    },
    emailAddress: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    resetToken: {
      type: DataTypes.STRING,
      defaultValue: ''
    }
    // groupId:{
    //   type: DataTypes.INTEGER,
    //     allowNull: false
    // }
  });

  patient.beforeCreate(async (user) => {
    let hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;
  });

  patient.authenticateBasic = async function (username, password) {

    const user = await this.findOne({ where: { username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      return user;
    }
    throw new Error('Invalid User');
  };

  patient.authenticateToken = async function (token) {
    try {
      const parsedToken = jwt.verify(token, SECRET);
      const user = await this.findOne({ where: { username: parsedToken.username } });
      if (user) {
        return user;
      }
      throw new Error('User Not Found');
    } catch (e) {
      throw new Error(e.message);
    }
  };

  return patient;

}

module.exports = handlePatientSchema;