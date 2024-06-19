import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert'
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <>
      <NoteState>
        <Router>
            <Navbar/>
            <Alert message="Application is under development"/>

            <div className="container">
                <Routes>
                  <Route exact path="/" element={<Home/>}/>
                </Routes>
              
                <Routes>
                  <Route exact path="/about" element={<About/>}/>
                </Routes>

                <Routes>
                  <Route exact path="/login" element={<Login/>}/>
                </Routes>

                <Routes>
                  <Route exact path="/signup" element={<Signup/>}/>
                </Routes>
            </div>

            

        </Router>
      </NoteState>
    </>
  );
}

export default App;
