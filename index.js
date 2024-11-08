const express = require("express");
const cors = require("cors");
const app = express();
let { sequelize } = require("./lib/index");
let { author } = require("./models/author.model");
let { book } = require("./models/book.model");
let { bookAuthor } = require("./models/bookAuthor.model");

app.use(express.json());
app.use(cors());

let bookData = [
    {
      title: "Harry Potter and the Philosopher's Stone",
      genre: 'Fantasy',
      publicationYear: 1997,
    },

    { title: 'A Game of Thrones', genre: 'Fantasy', publicationYear: 1996 },
    { title: 'The Hobbit', genre: 'Fantasy', publicationYear: 1937 },
  ];

let authorData = // authors
[
	{ name: 'J.K Rowling', birthYear: 1965 }
];

// Defining route to seed the database
app.get("/seed_db", async (req, res) => {
   try{
    await sequelize.sync({ force: true });

    await book.bulkCreate(bookData);
    await author.bulkCreate(authorData);

    return res.status(200).json({ message: "Database seeding successful." });

   } catch(error){
    res.status(500).json({ message: "Error seeding the database", error: error.message });
   }
});

// function to fetch all books
async function fetchAllBooks(){
    let books = await book.findAll();
    return { books };
}

// Endpoint to fetch all books
app.get("/books", async (req, res) => {
  try{
    let response = await fetchAllBooks();

    if(response.books.length === 0){
        return res.status(404).json({ message: "No books found." });
    }
    
    return res.status(200).json(response);
  } catch(error){
    res.status(500).json({ message: "Error fetching the books.", error: error.message });
  }
});

// function to fetch all authors
async function fetchAllAuthors(){
    let authors = await author.findAll();
    return { authors };
}

// Endpoint to fetch all Authors
app.get("/authors", async (req, res) => {
  try{
    let response = await fetchAllAuthors();

    if(response.authors.length === 0){
        return res.status(404).json({ message: "No Authors found." });
    }
    
    return res.status(200).json(response);
  } catch(error){
    res.status(500).json({ message: "Error fetching the authors", error: error.message });
  }
});

// Function to create a new author
async function addNewAuthor(newAuthor){
    let newData = await author.create(newAuthor);

    return { newData };
}

// Endpoint to create new author
app.post("/authors/new", async (req, res) => {
  try{ 
   let newAuthor = req.body.newAuthor;
   let response = await addNewAuthor(newAuthor);

   return res.status(200).json(response);
  } catch(error){
    res.status(500).json({ message: "Error creating new author", error: error.message });
  }
});

// function to update author by Id
async function updateAuthorById(newData, id){
 let authorDetails = await author.findOne({ where: { id } });

 if(!authorDetails){
    return {};
 }

 authorDetails.set(newData);
 let updatedAuthor = await authorDetails.save();

 return { message: "Author updated sucsessfully.", updatedAuthor};
}

// Endpoint to update Author by Id
app.post("/authors/update/:id", async (req, res) => {
  try{
    let newAuthorData = req.body;
    let id = parseInt(req.params.id);
    let response = await updateAuthorById(newAuthorData, id);

    return res.status(200).json(response);
  } catch(error){
    return res.status(500).json({ message: "Error updating the author", error: error.message });
  }
});

app.listen(3000, () => {
    console.log("Server is running on Port : 3000");
});