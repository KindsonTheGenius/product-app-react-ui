import logo from './logo.svg';
import './App.css';
import ButtonAppBar from './components/Appbar';
import Products from './components/Products';


function App() {
  return (
    <div className="App">
     <ButtonAppBar></ButtonAppBar>
     <Products></Products>
    </div>
  );
}

export default App;
