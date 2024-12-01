import { BrowserRouter as Router, Routes, Route } from 'react-router'
import HomeView from './views/HomeView'
import CreateFormView from './views/CreateFormView'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<CreateFormView />} />
        <Route path='/home' element={<HomeView />} />
      </Routes>
    </Router>
  )
}

export default App
