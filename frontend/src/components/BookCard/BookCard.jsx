import React, { useEffect, useState } from "react";
import { fetchBookByIsbn } from "../../services/service";
import "./bookCard.css";

function BookCard() {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = new URLSearchParams(window.location.search);
  const bookId = param.get("book_id");
  const coverId = param.get("cover_id");

  useEffect(() => {
    if (bookId && coverId) {
      const fetchBook = async () => {
        try {
          const data = await fetchBookByIsbn(bookId, coverId);
          // setIsLoading(true);

          if (data) {
            setBook(data);
          } else {
            setError("Book not found!");
          }
        } catch (error) {
          console.error(error);
        }
      };
      fetchBook();
    }
  }, [bookId, coverId]);

  if (!book) return <p>Book data is not available.</p>;
  if (isLoading) return <p>Loading book details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <div className="book-card">
        <div className="book-image">
          <img src={book.cover} alt={book.title} />
        </div>
        <div className="book-info">
          <span className="publisher">{book.publishers}</span>
          <h1 className="title">{book.title}</h1>
          <h2 className="author">by {book.authors}</h2>
          <p className="year">Published in {book.publish_date}</p>
          <div className="buttons">
            <button className="read-btn">Read Now</button>
            <button className="download-btn">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
