import './App.css'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Calcolatore from './components/Calcolatore';
import EntryPage from './components/EntryPage';
import VediRicette from './components/VediRicette';

function App() {
  return(
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<EntryPage />} />
            <Route path="/calcola-food-cost" element={<Calcolatore />} />
            <Route path="/vedi-ricette" element={<VediRicette />} />
          </Routes>
        </div>
      </Router> 
    )
  
}

export default App;
