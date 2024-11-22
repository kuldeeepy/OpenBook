import React, { useEffect, useState } from "react";
import { fetchBookByIsbn } from "../../services/service";

function BookCard() {
  const [book, setBook] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const param = new URLSearchParams(window.location.search);
  const bookId = param.get("bookId");
  const coverId = param.get("bookCover");

  useEffect(() => {
    if (bookId && coverId) {
      const fetchBook = async () => {
        try {
          const data = await fetchBookByIsbn(bookId, coverId);

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
    <div className="min-h-screen bg-[#ededf4] flex justify-center items-center p-8">
      <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-3xl flex flex-col md:flex-row">
        <div className="w-full max-h-96 overflow-hidden md:w-2/5">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="p-8 flex-1">
          <span className="text-[#6b46c1] font-semibold text-xs uppercase tracking-wide mb-3">
            {book.publishers}
          </span>
          <h1 className="text-[#1a202c] text-3xl font-bold mb-2 leading-tight">
            {book.title}
          </h1>
          <h2 className="text-[#4a5568] text-xl font-medium mb-4">
            by {book.authors}
          </h2>
          <p className="text-[#718096] mb-8">
            Published in {book.publish_date}
          </p>
          <div className="flex flex-col gap-4 md:flex-row">
            <button className="bg-[#333] text-white py-3 px-6 rounded-lg font-semibold hover:bg-white hover:text-[#333] transition-all duration-200">
              Read Now
            </button>
            <button className="bg-[#edf2f7] text-[#2d3748] py-3 px-6 rounded-lg font-semibold hover:bg-[#e2e8f0] transition-all duration-200">
              Download
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
