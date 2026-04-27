import React from 'react'
import IndexPages from './pages/IndexPages'
import MeshGradientBackground from './components/MeshGradientBackground' // Import di sini

function App() {
  return (
    // Bungkus dengan div relative biar z-index background-nya bekerja dengan bener
    <div className="relative min-h-screen">
      <MeshGradientBackground />
      <IndexPages/>
    </div>
  )
}

export default App