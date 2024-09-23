import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Product from './components/Product';
import Registration from './components/Registration';
import RegistrationSuccess from './components/RegistrationSuccess';
import Login from './components/Login';
import LoginSuccess from './components/LoginSuccess';
import { AuthProvider } from './components/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <ButtonAppBar></ButtonAppBar>
          <Routes>
            <Route path='' element={<Products></Products>} />
            <Route path='/products' element={<Products></Products>} />
            <Route path='/registration' element={<Registration></Registration>} />
            <Route path='/registrationSuccess' element={<RegistrationSuccess></RegistrationSuccess>} />
            <Route path='/login' element={<Login></Login>} />
            <Route path='/loginSuccess' element={<LoginSuccess></LoginSuccess>} />

            <Route path='/product' element={ <ProtectedRoute> <Product></Product> </ProtectedRoute>} />

          </Routes>
        </BrowserRouter>       
      </AuthProvider>

    </div>
  );
}

export default App;
