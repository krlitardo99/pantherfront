import { useState } from 'react'
import {Button} from 'react-bootstrap'
import './App.css'
import AppRoutes from './routes/AppRoutes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <AppRoutes/>
    </>
  )
}

export default App
