import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ContactMain from './components/view/ContactMain';
import MapMain from './components/view/MapMain';

function App() {

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<ContactMain />} />
          <Route path="/map" element={<MapMain />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
