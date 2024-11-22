import React, { useEffect, useState } from "react";
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
    navigate(`/book?bookId=${info.id}&bookCover=${info.img}`);
  };

  const renderBooks = () => {
    if (!books.length) {
      return <p>No books available for {name} category.</p>;
    }

    return books.map((buk) => {
      const image = `${imageUrl}/${buk.cover_id}-M.jpg`;
      return (
        <div key={buk.key} className="cursor-pointer flex-shrink-0">
          <img
            src={buk.cover_id ? image : fallBack}
            alt={buk.title}
            loading="lazy"
            className="object-cover border border-[#23222278] rounded-md h-[190px] w-[130px] md:h-[255px] md:w-[170px]"
          />
          <button
            onClick={() =>
              readBook({
                id: buk.availability?.isbn ?? buk.key,
                img: buk.cover_id,
              })
            }
            className="w-full py-2 mt-2 text-[#f7f7f2] text-sm bg-[#222725] rounded-lg border border-[#3c3c3c78] hover:bg-[#f7f7f22f] hover:text-[#222725] transition-colors duration-300"
          >
            Read
          </button>
        </div>
      );
    });
  };

  return (
    <div key={name} className="bg-[#dadad9] m-4 p-4 rounded-md">
      <h1 className="mt-2 pl-2 text-xl font-medium">
        {name.charAt(0).toUpperCase() + name.slice(1)}
      </h1>
      <div className="flex overflow-x-scroll gap-8 py-3 w-full hide-scrollbar scroll-smooth">
        {renderBooks(name)}
      </div>
    </div>
  );
}

export default Collection;

/* background-color: #e4e6c3; */
/* background-color: #d7d9ce; */
/* background-color: #e4dfda; */
/* background-color: #d0d6b5; */
