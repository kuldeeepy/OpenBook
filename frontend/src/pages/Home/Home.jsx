import React from "react";
import Collection from "../../components/Collection/Collection.jsx";

const categories = [
  // "bestsellers",
  "new",
  "religious",
  "romance",
  "finance",
  "fantasy",
  "science-fiction",
  "kids",
];

function Home() {
  return (
    <main className="font-sans text-[#121113] max-sm:pt-8 max-sm:pb-20 pb-6 mx-auto sm:w-[98%] md:w-[81%] md:my-12 lg:w-[64%] lg:my-12">
      {categories.map((cat, idx) => (
        <Collection name={cat} key={idx} />
      ))}
    </main>
  );
}

export default Home;
