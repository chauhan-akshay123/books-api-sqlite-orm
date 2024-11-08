let { DataTypes, sequelize } = require("../lib/");

let book = sequelize.define("book", {
 title: {
    type: DataTypes.STRING,
    allowNull: false,
 },
 genre: {
    type: DataTypes.STRING,
 },
 publicationYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
 },
});

module.exports = { book };
