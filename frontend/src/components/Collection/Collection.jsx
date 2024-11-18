import React, { useEffect, useState } from "react";
import "./collection.css";
import { useNavigate } from "react-router-dom";
import { getBookByCategory } from "../../services/service";

const imageUrl = import.meta.env.VITE_IMAGE_URL;
const fallBack = import.meta.env.VITE_FALLBACK_URL;

function Collection({ name }) {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const bookData = await getBookByCategory(name);
        setBooks(bookData || []);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBooks();
  }, [name]);

  const readBook = (info) => {
    navigate(`/book?book_id=${info.id}&cover_id=${info.img}`);
  };

  const renderBooks = () => {
    if (!books.length) {
      return <p>No books available for {name} category.</p>;
    }

    return books.map((buk) => {
      const image = `${imageUrl}/${buk.cover_id}-M.jpg`;
      return (
        <div key={buk.key}>
          <img
            src={buk.cover_id ? image : fallBack}
            alt={buk.title}
            loading="lazy"
          />
          <button
            onClick={() =>
              readBook({
                id: buk.availability?.isbn ?? buk.key,
                img: buk.cover_id,
              })
            }
          >
            Read
          </button>
        </div>
      );
    });
  };

  return (
    <div key={name} className="category">
      <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
      <div className="collection">{renderBooks(name)}</div>
    </div>
  );
}

export default Collection;
