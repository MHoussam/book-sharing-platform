import React from 'react';
import NavBar from '../../Components/ui/NavBar';
import Books from '../../Components/ui/Books';

const Home = () => {
  return (
    <div>
        <NavBar />
        <Books />
        <h1>Welcome Home</h1>
    </div>
  )
}

export default Home;