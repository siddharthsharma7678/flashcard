import "./App.css";
import "./index.css";

import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Createflashcard from "./components/Createflashcard";
import Myflashcard from "./components/Myflashcard";
import Flashcarddetails from "./components/Flashcarddetails";
import Model from "./components/Model";
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
