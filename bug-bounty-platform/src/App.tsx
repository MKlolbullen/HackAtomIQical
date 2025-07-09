import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navigation from './components/Navigation'
import HomePage from './pages/HomePage'
import BuilderPage from './pages/BuilderPage'
import ScannerPage from './pages/ScannerPage'
import ResultsPage from './pages/ResultsPage'
import ConfigurationPage from './pages/ConfigurationPage'
import WorkflowLibraryPage from './pages/WorkflowLibraryPage'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground dark">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/builder" element={<BuilderPage />} />
            <Route path="/builder/library" element={<WorkflowLibraryPage />} />
            <Route path="/scanner" element={<ScannerPage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/configuration" element={<ConfigurationPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
