'use strict'

const {Sequelize} = require('sequelize')
const DBURL = process.env.DBURL || 'sqlite::memory:';


const sequelize = new Sequelize(DBURL)



module.exports = {
    db: sequelize
}