import {Link} from 'react-router-dom'
import './css/Navbar.css'
import { PiShoppingCartDuotone } from "react-icons/pi";

const Navbar = () => {
    return(
        <div className="navbar-container">
            <h2><PiShoppingCartDuotone /> Controle de Vendas</h2>
            <div className="navbar-menu">
                <ul>
                    <li>
                        <Link to='/'> Home </Link>
                    </li>
                    <li>
                        <Link to='/vendedor'> Vendedor </Link>
                    </li>
                    <li>
                        <Link to='/vendas'> Vendas </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar