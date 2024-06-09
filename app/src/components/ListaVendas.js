import './css/ListaVendas.css'
import { FaEdit } from "react-icons/fa"
import { FaTrash } from "react-icons/fa"
import Axios from 'axios'
import { Link } from 'react-router-dom'

const ListaVendas = (props) => {

    const handleDelete = async (e) =>{
        e.preventDefault()
        try{
            const requisicao = await Axios.delete(`http://localhost:3001/deletevenda/${props.id}`)

            if (requisicao.status === 200) alert(requisicao.data)

        } catch (err){
            if(err.response) alert(err.response.data)
        }
        window.location.reload()
    }

    return(
        <div className='venda-table-body'>
            <div className='venda-table-body-col-id'>{props.id}</div>
            <div className='venda-table-body-col-produto'>{props.produto}</div>
            <div className='venda-table-body-col-valor'>{props.valor.toFixed(2)}</div>
            <div className='venda-table-body-col-data'>{props.data_venda}</div>
            <div className='venda-table-body-col-vendedor'>{props.nome}</div>
            <div className='venda-table-body-col-edit'><Link to={`/altvenda/${props.id}`}><button className='venda-table-btn-edit'><FaEdit /></button></Link></div>
            <div className='venda-table-body-col-delet'><button onClick={handleDelete}><FaTrash /></button></div>
        </div>
    )
}

export default ListaVendas