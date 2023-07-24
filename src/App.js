import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ChakraProvider } from '@chakra-ui/react';

import { myTheme } from './myTheme';
import './App.css';
import Home from './pages/Home';
import PokemonDetails from './pages/PokemonDetails';

function App() {
  return (
    <ChakraProvider theme={myTheme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:pokemonid" element={<PokemonDetails />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
