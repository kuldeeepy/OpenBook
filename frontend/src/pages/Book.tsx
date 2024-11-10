import { useState, useEffect } from 'react';
import { fetchBookByIsbn } from '../services/bookService.ts';

type BookData = {
    authors: { name: string }[];
    cover: { large: string };
    excerpts: string[];
    publish_date: string;
    publishers: { name: string }[];
    title: string;
};

const BookPage = () => {
  const [bookData, setBookData] = useState<BookData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const param = new URLSearchParams(window.location.search);
  const bookId = param.get('book_id');
  const coverId = param.get('cover_id');

  useEffect(() => {
    if (bookId && coverId) {

      const fetchBook = async () => {
        try {
          const data = await fetchBookByIsbn(bookId, coverId);
        //   console.log(data);
          if (data) {
            setBookData(data); // Store the raw book data
          } else {
            setError('No book data found');
          }
        } catch (err) {
          setError('Error fetching book details');
        } finally {
          setIsLoading(false);
        }
      };

      fetchBook();
    } else {
      setError('Book information is missing');
      setIsLoading(false);
    }
  }, [bookId, coverId]);

  if (isLoading) {
    return <p>Loading book details...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!bookData) {
    return <p>Book data is not available.</p>;
  }

  return (
    <div className="book">
      <h2>{bookData.title}</h2>
      <p>by {bookData.authors}</p>
      <p>Published: {bookData.publish_date}</p>
      <p>Publishers: {bookData.publishers}</p>
      <img src={bookData.cover} alt={bookData.title} loading="lazy" />
      <button onClick={() => window.open(bookData.bookUrl, '_blank')}>Read Now</button>
    </div>
  );
};

export default BookPage;
