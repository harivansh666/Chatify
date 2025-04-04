import { useState } from 'react'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='w-full h-screen bg-zinc-800 text-white'>
        <h1 className='bg-red-800 h-20'>this is client side</h1>
      </div>
    </>
  )
}

export default App
