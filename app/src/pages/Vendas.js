import './css/Vendas.css'
import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { TbShoppingCartCheck } from "react-icons/tb"
import ListaVendas from '../components/ListaVendas'

const Vendas = () => {

    const [listaVendedor, setListaVendedor] = useState([])
    const [listaVendas, setListaVendas] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendedor').then((response) => {
            setListaVendedor(response.data)
        })
    }, [])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendas').then((response) => {
            setListaVendas(response.data)
        })
    }, [])

    return(
        <div className="vendas-container">
            <div className="vendas-container-cadastro">
                <h1>Cadastro de Vendas</h1>
                <form>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Produto</label>
                        <input type="text" className='form-cad-venda-input'/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Valor</label>
                        <input type="number" className='form-cad-venda-input'/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Data da venda</label>
                        <input type="date" className='form-cad-venda-input'/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Vendedor</label>
                        <select>
                            <option value="">Selecione uma opção</option>
                            {listaVendedor.map((val) => (
                                <option value={val.id} key={val.id}>{val.nome} {val.sobrenome}</option>
                            ))}
                        </select>
                    </div>
                    <button><TbShoppingCartCheck /></button>
                </form>
            </div>
            <div className="vendas-container-lista">
                <h1>Vendas Efetuadas</h1>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Produto</th>
                            <th>Valor</th>
                            <th>Data da Venda</th>
                            <th>Vendedor</th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    {listaVendas.map((val) => (
                        <ListaVendas listaVendas={listaVendas} setListaVendas={setListaVendas} key={val.id} id={val.id} produto={val.produto} valor={val.valor} data_venda={val.data_venda} nome={val.nome} />
                    ))}
                </table>
            </div>
        </div>
    )
}

export default Vendas