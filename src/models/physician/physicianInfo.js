'use strict'

const bcrypt = require('bcrypt');

function handelPhysicianSchema (sequelize , DataTypes){
    let physician = sequelize.define('Physician',{
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        fullName:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        licenseId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            unique:true
        },
        gender:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        birthday:{
            type:DataTypes.DATEONLY,
            allowNull:false,
        },
        mobileNumber:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        accountType:{
            type:DataTypes.STRING,
            default:'physician'
        },
        emailAddress:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        nationalID:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        department:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        address:{
            type:DataTypes.STRING,
        }
    })

    physician.beforeCreate(async (user) => {
        let hashedPass = await bcrypt.hash(user.password, 10);
        user.password = hashedPass;
    });
    physician.authenticateBasic = async function (username, password) {
        const user = await this.findOne({ where: { username } });
        const valid = await bcrypt.compare(password, user.password);
        if (valid) { return user; }
        throw new Error('Invalid User');
    };
    return physician;
}



module.exports = handelPhysicianSchema;
