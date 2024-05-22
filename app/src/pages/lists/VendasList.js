import Axios from "axios"
import React, {useState, useEffect} from "react"
import './css/VendasList.css'

const VendasList = () => {

    const [listVendas, setListVendas] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendas').then((response) => {
            setListVendas(response.data)
        })
    }, [])

    return(
        <div className='list-vendas-container'>
            <h1>Vendas Efetuadas</h1>
            <form>
                <select>
                    <option value="" key="">Produto</option>
                    <option value="" key="">Vendedor</option>
                    <option value="" key="">Valor Maior</option>
                    <option value="" key="">Valor Menor</option>
                    <option value="" key="">Data</option>
                </select>
                <div className="form-input-btn">
                    <input className="form-input" type="text" placeholder="Pesquisar"/>
                    <button className="form-btn">Pesquisar</button>
                </div>
            </form>
            <div className="list-vendas-tabela">
                <table>
                    <thead>
                        <tr>
                            <th className="col-id">ID</th>
                            <th className="col-produto">Produto</th>
                            <th className="col-valor">Valor</th>
                            <th className="col-data">Data da venda</th>
                            <th className="col-nome">Vendedor</th>
                        </tr>
                    </thead>
                    {listVendas.map((val) => (
                        <tbody>
                            <tr>
                                <td>{val.id}</td>
                                <td>{val.produto}</td>
                                <td>{val.valor.toFixed(2)}</td>
                                <td className="col-data">{val.data_venda}</td>
                                <td>{val.nome}</td>
                            </tr>
                        </tbody>
                    ))}
                </table>
            </div>
        </div>
    )
}

export default VendasList