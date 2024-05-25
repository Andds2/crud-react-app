import './css/ListaVendas.css'
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa"

const ListaVendas = (props) => {

    return(
        <div className='venda-table-body'>
            <div className='venda-table-body-col-id'>{props.id}</div>
            <div className='venda-table-body-col-produto'>{props.produto}</div>
            <div className='venda-table-body-col-valor'>{props.valor.toFixed(2)}</div>
            <div className='venda-table-body-col-data'>{props.data_venda}</div>
            <div className='venda-table-body-col-vendedor'>{props.nome}</div>
            <div className='venda-table-body-col-edit'><button><FaEdit /></button></div>
            <div className='venda-table-body-col-delet'><button><FaTrash /></button></div>
        </div>
    )
}

export default ListaVendas