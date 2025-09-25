const express = require("express");
const app = express();
const PORT = 5000;

app.use(express.json());

let books = [
  { id: 1, title: "The Alchemist", author: "Paulo Coelho" },
  { id: 2, title: "Think and Grow Rich", author: "Napoleon Hill" },
  { id: 3, title: "Wings of Fire", author: "A.P.J. Abdul Kalam" },
  { id: 4, title: "The Monk Who Sold His Ferrari", author: "Robin Sharma" },
  { id: 5, title: "Bhagavad Gita", author: "Ved Vyasa" },
  { id: 6, title: "You Can Win", author: "Shiv Khera" },
  { id: 7, title: "India After Gandhi", author: "Ramachandra Guha" },
  { id: 8, title: "Ikigai", author: "Héctor García and Francesc Miralles" },
  { id: 9, title: "Train to Pakistan", author: "Khushwant Singh" },
  { id: 10, title: "Rich Dad Poor Dad", author: "Robert T. Kiyosaki" }
];


app.get("/", (req, res) => {
  res.send("📚 Welcome to the Books API! Try /books");
});

app.get("/books", (req, res) => {
  res.json(books);
});

app.get("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

app.post("/books", (req, res) => {
  const { title, author } = req.body;
  if (!title || !author) {
    return res.status(400).json({ message: "Title and author are required" });
  }
  const newBook = {
    id: books.length ? books[books.length - 1].id + 1 : 1,
    title,
    author
  };
  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });

  const { title, author } = req.body;
  if (title) book.title = title;
  if (author) book.author = author;

  res.json(book);
});

app.delete("/books/:id", (req, res) => {
  const index = books.findIndex(b => b.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(index, 1);
  res.json(deletedBook);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
