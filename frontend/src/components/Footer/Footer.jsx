import React from "react";

function Footer() {
  return (
    <footer className="text-center py-4 bg-[#222725] text-white fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} OpenBook. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
