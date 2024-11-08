// Import DataTypes and sequelize instance from the ../lib/ directory
let { DataTypes, sequelize } = require("../lib/");

// Import the author and book models, which will be referenced in the bookAuthor model
let { author } = require("./author.model");
let { book } = require("./book.model");

// Define the bookAuthor model to represent the relationship between authors and books
let bookAuthor = sequelize.define("bookAuthor", {
  
  // Define the authorId field, which references the author model's id
  authorId: {
    type: DataTypes.INTEGER, // The authorId is an integer data type
    references: {
        model: author, // Referencing the author model
        key: "id" // Foreign key is the id field in the author model
    },
  },

  // Define the bookId field, which references the book model's id
  bookId: {
    type: DataTypes.INTEGER, // The bookId is an integer data type
    references: {
        model: book, // Referencing the book model
        key: "id" // Foreign key is the id field in the book model
    },
  },
});

// Set up a many-to-many relationship between authors and books through the bookAuthor model
author.belongsToMany(book, { through: bookAuthor }); // Each author can write many books
book.belongsToMany(author, { through: bookAuthor }); // Each book can have many authors

// Export the bookAuthor model so it can be used in other parts of the application
module.exports = { bookAuthor };
