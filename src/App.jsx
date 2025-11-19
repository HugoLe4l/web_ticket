import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './App.css'
import HomePage from './pages/home/home'

import { DadosProvider } from './hook/useDados'

function App() {

  return (
    <DadosProvider>

      <Router>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path="*" element={<h1>Página não encontrada</h1>} />
        </Routes>
      </Router>

    </DadosProvider>
  )
}

export default App
