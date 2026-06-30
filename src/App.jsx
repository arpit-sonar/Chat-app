import {Routes , Route} from 'react-router-dom'
import Login from './pages/Login'
import Chat from './pages/Chat'

function App() {
  return (
    <Routes>
      {/* if path is '/' (base path) then goto Login page */}
      <Route path = "/" element = {<Login />}  />  
      <Route path = "/chat" element = {<Chat />}  />
    </Routes>
  ) 
}

export default App;