import React from "react";
import "./footer.css";

function Footer() {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} OpenBook. All rights reserved.</p>
    </footer>
  );
}

export default Footer;
