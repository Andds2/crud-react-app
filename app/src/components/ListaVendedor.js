import { IoPersonCircleOutline } from "react-icons/io5";
import { FaUserLargeSlash } from "react-icons/fa6";
import { FaUserEdit } from "react-icons/fa";
import './css/ListaVendedor.css'
import Axios from 'axios';

const ListaVendedor = (props) => {

    const handleDelete = async (e) =>{
        e.preventDefault()
        try{
            const requisicao = await Axios.delete(`http://localhost:3001/deletevendedor/${props.id}`)

            if (requisicao.status === 200) alert(requisicao.data)

        } catch (err){
            if(err.response) alert(err.response.data)
        }
        window.location.reload()
    }

    return(
        <div className="vendedor-card">
            <h1><IoPersonCircleOutline /></h1>
            <h2>{props.nome} {props.sobrenome}</h2>
            <p>Contratado em: {props.data_contratacao}</p>
            <div className="vendedor-card-button">
                <button className="card-btn-edit"><FaUserEdit /></button>
                <button className="card-btn-delet" onClick={handleDelete}><FaUserLargeSlash /></button>
            </div>
        </div>
    )
}

export default ListaVendedor