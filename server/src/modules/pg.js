const { Sequelize, DataTypes } = require('sequelize')
const Reletions = require('../models/Reletions')
const UsersModel = require('../models/UsersModel')
const UserSessionsModel = require('../models/UserSessionsModel')
const { createNewHash } = require('./bcrypt')
require('dotenv').config()

const { DB_NAME, DB_PASSWORD } = process.env

if(!DB_NAME || !DB_PASSWORD){
    throw new Error('Pg username or password not given')
}


const sequelize = new Sequelize(DB_NAME, DB_PASSWORD, DB_PASSWORD, {
    logging: false,
    dialect: 'postgres'
})

module.exports = async() => {
    try {
      await sequelize.authenticate();
  
      // create database object
      let db = {}
      db.users = await UsersModel(sequelize, DataTypes)
      db.users_session = await UserSessionsModel(sequelize, DataTypes)

      await db.users.sync()
      await db.users_session.sync()
  
      // Declare relations between tables
    //   await Relations(db)
  
      // Create initial values if doesn't exist
      let initialData = [
        { user_login: "john", user_password: "123", user_name: "John Snow" },
        { user_login: "pink", user_password: "qwerty", user_name: "Pink Floyd" },
        { user_login: "tom", user_password: "admin", user_name: "Tom Cruise" },
      ]
  
      for(let data of initialData) {
        await db.users.findOrCreate({
          where: {
            user_login: data.user_login
          },
          defaults: {
            user_login: data.user_login,
            user_password: await createNewHash(data.user_password),
            user_name: data.user_name
          }
        })
      }
  
      // connect
      await sequelize.sync({ force: false })
  
      return db;
    } catch (e) {
      console.log("SQL_ERROR:", e)
    }
  }

