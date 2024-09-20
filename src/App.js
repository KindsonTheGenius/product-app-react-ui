import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';


function App() {
  return (
    <div className="App">
     <ButtonAppBar></ButtonAppBar>
     <BrowserRouter>
      <Routes>
        <Route path='' element={<Products></Products>} />
        <Route path='/products' element={<Products></Products>} />
        <Route path='/product' element={<Product></Product>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
