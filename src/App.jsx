import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calcolatore from './components/Calcolatore';
import EntryPage from './components/EntryPage';

function App() {
  return(
      <Router>
        <div class="App">
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/calcola-food-cost" element={<Calcolatore />} />
          </Routes>
        </div>
      </Router> 
    )
  
}

export default App;
