import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import Navbar from './Components/Navbar';


function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
          </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
