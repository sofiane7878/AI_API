import React, { useState, useEffect } from 'react';

function Home() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("effect"); 
  }, []);

  return (
    <>
      <h1 className="une-classe">Hello World !</h1>
      <button onClick={() => setCount(count + 1)}>click !</button>
      <p>Count: {count}</p>
    </>
  );
}

export default Home;