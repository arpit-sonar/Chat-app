import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render( // we making the index html file as the main container 
  <BrowserRouter>
  <App />  
  </BrowserRouter>
)