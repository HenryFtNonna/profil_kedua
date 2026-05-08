import React from 'react'
import IndexPages from './pages/IndexPages'
import MeshGradientBackground from './components/MeshGradientBackground'
import CustomCursor from './components/CustomCursor' // Import kursornya

function App() {
  return (
    // Kasih cursor-none kalo lu mau kursor panah putih bawaan windows hilang.
    // Tapi mending biarin aja dulu biar ada efek "Follower" nya.
    <div className="relative min-h-screen">
      <CustomCursor /> 
      {/* <MeshGradientBackground /> */}
      <IndexPages/>
    </div>
  )
}

export default App