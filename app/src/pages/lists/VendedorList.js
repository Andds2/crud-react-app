import React, {useState, useEffect} from "react"
import Axios from 'axios'
import './css/VendedorList.css'

const VendedorList = () => {

    const [listVendedor, setListVendedor] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendedor').then((response) => {
            setListVendedor(response.data)
        })
    }, [])

    return(
        <div className='list-vendedor-container'>
            <h1>Vendedores Cadastrados</h1>
            <div className="list-vendedor-tabela">
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-nome">Nome</th>
                            <th className="col-sobrenome">Sobrenome</th>
                            <th className="col-data">Email</th>
                        </tr>
                    </thead>
                    {listVendedor.map((val) => (
                        <tbody>
                            <tr>
                                <td>{val.id}</td>
                                <td>{val.nome}</td>
                                <td>{val.sobrenome}</td>
                                <td>{val.email}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default VendedorList