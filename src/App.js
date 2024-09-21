import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';
import Login from './components/Login';
import LoginSuccess from './components/LoginSuccess';


function App() {
  return (
    <div className="App">
     <ButtonAppBar></ButtonAppBar>
     <BrowserRouter>
      <Routes>
        <Route path='' element={<Products></Products>} />
        <Route path='/products' element={<Products></Products>} />
        <Route path='/product' element={<Product></Product>} />
        <Route path='/registration' element={<Registration></Registration>} />
        <Route path='/registrationSuccess' element={<RegistrationSuccess></RegistrationSuccess>} />
        <Route path='/login' element={<Login></Login>} />
        <Route path='/loginSuccess' element={<LoginSuccess></LoginSuccess>} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
