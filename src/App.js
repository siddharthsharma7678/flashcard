import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// component imports start

import Createflashcard from "./components/pages/Createflashcard";
import Myflashcard from "./components/pages/Myflashcard";
import Flashcarddetails from "./components/pages/Flashcarddetails";
import Model from "./components/Model/Model";

// component imports start
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Createflashcard />}></Route>
          <Route path="/Myflashcard" element={<Myflashcard />}></Route>
          <Route
            path="/Flashcarddetails/:id"
            element={<Flashcarddetails />}
          ></Route>
          <Route path="/Model" element={<Model />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
