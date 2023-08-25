import Home from './Pages/Home';
import Login from './Pages/Login';
import Book from './Pages/Book';
import './styles/App.css';
import Register from './Pages/Register';
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/Book" element={<Book />} />
        <Route path="/Register" element={<Register />} />
        {/* <Route path='*' element={<h1>404</h1>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
