import { MemoryRouter as Router, Routes, Route, Link } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import NewPage from './NewPage'; // Import the new component
import './App.css';

function Hello() {
  return (
    <div>
      <div className="Hello">
        <img width="250" alt="icon" src={icon} />
      </div>
      <h1>What can I change</h1>
      <div className="Hello">
        {/* Existing anchor tag */}
        <a
          href="https://electron-react-boilerplate.js.org/docs/app-showcase"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button">
            <span role="img" aria-label="books">
              📚
            </span>
            dokumentit
          </button>
        </a>
        {/* New button for internal navigation */}
        <Link to="/new-page">
          <button type="button">Go to New Page</button>
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
        <Route path="/new-page" element={<NewPage />} /> {/* New route */}
      </Routes>
    </Router>
  );
}
