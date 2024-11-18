import React from "react";
import Collection from "../../components/Collection/Collection.jsx";
import "./home.css";

const categories = [
  "bestsellers",
  "religious",
  "romance",
  "finance",
  "fantasy",
  "science-fiction",
  "kids",
];

function Home() {
  return (
    <main>
      {categories.map((cat, idx) => (
        <Collection name={cat} key={idx} />
      ))}
    </main>
  );
}

export default Home;
