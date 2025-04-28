// General
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom'
import './App.css'

// Pages & Tools
import Home from './Home'
import CodeMinifier from './tools/CodeMinifier'
import PasswordGenerator from './tools/PasswordGenerator'
import ColorPicker from './tools/ColorPicker'
import IconGenerator from './tools/IconGenerator'
import NotFound from './NotFound'

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation(); // Get the current route

  return (
    <>
      {/* <video className='videobg' src='./toolkit/background_1.mp4' autoPlay muted /> */}
      {location.pathname !== '/toolkit' && ( // Conditionally render the nav
        <nav>
          <a href='https://xbdrcx.github.io' target='_blank' className='bc'>BC</a>
          <Link to="/toolkit" style={{ color: "white" }}><h1>Hello, Toolkit.</h1></Link>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/toolkit/minifier">Code Minifier</Link>
            <Link to="/toolkit/color">Color Picker</Link>
            <Link to="/toolkit/password">Password Generator</Link>
            <Link to="/toolkit/icon">Icon Generator</Link>
          </div>
        </nav>
      )}
      <Routes>
        <Route path="/toolkit" element={<Home />} />
        <Route path="/toolkit/minifier" element={<CodeMinifier />} />
        <Route path="/toolkit/color" element={<ColorPicker />} />
        <Route path="/toolkit/password" element={<PasswordGenerator />} />
        <Route path="/toolkit/icon" element={<IconGenerator />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
