import { useState } from 'react'
import './App.css'
import Currency from './Components/Currency'

function App() {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyItems: 'center', alignItems: 'center' }}>
      <Currency />
    </div>
  )
}

export default App
