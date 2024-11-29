import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import "./App.css"
import Home from "./page/Home/Home";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/LikeDislike" element={<Home />} />
      </Routes>
    </Router>
  )
}

export default App
