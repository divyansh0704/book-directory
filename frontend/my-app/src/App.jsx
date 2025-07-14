import React from "react"
import { useState, useEffect } from "react"
import "./App.css"

import axios from "axios"
import "./App.css"

function App() {
  const [allBooks,setAllBooks]  = useState([])
  const [books, setBooks] = useState([])
  const [form, setForm] = useState({ title: "", author: "" })
  const [filter, setFilter] = useState("")
  // ${authorFilter?`?author=${authorFilter}` : ""}`
  // authorFilter=""


  const fetchBooks = async () => {
     const url ="https://book-directory-k827.onrender.com/api/books"
    //  authorFilter
      // ? `http://localhost:5000/api/books?author=${authorFilter}`
      // : `http://localhost:5000/api/books`;

    const res = await axios.get(url);
    setAllBooks(res.data.books);
    setBooks(res.data.books);
  }
  const filterBooks = (keyword) =>{
    setFilter(keyword);
    const filtered = allBooks.filter((book)=>
    book.author.toLowerCase().includes(keyword.toLowerCase())
  );
  setBooks(filtered);
  }
  const addBook = async () => {
    if (!form.title || !form.author) return;
    await axios.post("https://book-directory-k827.onrender.com/api/books", form)
    setForm({ title: "", author: "" })
    fetchBooks(filter);
  }
  const deleteBook = async (id) => {
    await axios.delete(`https://book-directory-k827.onrender.com/api/books/${id}`)
    fetchBooks(filter);
  }

  useEffect(() => {
    fetchBooks();
  }, [])

  // const handleFilter = (e) => {
  //   setFilter(e.target.value)
  //   fetchBooks(e.target.value)
  // }
  return (
    <div className="container">
      <h1>Book Directory</h1>

      

      <div>
        <input type="text" placeholder="title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
        <input type="text" placeholder="author" value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })} />
        <button onClick={addBook}>add book</button>
      </div>
      <div className="filter">
        <input type="text" placeholder="search by author" value={filter} onChange={(e) => {
            // setFilter(e.target.value);
            // fetchBooks(e.target.value);
            filterBooks(e.target.value);
          }} /> 

      </div>
      <ul>
        {books.length>0?( books.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> by {book.author}
            <button onClick={() => deleteBook(book.id)}>del</button>
          </li>

        ))
        ):(
          <li>No books found.</li>
        )}

      </ul>
    </div>
  )
}

export default App
