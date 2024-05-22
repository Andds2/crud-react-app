import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Vendas from './pages/Vendas';
import Vendedor from './pages/Vendedor';
import VendasList from './pages/list/VendasList';
import VendedorList from './pages/list/VendedorList';



function App() {
  return (
    <div className="app-container">
      <Router>
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/vendedor' element={<Vendedor />} />
          <Route path='/vendas' element={<Vendas />} />
          <Route path='/listavendas' element={<VendasList />} />
          <Route path='/listavendedores' element={<VendedorList />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
