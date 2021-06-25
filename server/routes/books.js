/*Midterm - Ugur Pekunsal - 301158229 - 6/25/2021*/

// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// define the book model
let book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });

});

//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     res.render("books/details", {
      title: "Add",
      page: "details",
      books: "",
    });

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let newBook = new book({
      Title: req.body.title,
      Price: req.body.price,
      Author: req.body.author,
      Genre: req.body.genre,
    });
  
    book.create(newBook, (err) => {
      if (err) {
        console.error(err);
        res.end(err);
      }
  
      res.redirect("/books");
    });

});

// GET the Book Details page in order to edit an existing Book
router.get('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     book.findById(id, {}, {}, (err, bookItemToEdit) => {
      if (err) {
        console.error(err);
        res.end(err);
      }
  
      // show the edit view
      res.render("books/details", {
        title: "Edit",
        page: "details",
        books: bookItemToEdit,
      });
    });

});

// POST - process the information passed from the details form and update the document
router.post('/edit/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     // instantiate a new book Item
     let updatedBookItem = new book({
       _id: id,
       Title: req.body.title,
       Price: req.body.price,
       Author: req.body.author,
       Genre: req.body.genre,
     });
   
     // find the book item via db.books.update({"_id":id}) and then update
     book.updateOne({ _id: id }, updatedBookItem, {}, (err) => {
       if (err) {
         console.error(err);
         res.end(err);
       }
   
       res.redirect("/books");
     });

});

// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {

    /*****************
     * ADD CODE HERE *
     *****************/
     let id = req.params.id;

     // db.book.remove({"_id: id"})
     book.remove({ _id: id }, (err) => {
       if (err) {
         console.error(err);
         res.end(err);
       }
   
       res.redirect("/books");
     });
});


module.exports = router;
