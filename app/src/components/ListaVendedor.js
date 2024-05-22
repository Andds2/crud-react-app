import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import './css/ListaVendedor.css'

const ListaVendedor = (props) => {
    return(
        <div className="vendedor-card">
            <h1><IoPersonCircleOutline /></h1>
            <h2>{props.nome} {props.sobrenome}</h2>
            <p>Contratado em: {props.data_contratacao}</p>
            <div className="vendedor-card-button">
                <button className="card-btn-edit"><FaUserEdit /></button>
                <button className="card-btn-delet"><FaUserLargeSlash /></button>
            </div>
        </div>
    )
}

export default ListaVendedor