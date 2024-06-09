import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Vendas from './pages/Vendas'
import Vendedor from './pages/Vendedor'
import VendasList from './pages/lists/VendasList'
import VendedorList from './pages/lists/VendedorList'
import AltVendedor from './pages/alt/AltVendedor'
import AltVenda from './pages/alt/AltVenda'



function App(props) {
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
          <Route path='/altvendedor/:id' element={<AltVendedor />}/>
          <Route path='/altvenda/:id' element={<AltVenda />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
