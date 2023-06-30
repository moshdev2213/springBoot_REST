import "./components/EmpList";
import "./App.css";
import EmpList from "./components/EmpList";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AddEmployee from "./components/AddEmployee";

function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route exact path="/" Component={EmpList}></Route>
          <Route path="/employees" Component={EmpList}></Route>
          <Route path="/add-emp" Component={AddEmployee}></Route>
          <Route path="/edit-emp/:id" Component={AddEmployee}></Route>
        </Routes>
        <Footer />
      </Router>
    </>
  );
}

export default App;
