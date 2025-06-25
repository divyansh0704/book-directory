const sequelize = require("../config/db")
const { DataTypes } = require("sequelize")

const Book = sequelize.define("Book",{
    title:{
        type : DataTypes.STRING,
        allowNull: false,

    },
    author:{
        type:DataTypes.STRING,
        allowNull:false,
    },
})

module.exports = Book;