import './css/Vendas.css'
import Axios from 'axios'
import React, {useState, useEffect} from 'react'
import { TbShoppingCartCheck } from "react-icons/tb"
import ListaVendas from '../components/ListaVendas'

const Vendas = () => {

    const [valor, setValor] = useState({
        produto: '',
        valor: '',
        data_venda: '',
        id_vendedor: '',
    })

    const handleAltValor = (value) => {
        setValor((prevValues) => ({
            ...prevValues,
            [value.target.name]: value.target.value,
        }))
    }

    const [listaVendedor, setListaVendedor] = useState([])
    const [listaVendas, setListaVendas] = useState([])

    useEffect(() => {
        Axios.get('http://localhost:3001/listvendedor').then((response) => {
            setListaVendedor(response.data)
        })
    }, [])

    const handleInsert = async (e) => {
        e.preventDefault()
        try{
            const requisicao = await Axios.post('http://localhost:3001/cadvendas', valor)

            if(requisicao.status === 200) alert(requisicao.data)

        } catch (err){
            if(err.response) alert(`Erro: ${err.response.data}`)
        }
        window.location.reload()
    }


    useEffect(() => {
        Axios.get('http://localhost:3001/listvendas').then((response) => {
            setListaVendas(response.data)
        })
    }, [])

    return(
        <div className="vendas-container">
            <div className="vendas-container-cadastro">
                <form onSubmit={handleInsert}>
                    <h1>Cadastro de Vendas</h1>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Produto</label>
                        <input type="text" className='form-cad-venda-input' placeholder='digite aqui...' name='produto' id='produto' required onChange={handleAltValor}/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Valor</label>
                        <input type="number" className='form-cad-venda-input' placeholder='digite aqui...' name='valor' id='valor' step='0.01' required onChange={handleAltValor}/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Data da venda</label>
                        <input type="date" className='form-cad-venda-input' name='data_venda' id='data_venda' required onChange={handleAltValor}/>
                    </div>
                    <div className='form-cad-venda'>
                        <label className='form-cad-venda-label'>Vendedor</label>
                        <select className='form-cad-venda-select' name='id_vendedor' id='id_vendedor' required onChange={handleAltValor}>
                            <option value="">Selecione uma opção</option>
                            {listaVendedor.map((val) => (
                                <option value={val.id} key={val.id}>{val.nome} {val.sobrenome}</option>
                            ))}
                        </select>
                    </div>
                    <button className='form-cad-venda-btn' type='submit'><TbShoppingCartCheck /></button>
                </form>
            </div>
            <div className="vendas-container-lista">
                <h1>Vendas Efetuadas</h1>
                <div className='vendas-container-lista-table'>
                    <div className='venda-table-head'>
                        <div className='venda-table-head-col-id'><h3>ID</h3></div>
                        <div className='venda-table-head-col-produto'><h3>Produto</h3></div>
                        <div className='venda-table-head-col-valor'><h3>Valor</h3></div>
                        <div className='venda-table-head-col-data'><h3>Data da Venda</h3></div>
                        <div className='venda-table-head-col-vendedor'><h3>Vendedor</h3></div>
                        <div className='venda-table-head-col-edit'><h3>Editar</h3></div>
                        <div className='venda-table-head-col-delet'><h3>Deletar</h3></div>
                    </div>
                    {listaVendas.map((val) => (
                        <ListaVendas listaVendas={listaVendas} setListaVendas={setListaVendas} key={val.id} id={val.id} produto={val.produto} valor={val.valor} data_venda={val.data_venda} nome={val.nome} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Vendas