// General
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'

// Tools
import Home from './Home'
import JSONFormatter from './tools/JSONFormatter'
import PasswordGenerator from './tools/PasswordGenerator'
import ColorPicker from './tools/ColorPicker'
import NotFound from './NotFound'

function App() {
  return (
    <>
      <Router>
        <nav>
          <h1>Hello, Toolkit.</h1>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Link to="/">Home</Link>
            <Link to="/json">JSON Formatter</Link>
            <Link to="/color">Color Picker</Link>
            <Link to="/password">Password Generator</Link>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/json" element={<JSONFormatter />} />
          <Route path="/color" element={<ColorPicker />} />
          <Route path="/password" element={<PasswordGenerator />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <footer>
          <a href='https://xbdrcx.github.io' target='_blank' className='bc'>BC</a>
      </footer>
    </>
  )
}

export default App
