import Header from './Header.js'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import IndexPage from '../pages/index.js'
import EditPage from '../pages/edit.js'
import AdminPage from '../pages/admin.js'

library.add(fas)

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/edit" element={<EditPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
