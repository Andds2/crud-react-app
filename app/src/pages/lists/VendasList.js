import Axios from "axios"
import React, {useState, useEffect} from "react"
import './css/VendasList.css'
import { FaSearch } from "react-icons/fa";

const VendasList = () => {

    const [listVendas, setListVendas] = useState([])
    const [srcVenda, setSrcVenda] = useState('')
    const [filterVenda, setFilterVenda] = useState([])


    useEffect(() => {
        Axios.get('http://localhost:3001/listvendas').then((response) => {
            setListVendas(response.data)
            setFilterVenda(response.data)
        })
    }, [])

    const handleSearch = (e) => {
        e.preventDefault()
        const resultado = listVendas.filter(val => {  
            const produto = val.produto
            const nome = val.nome
            const valor = val.valor.toString()
            
            return(
                produto.toLowerCase().includes(srcVenda.toLowerCase()) ||
                valor.includes(srcVenda) ||
                nome.toLowerCase().includes(srcVenda.toLowerCase()) 
            )
        })
        setFilterVenda(resultado)
    }

    const handleChangeSearch = (value) => {
        setSrcVenda(value.target.value)
    }

    return(
        <div className='list-vendas-container'>
            <h1>Vendas Efetuadas</h1>
            <div className="form-input-btn-search">
                <input className="form-input-search" type="text" placeholder="Pesquisar" onChange={handleChangeSearch} value={srcVenda}/>
                <button className="form-btn-search" onClick={handleSearch}><FaSearch /></button>
            </div>
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
                    {filterVenda.map((val) => (
                        <tbody key={val.id}>
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