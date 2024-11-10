import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.tsx";
import Home from "./pages/Home.tsx";
import Book from "./pages/Book.tsx";
import "./styles/home.css"

function App() {
  return (
    <Router>
      {/* Header on all pages  */}
      <Header/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/book" element={<Book/>}></Route>
      </Routes>
    </Router>

  )
}

export default App;