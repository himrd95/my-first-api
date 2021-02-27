const dataBase = require('./db.json');
let books = dataBase.books
const express = require("express");
const app = express();

app.use(logger, express.json())


app.get("/books", (req, res) => {
    
    res.send({"API requested by" : req.name, "books": books})
})
app.get("/books/:id", (req, res) => {
    const id = +req.params.id;
    const specificBook = books.find(book=>book.id === id)
    res.send({"API requested by" : req.name, "book": specificBook})
})
app.post("/books", (req, res) => {
    books.push(req.body)
    res.status(201).json(req.body)
})
app.put("/books/:id", (req, res) => {
    const id = +req.params.id;
    const userBody = req.body
    const updated = books.map(book => book.id === id ? userBody : book)
    books = updated
    res.send(books)
})
app.patch("/books/:id", (req, res) => {
    const id = +req.params.id;
    const userBody = req.body
    const updated = books.map(book =>
        book.id === id ? { ...book, ...userBody } : book)
    books = updated
    res.status(200).json(updated)
})
app.delete("/books/:id", (req, res) => {
    const id = +req.params.id;
    const updated = books.filter(book => book.id !== id )
    books = updated
    res.send(books)
})

function logger(req, res, next) {
    req.name = "Himanshu Dwivedi"
    next();
}

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`Listening on port ${port}`)
);