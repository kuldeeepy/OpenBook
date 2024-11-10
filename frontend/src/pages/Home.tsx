import React, { useEffect, useState } from "react";
import { getBookByCategory } from "../services/bookService.ts";
import { useNavigate } from "react-router-dom";
// import Header from "../components/Header/Header.tsx";
import "../styles/home.css";

const categories = [
    "bestsellers", 
    "religious", 
    "romance", 
    "finance", 
    "fantasy", 
    "science-fiction", 
    "kids"
];

type Book = {
    key: string;
    title: string;
    cover_id: string;
    availability: {
      isbn?: string;
    };
  };
  
type BooksByCategory = {
    [key: string]: Book[]; 
};

const imageUrl: string = 'https://covers.openlibrary.org/b/id';
const fallBack: string = 'https://sulkurl.com/b8s';

const Home: React.FC = () => {
    const [booksByCategory, setBooksByCategory] = useState<BooksByCategory>({});
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const booksData:BooksByCategory = {};
                for (const category of categories) {
                    booksData[category] = await getBookByCategory(category);
                }
                setBooksByCategory(booksData)
            } catch (error) {
                console.error("Error fetching books:", error)
            }
        }
        fetchBooks();
    },[])

    const readBook = (info: {id: string; img: string}) => {
        navigate(`/book?book_id=${info.id}&cover_id=${info.img}`);
    }

    const renderBooks = (category: string) => {
        const books = booksByCategory[category];
        return books?.map((buk) => {
          const image = `${imageUrl}/${buk.cover_id}-M.jpg`;

          return (
            <div key={buk.key}>
              <img src={buk.cover_id ? image : fallBack} alt={buk.title} loading="lazy" />
              <button onClick={() => readBook({ id: buk.availability?.isbn ?? buk.key, img: buk.cover_id })}>
                Read
              </button>
            </div>
          );
        });
    };

    return (
        <div className="container">
            {categories.map((category) => (
                <div key={category} className="category">
                    <h1>{category.charAt(0).toUpperCase() + category.slice(1)}</h1>
                    <div className="collection">{renderBooks(category)}</div>
                </div>
            ))}
        </div>
    )
}

export default Home;
