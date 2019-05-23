import React, { useState, useEffect } from 'react';

function App() {
  const [count, setcount] = useState(0);
  
  useEffect(() => {
    console.log('useEffect');
  })

  function add() {
    setcount(count + 1)
  }

  function minus() {
    if(count > 0) setcount(count - 1)
  }

  return (
    <div>
      <h1>Hooks</h1>
      <p>{count}</p>
      <button type="button" onClick={minus}>-</button>
      <button type="button" onClick={add}>+</button>
    </div>
  )
}

export default App;
